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
function cache(url, dom) {
    var db;
    var storeName = "cache";
    if (db) {
        console.log("二次调用");
        var transaction = db.result.transaction(storeName, 'readwrite');
        var store = transaction.objectStore(storeName);
        var request = store.get(url);
        request.onsuccess = function (e) {
            if (e.target.result) {
                console.log("命中缓存");
                document.getElementById("toux").src = URL.createObjectURL(e.target.result.file);
            } else {
                /*
                try {
                    let response = await fetch(url);
                    let data = response.blob();
                    db = e.target.transaction.db;
                    var transaction = db.transaction(["cache"], "readwrite");
                    var objectStore = transaction.objectStore("cache");
                    if (response.ok) {
                        var request = objectStore.add({ url: url, file: data });
                    }
                    document.getElementById("toux").src = URL.createObjectURL(data);
                    console.log(data);
                } catch (e) {
                    console.log("Oops, error", e);
                }
                */
                get(url, e);
            }
        };
    } else {
        console.log("首次调用");
        db = indexedDB.open("fileDB", 1);
        db.onerror = function (event) {
            alert("Database error: " + event.target.errorCode);
        };
        db.onupgradeneeded = function (event) {
            // 更新对象存储空间和索引 .... 
            db = event.target.result;
            var objectStore = db.createObjectStore("cache", {
                keyPath: 'url',
                autoIncrement: true
            });
            objectStore.createIndex("url", "url", { unique: true });
        };
        db.onsuccess = function (event) {
            console.log("打开数据库成功");
            var db = event.target.result;
            var transaction = db.transaction(["cache"], "readwrite");
            var objectStore = transaction.objectStore("cache");
            var request = objectStore.get(url);
            request.onsuccess = function (e) {
                if (e.target.result) {
                    console.log(e.target)
                    document.getElementById("toux").src = URL.createObjectURL(e.target.result.file);
                } else if (dom) {
                    get(url, e, dom);
                } else {
                    get(url, e);
                }
            };
        }
    }
}
async function get(url, e, dom) {
    try {
        let response = await fetch(url);
        let data = response.blob();
        db = e.target.transaction.db;
        var transaction = db.transaction(["cache"], "readwrite");
        var objectStore = transaction.objectStore("cache");
        if (response.ok) {
            var request = objectStore.add({ url: url, file: data });
        }
        document.getElementById("toux").src = URL.createObjectURL(data);
        console.log(data);
    } catch (e) {
        console.log("Oops, error", e);
    }
}