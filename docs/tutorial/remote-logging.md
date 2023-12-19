---
sidebar_position: 4
---

# Remote Logging

ESP32 Manager contains a tiny logger module that is able to send output to multiple independent appenders. esp32m library contains, among others, 2 appenders able to send log messages to remote servers for storage and analysis. This feature may be extremely helpful when debugging applications, especially when no physical access to the ESP32 chip or its UART0 is available.

## Logging to **rsyslog**

### Server setup
[RSYSLOG](//www.rsyslog.com/) daemon is included by default in the majority of modern Linux distributions. Is capable of collecting remote log messages over the TCP or UDP protocol. Many distributions have this feature disabled by default, so we need a little tweak to enable it. Open `/etc/rsyslog.conf` and make sure that the following lines are un-commented:

```
module(load="imudp")
input(type="imudp" port="514")
```
Now restart the rsyslog daemon and check that it is listening on UDP port 514::
```shell
$ sudo systemctl restart rsyslog
$ sudo netstat -nlp | grep rsyslogd
```

if everything is right, you should see something like this:
```
udp        0      0 0.0.0.0:514             0.0.0.0:*                           9335/rsyslogd
udp6       0      0 :::514                  :::*                                9335/rsyslogd
```

### Appender setup

Add `CONFIG_ESP32M_LOG_UDP=y` to your `sdkconfig` to enable UDP logging to **rsyslog**.
Alternatively, add the following code to your `main.cpp`:

```cpp
#include <esp32m/log/udp.hpp>

...

log::addBufferedAppender(new log::Udp());
```

By default, UDP appender looks for `syslog.lan` name on your local network. You can just add this name to the `/etc/hosts` file on the machine with the **rsyslog** server, or add static name to your local DNS. Alternatively, you can pass IP or DNS name of your **rsyslog** server to the `new log::Udp()` statement. 

### Checking output
If everything is set up correctly, you should start seeing log messages from your ESP32 in the /var/log/syslog. It is also possible to redirect these messages to separate file or files. Refer to [RSYSLOG](//www.rsyslog.com/) documentation for details.

## Logging to MQTT
If you need remote logging, **rsyslog** option is generally the best due to low footprint and the best possible performance. However, if you don't have access to a Linux machine with **rsyslog**, or if you want to capture log messages in your own MQTT-enabled application, MQTT logging may be useful.

### Client and server setup

Refer to [MQTT setup](/docs/tutorial/mqtt) tutorial page for details.

### Appender setup

Add the following code to your `main.cpp` to enable UDP logging to **mqtt**:

```cpp
#include <esp32m/log/mqtt.hpp>

...

log::addBufferedAppender(&log::Mqtt::instance());
```

### Checking output

Run this command on the computer with MQTT server to see log messages:

```shell
$ mosquitto_sub -t 'esp32m/log/#'
```