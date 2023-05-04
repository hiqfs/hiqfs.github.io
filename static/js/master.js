if (window.location.host == "127.0.0.1") Cache = "no-cache";
else Cache = "default";
var $ = (a) => document.querySelector(a);
setInterval(() => $("#time").innerHTML = Date(), 1000);
//Calculate the time
//init Argument
var CDN = "https://bing-web-1251630625.cos-website.ap-nanjing.myqcloud.com/";
var MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
//var PicApiSrc = "https://bing-web-1251630625.cos.ap-nanjing.myqcloud.com/large/";
var PicApiSrc = "https://image.baidu.com/search/down?url=https://ww1.sinaimg.cn/large/";
var JsonApiSrc = "https://json.extendsclass.com";
var JsonApiId = "06f977f8e566";
var PicNum = 0, MusicNum = 0,Event = true;
var Arr = new Array();
fetch(JsonApiSrc + "/bin/" + JsonApiId, { cache: Cache }) //Get Data
    .then(response => response.json())
    .then(data => {
        JsonData = data;
        for(let i = 1;i<=data.AvatarListId.length;i++){Arr.push(new Image());}
        Arr[0].src = Click(PicApiSrc, data.AvatarListId,0);
        $("#music").src = MusicApiSrc + data.MusicListId[0];
        $("#avatar").src = Arr[0].src;
        $("#avatar").onerror = () => {
            $("#title").classList.remove("loading");
            $(".spinner").innerHTML = "<H2>Unable to connect to the image server</H2>";
        };
        $("#avatar").onload = (e) => {
            e.target.style.display = "inline";
            $("#title").classList.remove("loading");
            $(".spinner").style.display = "none";
            var Per = CheckLength(Event, PicNum, JsonData.AvatarListId.length);
            Arr[Per].src = Click (PicApiSrc, data.AvatarListId, Per);
            $("#progress").value = PicNum/JsonData.AvatarListId.length;
        }
        $("#title").onclick = () => {
            MusicNum = CheckLength(true, MusicNum, data.MusicListId.length);
            $("#music").src = MusicApiSrc + data.MusicListId[MusicNum];
            $("#music").play();
        };
        $("#avatar").onclick = (e) => {
            $("#title").classList.add("loading");
            PicNum = CheckLength((e.offsetX > (e.srcElement.width / 2)), PicNum, JsonData.AvatarListId.length);
            Arr[PicNum].src = Click(PicApiSrc, data.AvatarListId);
            $("#avatar").src = Arr[PicNum].src;
        };
    })
    .catch(() => {
        $(".spinner").innerHTML = "<H2>Unable to connect to the server</H2>";
    });
var CheckLength = (next, arr, lens) => {
    Event = next;
    next ? arr++ : arr--;
    return arr >= 0 ? arr % lens : lens + arr;
}
var Click = (ApiUrl, List, Per) => {
    var Num = Per ? Per : PicNum;
    if (List[Num].substr(0, 4) == "http") {
        return List[Num];
    } else {
        return ApiUrl + List[Num] + ".jpg";
    }
};

document.addEventListener("keyup", Event => { //Bind Key
    switch (Event.key) {
        case "Enter":
            MusicNum = CheckLength(true, MusicNum, JsonData.data.MusicListId.length);
            $("#music").src = MusicApiSrc + data.MusicListId[MusicNum];
            $("#music").play();
            break;
        case "Control":
            PicNum = CheckLength(true, PicNum, JsonData.AvatarListId.length);
            Arr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            $("#avatar").src = Arr[PicNum].src;
            break;
        case "ArrowRight":
            PicNum = CheckLength(true, PicNum, JsonData.AvatarListId.length);
            Arr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            $("#avatar").src = Arr[PicNum].src;
            break;
        case "ArrowLeft":
            PicNum = CheckLength(false, PicNum, JsonData.AvatarListId.length);
            Arr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            $("#avatar").src = Arr[PicNum].src;
            break;
    }
    return 0;
});
var help = () => alert("Press the Control key to switch pictures\rPress the Enter key to switch muisc");
