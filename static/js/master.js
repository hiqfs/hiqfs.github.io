document.ready=()=>{
    var time = setInterval(()=>{
        document.getElementById("time").innerHTML = Date();
    },1000);
    //Calculate the time
};
window.onload=()=>{
    //Initialization Pages
    //Create New Play Music Event
    var MusicListId=[
        "1906526823",//小时光
        "1807610339",//晴天派
        "1811408137",//结庐人境
        "1809311512"//桃之夭夭
    ];
    var AvatarListId=[
        "002WUQUkly1gvo1qvn4gdj60u0140x1y02",
        "a11a1c14ly1gxoac2pk7ej21mo18ge81",
        "a11a1c14ly1gxoac1tpsej21811m5b29"
    ];
    MusicApiSrc="//music.163.com/song/media/outer/url?id=";
    PicApiSrc="//wx1.sinaimg.cn/large/"
    var Music=document.getElementById("music");
    var Title=document.getElementById("title");
    var Avatar=document.getElementById("avatar");
    Music.src=MusicApiSrc+MusicListId[0];
    Title.onclick=(e)=>{
       Click(MusicApiSrc,Music,MusicListId,true);
    };
    Avatar.onclick=(e)=>{
        Click(PicApiSrc,e.target,AvatarListId,false);
    };
    document.ready();
};
Click=(ApiUrl,Dom,List,Event)=>{
    Dom.setAttribute('num',parseInt(Dom.getAttribute('num'))+1);
    if(parseInt(Dom.getAttribute('num'))>=List.length){
        Dom.setAttribute('num',0);
    }
    Dom.src=ApiUrl+List[Dom.getAttribute('num')];
    if(Event){
        Dom.play();
    }
};