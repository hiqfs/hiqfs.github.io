if (window.location.host == "127.0.0.1") {
    console.log("hello this debug model");
    Cache = "no-cache";
} else {
    Cache = "default";
}
var time = setInterval(() => {
    document.getElementById("time").innerHTML = Date();
}, 1000);
//Calculate the time
var CDN = "https://bing-web-1251630625.cos-website.ap-nanjing.myqcloud.com/";
var MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
var PicApiSrc = "//ww1.sinaimg.cn/large/";
var bili = "https://i0.hdslb.com/bfs/album/541402fb90c8de31a1336a18515e393bbb8a19be.jpg";
var BiliImgSrc = "//i0.hdslb.com/bfs/album/";
var JsonApiSrc = "https://json.extendsclass.com";
var JsonApiId = "bac32c6aa445";
fetch(JsonApiSrc + "/bin/" + JsonApiId, { cache: Cache })
    .then(response => response.json())
    .then(data => {
        JsonData = data;
        data.AvatarListId.push(bili);
        data.AvatarListId.push("https://loli.tc/images/342c59432878961fda1bc3d96e1bd526.png");
        document.getElementById("music").src = MusicApiSrc + data.MusicListId[0];
        document.getElementById("avatar").src = PicApiSrc + data.AvatarListId[0];
        document.getElementById("avatar").onload = (e) => {
            //console.log(e);
            e.target.style.display = "inline";
            document.getElementsByClassName("spinner")[0].style.display = "none";
        }

        document.getElementById("title").onclick = (e) => {
            Click(MusicApiSrc, document.getElementById("music"), data.MusicListId, e);
            document.getElementById("music").play();
        };
        document.getElementById("avatar").onclick = (e) => {
            Click(PicApiSrc, document.getElementById("avatar"), data.AvatarListId, e);
        };
    });
var Click = (ApiUrl, Dom, List, key) => {
    if (key) {//num--
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
        console.log("bilibili yes");
    } else {
        //console.log(List[Dom.getAttribute('num')].substr(0, 4));
        Dom.src = ApiUrl + List[Dom.getAttribute('num')];
    }
};
document.addEventListener("keyup", Event => {
    switch (Event.key) {
        case "Enter":
            document.getElementById("title").onclick(true);
            break;
        case "Control":
            document.getElementById("avatar").onclick(true);
            break;
        case "ArrowRight":
            document.getElementById("avatar").onclick(true);
            break;
        case "ArrowLeft":
            document.getElementById("avatar").onclick(false);
            break;
        case "ArrowUp":
            //document.getElementById("title").onclick(false);
            break;
        case "ArrowDown":
            //document.getElementById("title").onclick(true);
            break;
    }
    return 0;
});
var help = () => {
    alert("Press the Control key to switch pictures\rPress the Enter key to switch muisc");
}