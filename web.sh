#!/bin/sh
cleancss ./static/css/web.i.css ./static/css/master.css  --s0 > ./static/css/web.css
uglifyjs --no-copyright ./static/js/web.i.js ./static/js/commit.dev.js ./static/js/init.js > ./static/js/web.js
timestamp=$(date '+%s')
sed -i "s/date_time = \"[0-9]*\"/date_time = \"$timestamp\"/g" ./index.html
#cd ..
#taesync -local C:\Users\hiqfs\git\tat.conf.properties
echo ok
