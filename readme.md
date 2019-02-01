错误处理
----

1. 自定义错误继承Error对象
2. 根据报错错误类型的不同进行统一的处理middlewares
3. 

正确地生成mysql docker container
---

docker run --name blog-mysql -e MYSQL_ROOT_PASSWORD=111111 -e MYSQL_USER=blog -e MYSQL_PASSWORD=dev -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -p 3306:3306  -d mysql:5.7

-p是必须的, 不会默认暴露端口.....


passport
---

missing credentials
检查bodyParser是不是没有正确解析

编辑sql参数, sql配置如何使用volume的问题
show_compatibility_56 = On

数据库需要调节参数?
019-01-31T10:57:16.170857Z 8 [Note] Aborted connection 8 to db: 'blog_test' user: 'root' host: 'blog4_app_1.blog4_default' (Got an error reading communication packets)

使用了root

密码保护
---

db.json
.travis.yml

关闭sql远程端口
---

sql和vps都用了root

docker hub会不会公开我的image?



部署指引
https://www.linux.com/learn/automatically-deploy-build-images-travis

travis login使用的是github账号/密码

使用CI工具避免代码内出现账号密码

研究travis如何加密和解密账号密码, 应该是用ca, openssl

.env中使用了密码

nginx 日志存放