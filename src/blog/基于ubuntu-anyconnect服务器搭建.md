@@title:基于ubuntu anyconnect服务器搭建
@@date:2015-12-16

零点零 快速阅读
==
本文和其他方案最大的不同是加入TUN和cert-user-oid,如果你用其他方法错误,可以看看本文,本文旨在不越狱在ios下科学上网

零 可用方案
=== 
shadowsocks
--
首先就排除了这个方案,因为客户端在ios9不能用
pac代理
---
可以利用25端口进行http代理,问题是速度慢100~200k,安全性太差(有来源,但是找不到了)

Ikev2
--
一切都是美好的,直到我发现需要用mac来生成配置文件
利用ocserv部署anyconnect
--
没问题,部分知名服务商都提供了anyconnect服务

>以下内容绝大部分来自http://fewspider.github.io/2015/08/16/ubuntu-ocserv-deploy.html  我修正了部分问题,并且使用了最新的版本(2015年12月10日)

一 环境
==
* ubuntu 14.04
* hostwithlinux openvz vps (现在被收购到hostus)

> 注意: 这篇文章不是小白教程,假设你有一定linux基础

二 必要条件
==
TUN支持
--
一般可以在vps面板中打开,详细咨询服务商
命令
>cat /dev/net/tun

可以查询vps当前是否打开了TUN
如果显示
>cat: /dev/net/tun: File descriptor in bad state

表示支持TUN,满足需求

三 搭建
===
1 下载&解压
---
`wget ftp://ftp.infradead.org/pub/ocserv/ocserv-0.10.10.tar.xz`
`tar -xf ocserv-0.10.7.tar.xz`

2 安装依赖
---
`apt-get install build-essential pkg-config libgnutls28-dev libwrap0-dev libpam0g-dev libseccomp-dev libreadline-dev libnl-route-3-dev`

3 编译&安装
---
`cd ocserv-0.10.10/`
`./configure`
`make`
`make install`

4 创建密钥
---
`mkdir /etc/ocserv`
`cd /etc/ocserv`

> 这里我将密钥存放到这, 只要你喜欢你可以将密钥存放到任意地方,只要在配置中指定密钥的位置

**创建 ca.tmpl**

>cn = "anyword" 
organization = "anyword" 
serial = 1 
expiration_days = 3650
ca 
signing_key 
cert_signing_key 
crl_signing_key
>

**生成 ca 秘钥与证书**

`certtool --generate-privkey --outfile ca-key.pem`
`certtool --generate-self-signed --load-privkey ca-key.pem --template ca.tmpl --outfile ca-cert.pem`

**创建 server.tmpl**

>cn = "ip"  #这里修改为你的vps ip或者域名
organization = "anyword" 
serial = 2
expiration_days = 3650
signing_key 
encryption_key
>tls_www_server

注意: 一旦这里设定为你的ip或者域名,以后就只能使用域名或者ip登陆

**生成 server 秘钥与证书**
`certtool --generate-privkey --outfile server-key.pem`
`certtool --generate-certificate --load-privkey server-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template server.tmpl --outfile server-cert.pem`

**生成客户端user.tmpl**
>cn = "fulvaz"
unit = "fulvaz"
expiration_days = 365
signing_key
tls_www_client
>


**生成 user 秘钥与证书**
`certtool --generate-privkey --outfile user-key.pem`
`certtool --generate-certificate --load-privkey user-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template user.tmpl --outfile user-cert.pem`
                   

**将证书转换为 PKCS12**
会提示输入两次密码，随便输，一样就可以咯。待会iOS客户端导入证书的时候，会提示输入密码，这个密码就是现在要输的密码。
`openssl pkcs12 -export -inkey user-key.pem -in user-cert.pem -certfile ca-cert.pem -out user.p12`

5 修改配置文件
---
###拷贝默认配置文件
cp ~/ocserv-0.10.10/doc/sample.config /etc/ocserv/ocserv.conf
证书配置相关说明                

###修改ocserv.conf
auth改为证书认证的方式，除了
`auth = "certificate"`
注释掉其他 auth =开头的      

###配置 server 秘钥与证书
>server-cert = /etc/ocserv/server-cert.pem  #注意设置为你key的位置
>server-key = /etc/ocserv/server-key.pem


###配置 ca 证书
>ca-cert = /etc/ocserv/ca-cert.pem

###配置端口号
>tcp-port = 2333
udp-port = 2333


###修改dns
>dns = 8.8.8.8
dns = 8.8.4.4


###确保以下两个都是 true
>try-mtu-discovery = true
cisco-client-compat = true


###修改route
全部注释掉,因为我们可以在客户端添加规则 (就是控制那些走vpn,哪些流量走国内)

###no route
保持默认配置

###修改cert-user-oid
修改为`cert-user-oid = 2.5.4.3`
貌似使用证书认证这部必须改,原文就没指出

6 修改/etc/sysctl.conf
---
注释掉
`net.ipv4.ip_forward=1`
运行以重新加载
`sysctl -p /etc/sysctl.conf`

7 打开 TCP 和 UDP 端口
----
比如刚才的端口是2333，那么现在也要是2333
>iptables -t filter -A INPUT -p tcp -m tcp --dport 2333 -j ACCEPT
iptables -t filter -A INPUT -p udp -m udp --dport 2333 -j ACCEPT
iptables -t nat -A POSTROUTING  -j MASQUERADE
>

8 测试搭建
---
ocserv -f -d 1

如果说端口已被占用,可以使用以下命令
比如查看2333端口
`lsof -i:2333`

干掉占用端口的进程，假设刚才占用2333端口的pid是12345
`kill 9 12345`

9 iOS客户端配置
---
###安装Cisco AnyConnect 

自行在appstore中安装

###导入证书

1.下载证书
如果你使用windows,直接使用winscp将user.p12下载回来即可

如果你使用linux
`scp username@hostname:/pathToFile/user.p12 ~/user.p12`
2. 将证书以邮件的方法发送到手机上,然后打开就可以了
(或者你可以搭建一个web服务器,通过浏览器访问这个证书,原文就是这个方法)

###添加连接
1. 连接 > 添加VPN连接
* 说明，随便填
2. 服务器地址，假设你的VPS的ip 是 111.111.111.111，端口是 2333，那么就是 111.111.111.111:2333，这边就不需要前面加http://了。
3. 高级 > 证书，选择你刚才导入的那个证书

4. 高级 > 按需连接，打开，出现 域列表，永不连接 那边可以添加一下常用的国内站点

5. 设置 > 阻止不信任的服务器，这个关掉，不然使用自己颁发的证书会有问题

6. 设置 > VPN FIPS模式，这个打开，貌似会比较稳定，心里作用吧(¬_¬)

10 保存iptables
--
如果你测试没问题,就使用
`/sbin/iptables-save`
来保存iptables的更改
四 自启动
==
自启动脚本:
```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          ocserv
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO
# Copyright Rene Mayrhofer, Gibraltar, 1999
# This script is distibuted under the GPL
 
PATH=/bin:/usr/bin:/sbin:/usr/sbin
DAEMON=/bin/ocserv
PIDFILE=/var/run/ocserv.pid
DAEMON_ARGS="-c /etc/ocserv/ocserv.conf"
 
case "$1" in
start)
if [ ! -r $PIDFILE ]; then
echo -n "Starting OpenConnect VPN Server Daemon: "
start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON -- \
$DAEMON_ARGS > /dev/null
echo "ocserv."
else
echo -n "OpenConnect VPN Server is already running.\n\r"
exit 0
fi
;;
stop)
echo -n "Stopping OpenConnect VPN Server Daemon: "
start-stop-daemon --stop --quiet --pidfile $PIDFILE --exec $DAEMON
echo "ocserv."
rm -f $PIDFILE
;;
force-reload|restart)
echo "Restarting OpenConnect VPN Server: "
$0 stop
sleep 1
$0 start
;;
status)
if [ ! -r $PIDFILE ]; then
# no pid file, process doesn't seem to be running correctly
exit 3
fi
PID=`cat $PIDFILE | sed 's/ //g'`
EXE=/proc/$PID/exe
if [ -x "$EXE" ] &&
[ "`ls -l \"$EXE\" | cut -d'>' -f2,2 | cut -d' ' -f2,2`" = \
"$DAEMON" ]; then
# ok, process seems to be running
exit 0
elif [ -r $PIDFILE ]; then
# process not running, but pidfile exists
exit 1
else
# no lock file to check for, so simply return the stopped status
exit 3
fi
;;
*)
echo "Usage: /etc/init.d/ocserv {start|stop|restart|force-reload|status}"
exit 1
;;
esac
 
exit 0
```
>来自https://gist.github.com/kevinzhow/9661623


**我做了点小修改**
将 13 行修改为
`DAEMON=/usr/local/sbin/ocserv`

将这个文件保存为`/etc/init.d/ocserv`

然后运行以下命令
>chmod 755 ocserv
  chmod 755 ocserv
  update-rc.d ocserv default
  
然后你就能用以下命令运行了
`Usage: /etc/init.d/ocserv {start|stop|restart|force-reload|status}`


