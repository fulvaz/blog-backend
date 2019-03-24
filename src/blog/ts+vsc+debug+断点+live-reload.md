<!---
@@@title:搭建ts+vsc+debug+断点+live-reload
@@@date:2019-01-01
--->


1. 如果你想要dev, live reload
---

`nodemon --exec 'ts-node' src/server.ts`

2. debug, reload when file change
---

我们再优化一下

`https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_restarting-debug-sessions-automatically-when-source-is-edited`

1. `npm install -g nodemon`
2. vsc配置

```json
{
    "type": "node",
    "request": "launch",
    "name": "nodemon",
    "runtimeExecutable": "nodemon",
    "runtimeArgs": [
        "--nolazy",
        "-r",
        "ts-node/register"
    ],
    "args": [
        "${workspaceFolder}/src/server.ts"
    ],
    "restart": true,
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen"
},
```

总结
----

1. node debug的方法是利用他的debug协议, 通过是假--inspect={port}打开, 然后用chrome或者vs code attach到对应的进程进行debug
2. ts-node的`ts-node/register`包可以使ts文件在不需要外部编译的情况下, 直接使用node运行, 而且还带sourceMap, 不可思议.