---
sidebar_position: 1
---

# Create New Project

Set up the environment and prerequisites as explained in the [Quick Start](/docs/starting) article

## Creating new project from template

This is the recommended method, as it will automatically set up the environment for you.
* Create new directory. The name is important, it will be used by the build system and the UI to reference your project.
* Run this command inside the new directory:
```shell
$ python /path/to/esp32m.py init
```
`esp32m.py` tool is explained [here](docs/reference/esp32m-py)

``web-ui`` folder in the new project will be populated by default. If you don't need UI, pass the `--ui=skip` command line option.

## Copying the existing project

It is possible to create new project by simply cloning the existing project directory. The following files and folders may be excluded:

```
 ./build/
 ./sdkconfig
 ./web-ui/dist/
 ./web-ui/node_modules/
 ./web-ui/yarn.lock/
```

Additionally, you will need to make chanes to the following files:

* **./CMakeLists.txt**:
    * specify correct paths on the line `set(EXTRA_COMPONENT_DIRS ".../esp32m/core/esp32m" "web-ui")`;
    * specify project name on the `project(...)` line.
* **./web-ui/package.json**:
    * specify project name on the `"name":"..."` line.

