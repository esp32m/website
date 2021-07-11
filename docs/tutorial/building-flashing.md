---
sidebar_position: 2
---

# Build and Flash

## Using the esp32m.py tool

This is the recommended method, simply run this command in the project directory:
```shell
$ python path/to/esp32m.py build flash
```
`esp32m.py` tool is explained [here](docs/reference/esp32m-py)

This assumes you use serial link to flash the application.. If you want to update using OTA, see [this article](/docs/tutorial/ota)


## Manual building and flashing

1. Go to project's `web-ui` folder and run
```shell
$ yarn build
```
2. Find the **./web-ui/dist/index.html.gz** and **./web-ui/main.js.gz** files and embed them as explained [here](//docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html#embedding-binary-data)
3. Add embedded assets to the UI provider in your code like this:

```cpp
ui->addAsset("/", "text/html; charset=UTF-8", index_html_start, index_html_end, "gzip", "\"size-hash\"");
ui->addAsset("/main.js", "application/javascript", main_js_start, main_js_end, "gzip", "\"size-hash\"");
```
and replace the "size-hash" by the actual file size and hash using any algorithm of your choice, with the ASCII encoded hash. See auto-generated `ui.hpp` for example.

4. Go to project's root and run
```shell
$ idf.py build flash
```

