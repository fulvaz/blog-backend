@@@title:git常见场景实战
@@@date:2019-03-31


# git常见场景实战

## 文章背景

1. 只是会基本的add, commit, merge, reset是不够的, 业务场景肯定没这么简单.
2. git文档非常抽象, 死活看不明白.
3. 遇到问题也搜不到答案.

如果你有以上问题, 这篇文章也许能帮到你.

## 必备知识

reset

以下三种reset的区别
reset --mixed
reset --hard
reset --soft

主要难点是理解**工作区**, **暂存区**, **代码库**, 理解了之后就能理解这三个指令了

顺便你还能理解git历史

详见:
https://davidzych.com/difference-between-git-reset-soft-mixed-and-hard/

https://progit.bootcss.com/#_git_reset

## 忽略部分文件

比如node_module是不应该提交到代码库的. 一般通过`.gitignore`文件实现, 但是在vsc中可以使用插件

- `gitignore`: 初始化ignore文件
- `ignore "g" it`: 在右键菜单添加ignore某个文件或者文件夹的选项

## 回退到某一个具体的commit

### 回退方法

- reset: 直接回去
- revert: 如`git revert C1` 会创建一个新的commit, 该commit的内容是还原C1所做的改动.

根据你的场景选择, 通常revert适用于你的代码已经退到了远程仓库. (所以一个规范的commit非常重要)

### 快速定位commit

- ~用于返回祖先节点
- ^这个只能回到父亲节点, 不能回到祖先节点.

规律如图:

```text
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A
A =      = A^0
B = A^   = A^1     = A~1
C = A^2  = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```

## 写完需求后合并代码

git checkout master
git merge feature

但是可能会有冲突, 快速处理的方式是打开vsc左边的`source control`图标(一般是第二个), `MERGE CHANGES`下就是你需要处理的冲突, 一一点开这些文件, vsc会自动帮你高亮冲突的部分, 和同事一块处理冲突即可.

## commit信息合并为一条

合并代码或者给别人发pr前, 我推荐将feature分支的commit整理为一个, 方便review和回退

1. git rebase -i (从master分支出来的commitId)
2. 然后分别对每个commit进行处理, 可使用的命令如下

```text
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
```

注意: commit是按照老到新从上往下排列, 第一个commit不能squash

## 你的功能依赖某个补丁修复或者某个功能

1. 如果补丁和功能已经上线, 那应该合并到了master, 那运行`git rebase master`就ok了

2. 如果补丁还不能上线, 那你先把该补丁分支拉到你本地, 记下补丁的commitId(可能有多个), 然后在你的分支使用`git cherry-pick (commitId)`, 那补丁就应用到你的分支上了.

ps: 使用cherry-pick可能会产生冲突.

## 修改了某个文件, 希望还原到上一个commit

`git checkout (filepath)`

## 比较当前工作区和上一个commit的区别

## 二进制文件

git只能处理文本, 二进制文件修改必然会导致冲突, 请手动运行`git checkout --ours (filepath)`保留自己的文件, `git checkout --theirs (filepath)`使用传入的文件.

如果不手动处理你的应用还是能正常运行不会报错, 但是你发现运行效果无法达到预期时, 就要满世界找错误了.

## git tag有什么作用

帮你回退版本用的. 所以每次发布打tag是个好习惯, 避免满世界找commit.

## 警告

rebase命令用好能让你的log历史整洁, 但它会修改log历史, 一不小心就会导致你的log历史混乱, 甚至丢失代码, 使用前千万要谨慎. 最好配合图形化界面使用, 例如SourceTree

## 优秀的git教程

[可视化学习git](https://learngitbranching.js.org/)