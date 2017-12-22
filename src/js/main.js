require.config({
    baseUrl: "http://7u2f38.com1.z0.glb.clouddn.com/ajax/libs/",
    paths: {
        "jquery": "jquery/3.0.0-beta1/jquery",
        "socket.io":"socket.io/1.4.5/socket.io.min",
        "bootstrap":"twitter-bootstrap/4.0.0-alpha/js/bootstrap.min",
        "tether":"tether/1.2.0/js/tether.min",
        "init":"//js/init"
    },
    shim: {
    	'init':{
    		deps: ['jquery'],
    	},
　　　　'socket.io': {
　　　　　　deps: ['jquery'],
　　　　}
　　}
});
require(['jquery', 'socket.io',"init",'tether','bootstrap'], function (jquery, socketio,tether,bootstrap){
	console.log("yes");
	alert("加载成功！");
});
//if(window.localStorage){if(window.localStorage.Codetime==date_time){eval(window.localStorage.js);var scss=document.createElement('style');var lcss=document.createTextNode(window.localStorage.css);scss.appendChild(lcss);document.head.appendChild(scss)}else{addload("http://7xsbbu.com1.z0.glb.clouddn.com/static/js/web.js?t=1479533359","js",true);addload("http://7xsbbu.com1.z0.glb.clouddn.com/static/css/web.css?t=1479533359","css",true);window.localStorage.Codetime=date_time}}else{addload("http://7xsbbu.com1.z0.glb.clouddn.com/static/js/web.js?t=1479533359","js",false);addload("http://7xsbbu.com1.z0.glb.clouddn.com/static/css/web.css?t=1479533359","css",false)}function addload(url,name,stat){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.onload=function(){if(name=="js"){var sjs=document.createElement('script');var ljs=document.createTextNode(xhr.response);sjs.appendChild(ljs);document.head.appendChild(sjs);if(stat){localStorage.setItem("js",xhr.response)}}else if(name=="css"){var scss=document.createElement('style');var lcss=document.createTextNode(xhr.response);scss.appendChild(lcss);document.head.appendChild(scss);if(stat){localStorage.setItem("css",xhr.response)}}else{console.log("error")}};xhr.onerror=function(){console.log("Oops, error")};xhr.send()}
