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