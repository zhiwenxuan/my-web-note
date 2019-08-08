# git相关

## 记录关于git 分支操作几个命令

查看分支：git branch

创建分支：git branch `<name>`

切换分支：git checkout `<name>`

创建+切换分支：git checkout -b `<name>`

合并某分支到当前分支：git merge `<name>`

删除分支：git branch -d `<name>`

强行删除分支：git branch -D `<name>`

查看提交日志：git log

```
$ git log
commit e475afc93c209a690c39c13a46716e8fa000c366 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file
```

回退到某个版本：git reset --hard `<commit id>`

删除远程分支： git push [远程名] :[分支名]
```
例子：
$ git push origin :branch1
```

拉取远程分支 branch1

```
git fetch origin branch1 命令来把远程分支拉到本地

git checkout -b branch1 origin/branch1 在本地创建分支 branch1 并切换到该分支

git pull origin branch1 就可以把某个分支上的内容都拉取到本地了
```

撤销 rebase
```
// 查看引用日志
git reflog

// 回到 rebase 前
git reset --hard HEAD@{n}
```
