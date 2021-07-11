---
sidebar_position: 2
title: esp32m.py tool
---

# esp32m.py tool


The `esp32m.py` file found in the [esp32m/core](//github.com/esp32m/core) folder is a Python script that simplifies routine project management tasks, such as building, versioning, flashing, uploading to server for OTA updates, and more. The most common use case for `esp32m.py` is to run it in your project's folder like this:

```shell
$ python path/to/esp32m.py build flash monitor
```

This will do the following:
* if your project has `web-ui` folder, it will build the UI and generate header/source files to be compiled into the application;
* bump build number in the project's `version.txt` file (for example, 1.0.5 becomes 1.0.6);
* build the project;
* copy the application binary to your Web server's download directory (if you need to use OTA);
* flash the application over the serial link;
* start the monitor on the serial port to display debug messages from ESP32.

The tool makes use of external programs, such as `yarn`, `idf.py`, `git`, `clang-format`, so it needs to know their locations. You can either make sure they are listed in your system's `PATH` environment variable, or specify the path manually:
* option 1 - via the `esp32m.json` config file;
* option 2 - via the command line, using the `--path` switch, see below.

## esp32m.json

`esp32m.json` is an optional config file located in your project's root directory, it contains the following options:

```json
{
    "path": {
        "git": "/path/to/git",
        "clang-format": "/path/to/clang-format",
        "idf": "/path/to/idf.py",
        "idf-tools": "/path/to/.espressif",
        "firmware-target": "/path/to/compiled/firmware",
    }
}
```

* **idf-tools** is a path to `.espressif` folder that is created by the ESP-IDF during installation. If you followed [ESP-IDF installation instructions](//docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), it will be auto-detected, but if you changed the default path during the installation, or decided not to export ESP-IDF environment variables, you will need to speciry it manually.

## Commands

`esp32m.py` commands reflect `idf.py` commands with some additions and extended functionality:
* **init** - create new project from `esp32m` template, details are [here](/docs/tutorial/create-project);
* **format** - use `clang-format` to format source code;
* **build** - build UI and main project;
* **flash** - burn the application over the serial link;
* **monitor** - start serial monitor;
* other commands as explained [here](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html#using-the-build-system)

## Command line options

* **--path component path** allows to specify paths using command line, or override those specified in the `esp32m.json`. Example:
```shell
$ python path/to/esp32m.py --path firmware-target /path/to/compiled/firmware build
```
* **--project path** allows to specify path to the project if `esp32m.py` is started not in the project root folder.
* **--ui=skip** allows to skip UI building and move on to the main build process. May be used to speed up build process if you didn't make any changes in the UI and just want to build the C source.
* **--port** or **-p** - specify serial port for flashing and monitoring.