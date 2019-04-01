@@title: 另一种开发环境- ubuntu + windows
@@date: 2016-06-22

2019年04月01日: 可喜可贺, window终于有了ubuntu子系统

背景
---
用了差不多大半年原生ubuntu,不得不承认一点, ubuntu的gui界面, 或者或ubuntu不适合日常使用. 需要折腾的东西太多太多, 比如不稳定的ss-qt5, 不稳定的chromium(忽然间很卡), 很悲剧的源下载速度, 奇葩的多屏管理(窗口最小化后打不开)......相信我, 不要吐槽我, 你能想到的方案我都差不多试完了.

吐槽: 我只是没钱买mac
update: 已经换mac

<!-- more -->

方案
---
最近想写前端, 需要第三个显示器, 网上的usb-vga转换器只能在windows下使用, 有个哥们尝试实现了一下驱动, 然而项目已经放弃了, 让我去学驱动开发也不现实.

linux的最强的功能是命令行. 这是我最不想放弃的一部分, cygwin也不能代替. 如果可以在windows的gui环境下还能使用linux的命令行, 那是极好的. 

连vps的方案先否决, 连国内不经济(学生套餐?不好用), 国外太慢. 那就直接virtualbox运行ubuntu server吧!

唯一的坑
---
唯一的坑是连接方式要选`网络地址转换(NAT)`, 还要做端口转发`设置-网络-端口转发`.
其次, 开发的时候注意监听0.0.0.0, 而不是以前的localhost
嗯...我怎么又想到了安全问题?

tips
---
会持续更新
1. 源太慢就用迅雷下好了, 用winscp传到服务器手动装
2. ubuntu server安装增强功能,共享目录
`http://devtidbits.com/2010/03/11/virtualbox-shared-folders-with-ubuntu-server-guest/`
3. 更好的方案是使用vagrant, 但我已经配好了一个镜像, 不想重新弄了, 我先缓一缓再去折腾, 感觉不难, 就是需要时间