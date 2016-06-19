#!/bin/sh
time=$(date)
#开始处理代码
sh web.sh
sed -i "s/\/static/http:\/\/7xsbbu.com1.z0.glb.clouddn.com\/static/g" ./*.html #使用七牛cdn减速服务
echo "$time $1" > ./static/text/version.txt
git add --all .
git commit -m "$time $1"
git pull
git push github master
git push origin master
git push gitlab master
sed -i "s/http:\/\/7xsbbu.com1.z0.glb.clouddn.com\/static/\/static/g" ./*.html
#自动部署代码
