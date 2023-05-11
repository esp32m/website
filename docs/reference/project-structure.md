---
sidebar_position: 1
title: Project structure
---
# Project directory structure

Project directory structure follows that of [ESP-IDF build system](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html#example-project), with some additions:

```
.
+-- build/
    +-- project.bin
+-- main/
    +-- main.cpp
    +-- CMakeLists.txt
+-- web-ui/
+-- CMakeLists.txt
+-- partitions.csv
+-- sdkconfig
+-- sdkconfig.defaults
```

* **build/** folder is created by the ESP-IDF toolset during the build process and contains auxiliary and temporary build files, along with the ready-to-flash binary with a .bin extension and name matching your project name. It is safe to remove this folder, it will be re-created on the next build. In some cases it is advisable to remove the **build/** folder to force full rebuild, for example, when ESP-IDF is updated or when critical configuration options are changed.
* **main/** folder contains **main.cpp** file, the entry point of your project. It may also contain other *.c and /or *.cpp files, if you want to split your project. 
* **CMakeLists.txt** and **main/CMakeLists.txt** contain build settings for the entire project and for the project's sub-folder (if it contains source code/headers), respectively. See [this article](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html#project-cmakelists-file) for details.
* **partitions.csv** - this file defines custom partition layout for the ESP32 flash memory to enable Over-The-Air application updates and accommodate application of up to 1.984MB. If you don't need OTA function, if you need more space for SPIFFS/EEPROM partition, or if your ESP32 module has more than 4MB of flash, you may adjust this file accordingly. See [this article](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/partition-tables.html) for details.
* **sdkconfig** and **sdkconfig.defaults** - the latter contains the list of ESP-IDF configuration options which matter for your particular project. **sdkconfig** is generated automatically by the build system from **sdkconfig.defaults**. If you make any changes to **sdkconfig.defaults** you must delete **sdkconfig**, and the build system will re-create it on the next build, with your settings specified in **sdkconfig.defaults**. Read more [here](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/kconfig.html#using-sdkconfig-defaults).
* **web-ui/** folder contains everything necessary to build ReactJS single-page web application, a user interface for your project. If you don't need UI - this folder is not necessary. **web-ui/** folder is a [npm package](//docs.npmjs.com/about-packages-and-modules) and has the following structure:


```
.
+-- web-ui/
    +-- dist/
        +-- main.js.*
        +-- index.hmtl.*
        +-- ui.hpp
    +-- src/
        +-- index.html
        +-- index.ts
    +-- CMakeLists.txt
    +-- package.json
    +-- webpack.config.js
    +-- yarn.lock

```
* **dist/** folder is generated automatically by the UI build system, contains temporary files and compressed html+javascript formatted as .S (c++ assembler) source files to be embedded in the application.. **dist/ui.hpp** is an auto-generated C++ header file that contains `void initUi(Ui* ui)` function. This function must be called once during project initialization to set up embedded web server and make the UI available over HTTP.
* **src/** usually contains two files - `index.html` is an entry point to the web site and `index.ts` is a Typescript file that initializes UI counterparts of the actual modules compiled into the application..
* **CMakeLists.txt** tells ES-IDF build system where to find `dist/ui.hpp`, `dist/index.html.S` and  `dist/main.js.S` (see above).
* **package.json** lists project dependencies and contains information about the project, such as version, author, name etc. It is used by the NodeJS package manager (**yarn** in our case) to manage dependencies. Read more [here](//nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/).
* **webpack.config.js** is a [Webpack](//webpack.js.org/) configuration file. Webpack is often referred to as "Javascript linker", a tool that bundles many Javascript modules into a single minified Javascript file, ready for deployment.
* **yarn.lock** is a [Yarn](//yarnpkg.com) database file, created and maintained by Yarn.