var time = setInterval(() => {
    document.getElementById("time").innerHTML = Date();
}, 1000);
//Calculate the time
var MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
var PicApiSrc = "//wx1.sinaimg.cn/large/";
var bili = "https://i0.hdslb.com/bfs/album/541402fb90c8de31a1336a18515e393bbb8a19be.jpg";
var BiliImgSrc = "//i0.hdslb.com/bfs/album/";
var JsonApiSrc = "https://json.extendsclass.com";
var JsonApiId = "bac32c6aa445";
fetch(JsonApiSrc + "/bin/bac32c6aa445")
    .then(response => response.json())
    .then(data => {
        document.getElementById("music").src = MusicApiSrc + data.MusicListId[0];
        document.getElementById("avatar").src = PicApiSrc + data.AvatarListId[0];
        document.getElementById("title").onclick = (e) => {
            Click(MusicApiSrc, document.getElementById("music"), data.MusicListId, true);
        };
        document.getElementById("avatar").onclick = (e) => {
            Click(PicApiSrc, document.getElementById("avatar"), data.AvatarListId, false);
        };
    });
var Click = (ApiUrl, Dom, List, play) => {
    Dom.setAttribute('num', parseInt(Dom.getAttribute('num')) + 1);
    if (parseInt(Dom.getAttribute('num')) >= List.length) {
        Dom.setAttribute('num', 0);
    }
    if (List[Dom.getAttribute('num')].substr(0, 4) == "bili") {
        console.log(List[Dom.getAttribute('num')]);
        Dom.src = BiliImgSrc + List[Dom.getAttribute('num')] + ".jpg";
        console.log("bilibili yes");
    } else {
        //console.log(List[Dom.getAttribute('num')].substr(0, 4));
        Dom.src = ApiUrl + List[Dom.getAttribute('num')];
    }
    if (play) Dom.play();
};
document.addEventListener("keyup", Event => {
    if (Event.key == "Enter") document.getElementById("title").onclick();
    if (Event.key == "Control") document.getElementById("avatar").onclick();
    return;
});
window.onload = () => {
    if (window.location.hash == "#cache") {
        console.log("hello");
        dd = fetch(JsonApiSrc + "/bin/bac32c6aa445", { cache: "no-cache" });
    }
}