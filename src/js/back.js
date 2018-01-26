/*
if (navigator.serviceWorker) {
navigator.serviceWorker.register('/static/js/sw.js').then(function (registration) {
    console.log('service worker 注册成功');
}).catch(function (err) {
    console.log('servcie worker 注册失败');
    console.log(err);
});
} else {
console.log("浏览器不支持");
}*/
if (!window.localStorage) {
    console.log("oh no");
} else {
    if (eval("localStorage.js_time_" + date_time)) {
        eval(eval("localStorage.js_time_" + date_time));
        console.log("ok");
    } else {
        fetch('/static/js/web.js?t=1494486428').then(response => response.text())
            .then(response => {
                localStorage.clear();
                eval("localStorage.js_time_" + date_time + "=response");
                eval(response);
            })
            .catch(e => console.log("Oops, error", e));
    }
    if (eval("localStorage.css_time_" + date_time)) {
        var para = document.createElement("style");
        var node = document.createTextNode(eval("localStorage.css_time_" + date_time));
        para.appendChild(node);
        document.head.appendChild(para);
        console.log("ok");
    } else {
        fetch('/static/css/web.css?t=1494486428').then(response => response.text())
            .then(response => {
                //localStorage.clear();
                //document.getElementById("css").innerHTML=eval("localStorage.css_time_" + date_time);
                var para = document.createElement("style");
                var node = document.createTextNode(response);
                para.appendChild(node);
                document.head.appendChild(para);
                eval("localStorage.css_time_" + date_time + "=response");
            })
            .catch(e => console.log("Oops, error", e));
    }
}
flie = new FileReader();
if (localStorage.toux) {
    console.log("oh yes");
} else {
    fetch('http://77flfx.com5.z0.glb.clouddn.com/0060lm7Tgw1f55fj7owmuj30fk0fk0td.jpg').then(response => response.blob())
        .then(response => {
            var reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = function () {
                localStorage.toux = reader.result;
            }
        })
        .catch(e => console.log("Oops, error", e));
}