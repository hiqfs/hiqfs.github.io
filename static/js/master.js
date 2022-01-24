document.ready = () => {
    var time = setInterval(() => {
        document.getElementById("time").innerHTML = Date();
    }, 1000);
    //Calculate the time
};
window.onload = () => {
    //Initialization Pages
    //Create New Play Music Event
    MusicApiSrc = "//music.163.com/song/media/outer/url?id=";
    PicApiSrc = "//wx1.sinaimg.cn/large/"
    var Music = document.getElementById("music");
    var Title = document.getElementById("title");
    var Avatar = document.getElementById("avatar");
    fetch('https://json.extendsclass.com/bin/bac32c6aa445')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            Music.src = MusicApiSrc + data.MusicListId[0];
            Title.onclick = (e) => {
                Click(MusicApiSrc, Music, data.MusicListId, true);
            };
            Avatar.onclick = (e) => {
                Click(PicApiSrc, e.target, data.AvatarListId, false);
            };
        });
    document.ready();
};
Click = (ApiUrl, Dom, List, Event) => {
    Dom.setAttribute('num', parseInt(Dom.getAttribute('num')) + 1);
    if (parseInt(Dom.getAttribute('num')) >= List.length) {
        Dom.setAttribute('num', 0);
    }
    Dom.src = ApiUrl + List[Dom.getAttribute('num')];
    if (Event) {
        Dom.play();
    }
};
