@@title:npm进阶(补漏)
@@date:2016-06-18

为自己的迷茫期背锅, 重新学习node, 多说几句, 在我看来node根本不是个适合的服务端工具, node只是个为前端服务的工具(至少现在看来), 既然糊里糊涂进了这个坑, 我也就懒得走了, 继续蹲下去.  我的目标是前端, 但不至于前端, 更重要是会使用node制作工具和轮子更好地开发前端.

也许还需要补充基础知识, 必要时跑后端去, **语言真的不是关键**, 但我需要知识的深度和专精.



(看不到图? 插件还没写好啊)



<!-- more -->

----------------------------------------

##更新package

npm update 更新

npm outdated 测试是否有旧版本的包



##语义化版本管理

`~` 忽略minor版本, 比如`~1.2.0`可以升级到`1.2.4`但是不能升级到`1.3.0`, 忽略minor升级

`^` 忽略major版本升级

ps: 如果需要升级major版本的话, 需要删除依赖, 然后重新安装



##scoped package

以`@`开头的包, 比如说`usrename/package`



###新建

`npm init --scope=username`



### 发布 

一般这种包都是私有的, 如果需要发布成公共包

`npm publish --access=public`



### 安装

`npm install @username/project-name --save`

一样



# How npm works

## npm2

查看依赖树: `npm ls`

只看主要依赖'npm ls --depth=0' 

你每一个依赖的依赖都会被冗余放置, 比如说, 你导入了a, b两个包, a依赖c, b也依赖c, 那么你的依赖目录里面会存在两个c, c是冗余的



## npm3

npm3变得更加扁平了, 而非npm2那样的嵌套, 同时npm会根据安装顺序处理依赖

![](https://leanote.com/api/file/getImage?fileId=5765638aab64415bec0059a9)


还是这个例子, B1.0已经安装, 如果需要导入一个依赖B的C, 则处理如下:


![](https://leanote.com/api/file/getImage?fileId=5765638aab64415bec0059aa)


但这并不意味着npm解决了全部问题, 比如再安装一个D模块


![](https://leanote.com/api/file/getImage?fileId=5765638aab64415bec0059ab)

B依然会重复, 因为B2.0无法安装在最高层

### 将B放到顶层

需要先将全部依赖B1.0的包更新为B2.0, 然后运行`npm dedupe`



### Non-determinism 

install order matters, 就是说, 在npm3里面, 不同环境的依赖树可能是不一样的, 比如像上面例子那样A更新了B的版本, 导致后续模块对B的依赖都是指向顶层的B, 而非嵌套的B





