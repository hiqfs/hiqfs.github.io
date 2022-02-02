var time = setInterval(() => {
    document.getElementById("time").innerHTML = Date();
}, 1000);
//Calculate the time
var MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
var PicApiSrc = "//wx1.sinaimg.cn/large/";
var JsonApiSrc = "https://json.extendsclass.com";
var JsonApiId = "bac32c6aa445";
fetch(JsonApiSrc + "/bin/bac32c6aa445")
    .then(response => response.json())
    .then(data => {
        asdsad=data;
        console.log(data);
        document.getElementById("music").src = MusicApiSrc + data.MusicListId[0];
        document.getElementById("avatar").src = PicApiSrc + data.AvatarListId[0];
        document.getElementById("title").onclick = (e) => {
            Click(MusicApiSrc, document.getElementById("music"), data.MusicListId, true);
        };
        document.getElementById("avatar").onclick = (e) => {
            Click(PicApiSrc, document.getElementById("avatar"), data.AvatarListId, false);
        };
    });
var Click = (ApiUrl, Dom, List, Event) => {
    Dom.setAttribute('num', parseInt(Dom.getAttribute('num')) + 1);
    if (parseInt(Dom.getAttribute('num')) >= List.length) {
        Dom.setAttribute('num', 0);
    }
    Dom.src = ApiUrl + List[Dom.getAttribute('num')];
    if (Event) {
        Dom.play();
    }
};
document.addEventListener("keyup", Event => {
    if (Event.key == "Enter") document.getElementById("title").onclick();
    if (Event.key == "Control") document.getElementById("avatar").onclick();
    return;
});