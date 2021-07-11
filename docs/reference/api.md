---
sidebar_position: 3
title: API
---

# API

ESP32 Manager features built-in event dispatcher with publish/subscribe capabilities, used both for internal communications, and for interacting with the outer world. The latter constitutes the API (Application Programming Interface), that essentially is a method of exchanging messages bearing information about state changes, containing commands, requests, results of command execution, etc.
The API implements client-server mode of interaction, where ESP32 is a `server`, and external connections are initiated by `clients`. 
The API protocol has 2 layers:
1. **Message layer** - routes the messages to their destinations (modules/tasks/devices) within the application.
2. **Transport layer** - encodes the messages to be transmitted over a network medium, and decodes incoming network packets.

The **Message layer** uses unified message format, with the following fields:
* **type** (string, mandatory), one of:
    * *request* - usually client-to-server, requests to run a command or report the state. Requests may or may not require responses, there may be multiple responses to a single request (for example, to report progress), or the responses may be partial (for example, to transmit large chunks of data);
    * *response* - usually server-to-client, contains the result of command execution, current state, etc.;
    * *broadcast* - usually server-to-all-clients, communicates critical notifications, such as start/finish of application update;
    * other message types are possible, but currently are not recognized and silently dropped by the `esp32m`;
* **name** (string, mandatory) - defines the purpose/meaning of the message, for example:
    * *state-get* - instructs the server to report the state of the specified (by *target* field) device, task, module, etc.;
    * *state-set* - instructs the server to change state of the specified target;
    * *config-get* - requests configuration of the specified target;
    * *config-set* - changes configuration of the specified target;
    * other names are target-specific. For example, *scan* command for the *wifi* target starts AP scanning process;
* **target** (string, mandatory for *request* messages) - name of the module/task/device that must process the message (and respond to, if necessary);
* **source** (string, mandatory for *response* and *broadcast* messages) - name of the module/task/device that is responding to the message;
* **seq** (integer, optional) - message sequence, allows asynchronous processing of requests and responses;
* **data** (variant, optional) - provides arguments to the command, result of execution or details of notification;
* **partial** (boolean, optional) - if true, more messages of this type from the same sender are expected.

Asynchronous messaging is fully supported, i.e. an endpoint may send multiple requests before seeing any response. The ordering of messages is not important, but in order to avoid ambiguity, the usage of **seq** field is encouraged. Usually, the requesting endpoint picks a random 32-bit signed integer when the connection is established, and increments it with every new message. The responding endpoint must include **seq** field in the response message, with the value matching the request.

The **Transport layer** can be implemented using any protocol capable of exchanging data packets, i.e. TCP, UDP, Bluetooth, WebSockets, MQTT or any other. Currently, only **WebSockets** and **MQTT** are implemented.

## WebSockets

### Server setup
If `esp32m` application is compiled with the embedded UI, the WebSockets transport is added to the application by default, because WebSockets protocol is used for communications between the UI frontend and the backend. It is also possible to provide WebSockets API without serving UI pages from the MCU. Add the following code to your `main.cpp` to enable WebSockets API without embedded UI:

```cpp
#include <esp32m/ui.hpp>
#include <esp32m/ui/httpd.hpp>

...

new Ui(new ui::Httpd())
```

### Client setup

Any client that understands generic WebSockets protocol and capable of sending/receiving text messages will do. For example, [WebSocket Test Client](//github.com/aar0u/WebSocket-Test-Client), available as a Google Chrome extension. 

`esp32m` WebSockets server listens on the `/ws` endpoint, you need to use `ws://ip-or-name-of-esp32/ws` URL to connect via WebSockets client.
Once connected, you can send requests and see the responses in your WebSockets client

### Message format 

WebSockets transport uses JSON encoding for the messages. A single text frame may contain one or multiple message. If one message is transmitted, the frame contains JSON-encoded message, an object with the fields matching message fields (see above). If multiple messages are transmitted, the frame contains JSON array of objects, where each object is a JSON-encoded message.

Example of a single-message frame:
```json
{"type":"request","target":"app","name":"state-get","seq":869657919}
```

Example of a multi-message frame:
```json
[
    {"type":"request","target":"ota","name":"config-get","seq":869657920},
    {"type":"request","target":"ESP32","name":"config-get","seq":869657921},
    {"type":"request","target":"ota","name":"state-get","seq":869657922}
]
````

## MQTT

MQTT protocol within `esp32m` is mostly used to publish sensor readings to a time-series database, but it has also been adopted to process `esp32m` messages. However, as it is a connectionless and stateless protocol, there are certain limitations:
* it is not possible to address devices with the same name connected to a single MQTT server, each device must have unique name;
* if the message does not send a mandatory response, there's no way to tell if the message was delivered;
* MQTT messages may be observed by other (unrelated or undesirable) MQTT clients, which may have security implications.

### Setup

Refer to [MQTT setup](/docs/tutorial/mqtt) tutorial page for details.

### Message format 

MQTT message consists of two parts:
1. Message topic. The topic is a path-like string, that contains the following segments, separated by a forward slash ('/'):
   * esp32m - this is a mandatory prefix that identifies esp32m message;
   * message type;
   * project name;
   * module/task/device name;
   * sequence (optional).
2. Message data. This is a JSON-encoded **data** field of the message. If your message doesn't contain data, just pass empty string.

### Example

This example uses [Mosquitto](//mosquitto.org/) command-line clients (`mosquitto_sub` and `mosquitto_pub`) and assumes that `esp32m` project with the name `basic` is running on your ESP32 module and is connected to a [Mosquitto server](//mosquitto.org/).
1. Open two shell terminal windows on the machine where Mosquitto server is installed.
2. Run this command in the first terminal:
   ```shell
   $ mosquitto_sub -t 'esp32m/response/#' -v
   ```
3. Run this command in the second terminal:
   ```shell
   $ mosquitto_pub -t 'esp32m/request/basic/app/state-get' -m ''
   ```
4. Watch the first terminal, you should see:
   ```json
   esp32m/response/basic/app {"name":"basic","time":1624889782,"uptime":109310948,"version":"0.0.13","built":"Jun 25 2021 10:01:46","sdk":"v4.4-dev-1594-g1d7068e4be-dirty","size":1475264}
   ```


