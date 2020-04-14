# Git好用的配置与技巧

## git alias（命令行简写）

```bash
cd ~
curl -O https://raw.githubusercontent.com/GitAlias/gitalias/master/gitalias.txt
mv gitalias.txt .gitalias.txt
git config --global include.path ~/.gitalias.txt
```

常用好用的简写命令行

```bash
ggl // 检查远程是否有更新
gst // 本地改动情况
gco // 切换分支或者重置文件修改
gcam // 提交以及message
gp //  
```

## 提交前的全局信息配置

```bash
git config --global user.name 'nickname'
git config --global user.email you@example.com
```

## 默认push当前分支

```bash
git config --global push.default 'current'
```

配合`git alias`，直接`gp`，爽