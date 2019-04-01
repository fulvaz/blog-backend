@@@title:<Golang内存模型>嚼过的笔记
@@@date:2015-12-16

Happens Before
===
操作内存的局部顺序

如果r可以读取到v被w修改,那么需要满足两个条件
1. r不能在w之前进行
2. 没有其他w`在w后,r前,修改了v

为了保证r对特定w的观察,要保证r只能观察w,即
1. w在r前发生
2. 其他w`要么在w前发生,要么在r后发生

后一条件更强

ps1: 对v初始化也是个w
ps2: 读写超过a single machine word的值,读写顺序是乱序的

Synchronization
===
Initialization
---
init()在包的全部函数前执行

所有的init()都在main.main前执行

Goroutine creation
---

Goroutine destruction
---
goroutine的结束并不能保证happen before任意操作

...老感觉是废话,反正我就不会这么写

Channel communication
---
**unbuffer channel**
如果没接收goroutin没接收,发送goroutin会block,直到接收成功为止




**buffer channel**
The kth receive on a channel with capacity C happens before the k+Cth send from that channel completes.

通过buffer channel控制同时并发的数量,buffer的容量是最大并发书,buffer内item的数量是active的线程数

例子: 
下面例子展示了如何用buffer channel控制线程数量
```
var limit = make(chan int, 3)

func main() {
	for _, w := range work {
		go func(w func()) {
			limit <- 1
			w()
			<-limit
		}(w)
	}
	select{}
}
```

Locks
---
sync.Mutex
sync.RWMutex

例子:
```
var l sync.Mutex
var a string

func f() {
	a = "hello, world"
	l.Unlock()
}

func main() {
	l.Lock()
	go f()
	l.Lock()
	print(a)
}
```
两个lock之间必须有一个unlock,否则会在lock处无限等待


读写锁: 读-读能共存，读-写不能共存，写-写不能共存

这段是什么意思?
>For any call to l.RLock on a sync.RWMutex variable l, there is an n such that the l.RLock happens (returns) after call n to l.Unlock and the matching l.RUnlock happens before call n+1 to l.Lock.

Once
---
once.Do(f)
是个在多线程中初始化的方法,所有调用once.Do的线程都会等待f完成,而且f只会运行一遍

例子:
```
var a string
var once sync.Once

func setup() {
	a = "hello, world"
}

func doprint() {
	once.Do(setup)
	print(a)
}

func twoprint() {
	go doprint()
	go doprint()
}
```

Incorrect synchronization
---
实在没看懂什么意思
>Note that a read r may observe the value written by a write w that happens concurrently with r. Even if this occurs, it does not imply that reads happening after r will observe writes that happened before w.

第一个例子显然有问题

第二个输出结果竟然正确,我试了半天也没出错误结果

第三个结果也正确,但是我觉得问题是浪费了大量cpu资源

第四个例子不是同理么

我觉得根本原因是这句
>there is no guarantee that it will observe the initialized value for g.msg.

不能保证! 
很有可能编译器为了优化而让指令乱序执行

**所以,乖乖使用显式的同步语句吧**

有问题没关系,迟早能弄懂的
