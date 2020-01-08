# linux 命令

记录一些小技巧
---

如果文件夹不存在，则创建，加上 `-p`
```
$ mkdir -p 文件夹名
```

查看端口占用
```
sudo lsof -i -P | grep -i "port"
```
