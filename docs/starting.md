---
sidebar_position: 2
---

# Quick start

## Requirements
* PC with Windows 10, Linux or MAC OS
* ESP32 module
* Serial programmer


## Prerequisites
You need to have the following software installed:
* [Python 3.x](//www.python.org/downloads/) or more recent.
* [Git 2.x](//git-scm.com/downloads) or more recent.
* [NodeJS 20.x](//nodejs.org/en/) or more recent.
* The latest ESP-IDF, installation instructions are [here](//docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html)
* [Yarn Modern 3.x](//yarnpkg.com/getting-started/install) - only needed if you want to use UI.


Initial application upload must be done via serial connection. Depending on the type of your ESP32 board/module, there are different ways to establish serial link to the PC. 
Please review the following guide for details: [Establish Serial Connection with ESP32](//docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/establish-serial-connection.html).
[This seach](//www.google.com/search?q=esp32+serial+programmer) also yields plenty of relevant guides and tutorials to connect ESP32 module to a PC over serial link.
After the initial upload, subsequent application updates may be performed via OTA and embedded UI from any Web browser.

## Compiling and running example

* Clone ESP32 Manager core repository:

```shell
$ git clone https://github.com/esp32m/core.git
```

* Connect the ESP32 module/board to the PC.
* In the `core/examples/basic` run

```shell
idf.py build flash monitor
```
In most cases it should be able to detect your serial port automatically. If not, just pass it int the command line using the `--port` switch, for example: `--port /dev/ttyUSB0`. 
Within a couple of minutes, you should see something like this in the terminal: 

```
0:00:00:00.0011 I basic  starting 0.0.1
0:00:00:00.0429 D config-vfs  XXX bytes loaded
0:00:00:00.0436 I basic  init level 0
0:00:00:00.0548 I wifi  changing mode: AP -> Disabled
0:00:00:00.0553 I wifi  StaInitial -> StaConnecting
0:00:00:00.0556 I basic  initialization complete
...
```
At this point the device enters initial configuration mode and brings up WiFi access point. You can use your smarphone or any WiFi-capable device to connect to this AP 
(AP name matches application name, "basic" in this case). Upon connection, you will be redirected to a browser page allowing you to connect to your router AP. Some smartphone 
models don't support automatic redirection (also known as Captive Portal), in this case you may need to open the browser and navigate to `http://192.168.4.1/cp` to perform initial configuration.

