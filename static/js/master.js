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
var PicNum = 0, MusicNum = 0;
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
        $("#title").onclick = (e) => {
            MusicNum++;
            MusicNum = MusicNum > 0 ? MusicNum : data.MusicListId.length + MusicNum;
            MusicNum = MusicNum % data.MusicListId.length;
            $("#music").src = MusicApiSrc + data.MusicListId[MusicNum];
            $("#music").play();
        };
        $("#avatar").onclick = (e) => {
            $("#title").classList.add("loading");
            e.offsetX > (e.srcElement.width / 2) ? PicNum++ : PicNum--;
            PicNum = PicNum > 0 ? PicNum : data.AvatarListId.length + PicNum;
            PicNum = PicNum % data.AvatarListId.length;
            $("#avatar").src = Click(PicApiSrc, data.AvatarListId);
        };
    });
var Click = (ApiUrl, List) => {
    if (List[PicNum].substr(0, 4) == "http") {
        return List[PicNum];
    } else {
        return ApiUrl + List[PicNum];
    }
};

document.addEventListener("keyup", Event => { //Bind Key
    switch (Event.key) {
        case "Enter":
            MusicNum++;
            MusicNum = MusicNum > 0 ? MusicNum : data.MusicListId.length + MusicNum;
            MusicNum = MusicNum % data.MusicListId.length;
            $("#music").src = MusicApiSrc + data.MusicListId[MusicNum];
            $("#music").play();
            break;
        case "Control":
            PicNum++;
            PicNum = PicNum > 0 ? PicNum : data.AvatarListId.length + PicNum;
            PicNum = PicNum % data.AvatarListId.length;
            $("#avatar").src = Click(PicApiSrc, data.AvatarListId);
            break;
        case "ArrowRight":
            PicNum++;
            PicNum = PicNum > 0 ? PicNum : JsonData.AvatarListId.length + PicNum;
            PicNum = PicNum % JsonData.AvatarListId.length;
            $("#avatar").src = Click(PicApiSrc, JsonData.AvatarListId);
            break;
        case "ArrowLeft":
            PicNum--;
            PicNum = PicNum > 0 ? PicNum : JsonData.AvatarListId.length + PicNum;
            PicNum = PicNum % JsonData.AvatarListId.length;
            $("#avatar").src = Click(PicApiSrc, JsonData.AvatarListId);
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
//var help = () => alert("Press the Control key to switch pictures\rPress the Enter key to switch muisc");