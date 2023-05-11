---
sidebar_position: 1
---

# Create New Project

Set up the environment and prerequisites as explained in the [Quick Start](/docs/starting) article

The easiest way to create new project is to use sample project as a template. Create new folder and copy the following files and folders from the `example/basic`:

```
 main/
 web-ui/
 CMakeLists.txt
 partitions.csv
 sdkconfig.defaults
```

Now you can make the following changes:
# in `./CMakeLists.txt` - change the name of your project (usually the last line starting with `project(`)
# in `./main/main.cpp` - add your code
# in `./web-ui/src` - add your UI

Build, flash and monitor the project via

```
idf.py build flash monitor
```
