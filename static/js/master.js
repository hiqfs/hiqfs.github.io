var $ = (Event) => document.querySelector(Event);
setInterval(() => $("#time").innerHTML = Date(), 1000);
var MusicApiSrc = "https://music.163.com/song/media/outer/url?id=";
var PicApiSrc = "https://i0.wp.com/tvax3.sinaimg.cn/large/";
var JsonApiSrc = "https://json.extendsclass.com";
var SupportCode = "https://p.sda1.dev/14/2d4d0436ed9cb72b01e874916bf8965f/D2F6A717-0124-43B3-BB95-93BB431C5C6B.jpeg";
var JsonApiId = "06f977f8e566";
var PicNum = 0, MusicNum = 0;
var PicArr = new Array();
fetch(JsonApiSrc + "/bin/" + JsonApiId) //Get Data
    .then(response => response.json())
    .then(data => {
        JsonData = data;
        for (let i = 1; i <= data.AvatarListId.length; i++) { PicArr.push(new Image()); }
        $("#music").src = MusicApiSrc + data.MusicListId[0];
        $("#avatar").src = PicArr[PicNum].src = Click(PicApiSrc, data.AvatarListId, 0);
        $("#avatar").onerror = () => {
            $("#title").classList.remove("loading");
            $(".spinner").innerHTML = "<H2>Sorry Unable to connect to the image server</H2>";
        };
        $("#avatar").onload = () => {
            $("#title").classList.remove("loading");
            $("#progress").value = PicNum / JsonData.AvatarListId.length;

        }
        $("#title").onclick = () => {
            MusicNum = CheckLength(true, MusicNum, data.MusicListId.length);
            $("#music").src = MusicApiSrc + data.MusicListId[MusicNum];
            $("#music").play();
        };
        $("#avatar").onclick = (e) => {
            $("#title").classList.add("loading");
            PicNum = CheckLength((e.offsetX > (e.srcElement.width / 2)), PicNum, JsonData.AvatarListId.length);
            $("#avatar").src = PicArr[PicNum].src = Click(PicApiSrc, data.AvatarListId);
        };
        $(".spinner").remove();
    })
    .catch(() => {
        $(".spinner").innerHTML = "<H2>Unable to connect to the server</H2>";
    });
var CheckLength = (next, arr, lens) => {
    next ? arr++ : arr--;
    return arr >= 0 ? arr % lens : lens + arr;
}
var Click = (ApiUrl, List, Per) => {
    var Num = Per ? Per : PicNum;
    total(Num);
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
            $("#avatar").src = PicArr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            break;
        case "ArrowRight":
            PicNum = CheckLength(true, PicNum, JsonData.AvatarListId.length);
            $("#avatar").src = PicArr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            break;
        case "ArrowLeft":
            PicNum = CheckLength(false, PicNum, JsonData.AvatarListId.length);
            $("#avatar").src = PicArr[PicNum].src = Click(PicApiSrc, JsonData.AvatarListId);
            break;
    }
    return 0;
});
var total = (Num) => {
    $("total").innerHTML = "<total>Total images: " + (Num + 1) + "/" + JsonData.AvatarListId.length + "</total><br>";
}
var support = () => $("#avatar").src = SupportCode;
window.onload = () => {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            $("#slogan").innerText = data.hitokoto;
        });
}
