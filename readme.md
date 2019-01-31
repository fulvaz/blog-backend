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