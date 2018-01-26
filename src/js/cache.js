var db = new Array();
function cache(url, dom) {
    console.log(url, dom);
    var storeName = "cache";
    if (db[0]) {
        console.log("二次调用");
        for(var i = 0 ;i < 9;i++){
            if(db[i]){
                if(db[i].readyState=="done"){
                    console.log(db[i]);
                    get(url, db[i].result, dom);
                    continue;
                }else{
                    continue;
                }
            }else {
                console.log("数据库忙");
                db[i] = indexedDB.open("fileDB", i+1);
                db[i].onsuccess = function (event) {
                    console.log("打开数据库成功");
                    console.log(event.target.result);
                    var db = event.target.result;
                    get(url, db[i], dom);
                }
                continue;
            }
        }
    } else {
        console.log("首次调用");
        db[0] = indexedDB.open("fileDB", 1);
        db[0].onerror = function (event) {
            alert("Database error: " + event.target.errorCode);
        };
        db[0].onupgradeneeded = function (event) {
            // 更新对象存储空间和索引 .... 
            var db = event.target.result;
            var objectStore = db.createObjectStore("cache", {
                keyPath: 'url',
                autoIncrement: true
            });
            objectStore.createIndex("url", "url", { unique: true });
        };
        db[0].onsuccess = function (event) {
            console.log("打开数据库成功");
            var db = event.target.result;
            get(url, db, dom);
        }
    }
}
function get(url, db, dom) {
    console.log(db);
    console.log("获取数据");
    var transaction = db.transaction("cache", 'readwrite');
    var store = transaction.objectStore("cache");
    var request = store.get(url);
    request.onsuccess = function (e) {
        if (e.target.result) {
            console.log(e.target);
            console.log("yes");
            //event = URL.createObjectURL(e.target.result.file);
            dom.attr("src", URL.createObjectURL(e.target.result.file));
        } else {
            fetch(url).then(function (response) {
                return response.blob();
            }).then(function (data) {
                dd = e.target.transaction.db;
                console.log("no");
                var transaction = dd.transaction(["cache"], "readwrite");
                var objectStore = transaction.objectStore("cache");
                var request = objectStore.add({ url: url, file: data });
                //event  = URL.createObjectURL(response);
                dom.attr("src", URL.createObjectURL(data));
            }).catch(function (e) {
                console.log("Oops, error", e);
            });
        }
    };
}