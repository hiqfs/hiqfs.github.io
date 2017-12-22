//小功能的基础模块
serverjs = "https://hiqfs.herokuapp.com/";
function websocketio() {
    iosocket = io.connect(serverjs);
    iosocket.on('connect', function () {
        document.getElementsByTagName("status")[0].innerHTML="已连接";
    });
    iosocket.on('message', function (message) {
        console.log("收到消息");
    });
    iosocket.on('disconnect', function () {
        document.getElementsByTagName("status")[0].innerHTML='已断开';
    });
}
function emit(){
    if(document.getElementsByClassName("text")[0].value==null){
        text=document.getElementsByClassName("text")[0].innerHTML;
        console.log("test");
    }else{
        text=document.getElementsByClassName("text")[0].value;
    }
    iosocket.send(JSON.stringify([{"comment":text,"time": "data.time","ua": "navigator.userAgent"}, "duang"]));
    return true;
}
window.onload = function () {
    var qr = document.getElementById("qr");
    qr.setAttribute("src", "http://qr.liantu.com/api.php?m=5&text=" + window.location.href);
    websocketio();
}