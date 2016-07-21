#!/bin/sh
time=$(date)
#开始处理代码
sh web.sh
sed -i "s/\/static/http:\/\/7xsbbu.com1.z0.glb.clouddn.com\/static/g" ./*.html #使用七牛cdn减速服务
git add --all .
if [ -n "$f1" ];then
	git commit -m "$1"
else
	git commit -m "$time"
fi
echo "$time" > ./static/text/version.txt
git pull
git push github master
git push origin master
git push gitlab master
sed -i "s/http:\/\/7xsbbu.com1.z0.glb.clouddn.com\/static/\/static/g" ./*.html
#自动部署代码
