#!/bin/bash

echo "拉取最新文件..."
git reset --hard origin/master
git clean -f
git pull origin master

echo "结束拉取最新文件"
echo "重新构建项目..."

npm run build

echo "结束构建项目"
