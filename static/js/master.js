if (window.location.host == "127.0.0.1") Cache = "no-cache";
else Cache = "default";
var $ = (a) => document.querySelector(a);
setInterval(() => $("#time").innerHTML = Date(), 1000);
//Calculate the time
//init Argument
var CDN = "https://bing-web-1251630625.cos-website.ap-nanjing.myqcloud.com/";
var MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
var PicApiSrc = "//ww1.sinaimg.cn/large/";
var Bili = "https://i0.hdslb.com/bfs/album/541402fb90c8de31a1336a18515e393bbb8a19be.jpg";
var BiliImgSrc = "//i0.hdslb.com/bfs/album/";
var JsonApiSrc = "https://json.extendsclass.com";
var JsonApiId = "bac32c6aa445";
fetch(JsonApiSrc + "/bin/" + JsonApiId, { cache: Cache }) //Get Data
    .then(response => response.json())
    .then(data => {
        JsonData = data;
        data.AvatarListId.push(Bili);
        $("#music").src = MusicApiSrc + data.MusicListId[0];
        $("#avatar").src = PicApiSrc + data.AvatarListId[0];
        $("#avatar").onload = (e) => {
            //console.log(e);
            e.target.style.display = "inline";
            $("#title").classList.remove("loading");
            $(".spinner").style.display = "none";
        }
        $("#title").onclick = (e) => { Click(MusicApiSrc, $("#music"), data.MusicListId,e); $("#music").play(); };
        $("#avatar").onclick = (e) => { $("#title").classList.add("loading"); Click(PicApiSrc, $("#avatar"), data.AvatarListId, e); };
    });
var Click = (ApiUrl, Dom, List, key) => {
    if (key.offsetX>(key.srcElement.width/2)) {//num--
        console.log("yes");
        Dom.setAttribute('num', parseInt(Dom.getAttribute('num')) + 1);
        if (parseInt(Dom.getAttribute('num')) >= List.length) {
            Dom.setAttribute('num', 0);
        }
    } else {//num++
        Dom.setAttribute('num', parseInt(Dom.getAttribute('num')) - 1);
        if (parseInt(Dom.getAttribute('num')) < 0) {
            Dom.setAttribute('num', List.length - 1);
        }
    }

    if (List[Dom.getAttribute('num')].substr(0, 4) == "http") {
        console.log(List[Dom.getAttribute('num')]);
        Dom.src = List[Dom.getAttribute('num')];
    } else {
        //console.log(List[Dom.getAttribute('num')].substr(0, 4));
        Dom.src = ApiUrl + List[Dom.getAttribute('num')];
    }
};
/*
document.addEventListener("keyup", Event => { //Bind Key
    switch (Event.key) {
        case "Enter":
            $("#title").onclick(true);
            break;
        case "Control":
            $("#avatar").onclick(true);
            break;
        case "ArrowRight":
            $("#avatar").onclick(true);
            break;
        case "ArrowLeft":
            $("#avatar").onclick(false);
            break;
        case "ArrowUp":
            //$("#title").onclick(false);
            break;
        case "ArrowDown":
            //$("#title").onclick(true);
            break;
    }
    return 0;
});
*/
var help = () => alert("Press the Control key to switch pictures\rPress the Enter key to switch muisc");