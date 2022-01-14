document.ready=()=>{
    var time = setInterval(()=>{
        document.getElementById("time").innerHTML = Date();
    },1000);
};
window.onload=()=>{
    var Music=document.getElementById("music");
    var MusicListId=[
        "1906526823",//小时光
        "1807610339"//晴天派
    ];
    var MusciId=0;
    MusicApiSrc="//music.163.com/song/media/outer/url?id=";
    Music.src=MusicApiSrc+MusicListId[MusciId]+".mp3";
    var Title=document.getElementById("title");
    Title.onclick=()=>{
        MusciId++;
        if(MusciId>=MusicListId.length){
            MusciId=0;
        }
        Music.src=MusicApiSrc+MusicListId[MusciId]+".mp3";
    };
    document.ready();
};