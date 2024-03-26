---
sidebar_position: 6
---

# User Interface

By default, UI is bundled with the firmware and is served from the chip at runtime. However, it is possible to move UI bundle off the chip to save space, or completely remove the UI and HTTP server from the firmware.

## Serve static content from a different HTTP server

Assuming you know the IP of your ESP32, go to `build/web-ui/webpack.config.js` in the project folder and add IP of your ESP32 on the line
`{ defines: { esp32m: { backend: { host: 'IP_OF_YOUR_ESP32' } } } }`

After that, run `yarn start` in the `build/web-ui` folder to start local HTTP server for the UI.
You can now open [http://localhost:9000](http://localhost:9000) in your web browser and make changes to the UI sources, the changes should be applied automatically.

## Remove UI bundle from firmware

If you want to completely strip the UI static files (html+javascript) from the firmware binary, then in your project folder:

- remove `"web-ui"` from `EXTRA_COMPONENT_DIRS` in `CMakeLists.txt`
- remove `web-ui` from `PRIV_REQUIRES` in `main/CMakeLists.txt`
- in `main/main.cpp`, remove `#include <dist/ui.hpp>` and replace `initUi(new Ui(new ui::Httpd()));` with `new Ui(new ui::Httpd());`

This will remove compiled javascript and HTML files from the firmware, but will keep the Websocket server on the chip, allowing you to connect remotely with the IP address as explained above.

## Remove Websockets server from the firmware

If you don't want the UI at all, not even via remote connection, remove the line `initUi(new Ui(new ui::Httpd()));` from the `main/main.cpp` completely in addition to the previous steps
