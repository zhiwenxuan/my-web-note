# git相关

## 关于 git 配置
```
$ git config --global user.name "Zhenqi Li"
$ git config --global user.email zhenqi.li@dream.com
```

## 关于 git 开发常用

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

merge 部分 commit:   
在多分支开发中，可能会会出现这样的情况：分支A作为项目主干，一般项目会把它作为预发布的分支；分支B作为bugfix分支，只作为bug修复之用，一般改完bug后集中merge到分支A，有时候不想全部merge，只希望提交部分的修改，这时候就需要用到cherry-pick命令。

```
$ git cherry-pick 6bbf6b4
```
注：6bbf6b4是commitid,多个commit 用空格间隔。比如：
```
$ git cherry-pick 6bbf6b4 78fbadd egiiegd
```

