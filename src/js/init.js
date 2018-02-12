stava = false;//评论是否加载失败;
$(function () {
    //show_code_time();
    //$('#bar').load("/bar.html");
    //hius();
    //mobile();
    //var heighttmp;
    // box为被拖放的区域
    var box = document.getElementById("ti");//输入框
    box.addEventListener('dragover', function (e) {
        e.preventDefault(); // 必须阻止默认事件
    });
    box.addEventListener('drop', function (e) {
        var file = e.dataTransfer.files;
        if (e.dataTransfer.getData("Text")) {
            var html = "<img src=\"" + e.dataTransfer.getData("Text") + "\">";
            $("#ti").append(html);
        }
        e.preventDefault(); // 阻止默认事件
        for (var i = 0; i < file.length; i++) {
            if (file[i].type.indexOf("image") == 0) {
                UpladFile(file[i]); //获取文件对象		
            } else {
                console.log("不是图片");
            }
        }
    });
    mob = mobile(); //判断是否为移动端
    if (window.location.hash == "") {//判断地址
        chome();
    } else if (window.location.hash == "#!/cping") {
        cping();
    } else if (window.location.hash == "#!/cabout") {
        cabout();
    }
    /*
        if (ashstatus) {
            heighttmp = 0;
        }
    */
    //cache("http://77flfx.com5.z0.glb.clouddn.com/0060lm7Tgw1f55fj7owmuj30fk0fk0td.jpg");
    document.getElementsByTagName("load")[0].remove();
    document.getElementsByTagName("xmd")[0].style.display = "";//显示页面主体
    $("#musica").click(function () {//音乐栏点击事件
        if ($(this).css("left") == "0px") {
            $(this).animate({
                left: '280px'
            });
            $("#musicd").animate({
                left: "0px"
            });
        } else {
            $("#musicd").animate({
                left: "-280px"
            });
            $(this).animate({
                left: '0px'
            });
        }
    });
    //$("xmd").show();
    init_comment();//评论初始化
    code_time = new Date(parseInt(date_time) * 1000);//获取代码更新时间
    document.getElementById("banben").innerHTML =
        "Code最后更新时间<br>"
        + code_time.getFullYear() + "年"
        + (code_time.getMonth() + 1) + "月"
        + code_time.getDate() + "日" + " "
        + code_time.getHours() + "时"
        + code_time.getMinutes() + "分"
        + code_time.getSeconds() + "秒";
    //获取服务器token和评论数
    $.ajax({
        url: api.serverphp + api.php_api.token,
        async: true,
        success: function (data, textStatus) {
            token = data;
        }
    });
    $.ajax({
        url: api.serverphp + api.php_api.num,
        async: true,
        success: function (data, textStatus) {
            comment_num = data;
        }
    });
    $(document).keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 13) {
            if (window.location.hash == "#!/cping") {
                $("#jiao").click();
            }
        }
        if (window.location.hash != "#!/cping" && event.altKey && event.keyCode == 90) {
            window.location.hash = "#!/cping";
            $(".nav-link, #b1").click();
        }
        if (window.location.hash == "#!/cping" && event.altKey && event.keyCode == 80) {
            $('#ti').focus();
        }
        return true;
    });
    websocketio();//连接socketio
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            document.title = '(つェ⊂)我藏好了哦~ ' + OriginTitile;
            var titleTime;
            clearTimeout(titleTime);
        }
        else {
            document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
            titleTime = setTimeout(function () {
                document.title = OriginTitile;
            }, 2000);
        }
    });
});
function mobile() {
    $("#root").css("background-attachment", "fixed");
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        //canvas();
        return true;
    } else {
        $("#root").css("background-image", "url(http://7u2f38.com5.z0.glb.clouddn.com/DwAKdwvY68a7fQAAAABJRU5ErkJggg==.png)");
        $("#musica").css("display", "block");
        document.getElementById("musicd").src="http://music.163.com/outchain/player?type=0&id=92384486&auto=0&height=430";
        return false;
    }
}

function hitokoto(hi) {
    $('#hitokoto').empty();
    if (hi.source) {
        text = "<p>" + hi.hitokoto + "<br>来自：" + hi.source + "</p>";
    } else {
        text = "<p>" + hi.hitokoto + "</p>";
    }
    $('#hitokoto').html(text);
}

function delete_us() {
    var us = document.getElementById('root');
    var usid = document.getElementById('us');
    us.removeChild(usid);
}

function hius() {
    var hjs = document.createElement('script');
    hjs.setAttribute('id', 'us');
    //同步bug
    //hjs.setAttribute('async', 'async');
    hjs.setAttribute('src', 'http://api.hitokoto.us/rand?encode=jsc');
    document.body.appendChild(hjs);
}

function baidufen(argument) { //百度分享
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "16"
        },
        "slide": {
            "type": "slide",
            "bdImg": "0",
            "bdPos": "right",
            "bdTop": "190.5"
        }
    };
    with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src =
        'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
}
var heighttmp;//初始化高度
//baidufen();
function cping() {
    //$("#commitload").show();
    $("#ping").show();
    $("#hcond").animate({
        marginTop: '100px'
    });
    $("#b1").addClass(function () {
        $("li a").removeClass("active");
        return "active";
    });
    OriginTitile = document.title = "喵窝留言板⊙ω⊙";
    $("#title").html("喵窝留言板⊙ω⊙");
    $("#ping").show();
    //init_comment();
    init();
    //$("#commitload").hide();
    sjmo();//创建关于留言板事件
    if (heighttmp > 400) {
        scroll(0, heighttmp - 400);
        $('body,html').animate({ scrollTop: heighttmp }, 400);
        //该死的特效
    } else {
        $('body,html').animate({ scrollTop: heighttmp }, 400);
    }
    //$("#ti").focus();
    /*if (heighttmp) {
        if ($(window).height() > heighttmp) {
            $('body,html').animate({
                scrollTop: heighttmp
            }, 400);
        }
    }*/
}

function cabout() {
    // $("#hcond").show();
    $('#b3').hide("100");
    //$("#ping").empty();
    $(window).off();
    $("body,html").off();
    $("#b3").off();
    $("#hcond").hide();
    $("#b2").addClass(function () {
        $("li a").removeClass("active");
        return "active";
    });
    //$("#hcond").fadeOut(500);
    OriginTitile = document.title = "关于喵窝";
    $("about").fadeIn("5000");
    //$("about").show();
    if(document.getElementById("toux").src){
        if(localStorage){
            document.getElementById("toux").src = localStorage.toux;            
        }else{
            document.getElementById("toux").src = "http://77flfx.com5.z0.glb.clouddn.com/0060lm7Tgw1f55fj7owmuj30fk0fk0td.jpg";
        }
    }
}

function chome() {
    $("#hcond").animate({
        marginTop: '150px'
    });
    $("#home").addClass(function () {
        $("li a").removeClass("active");
        return "active";
    });
    OriginTitile = document.title = "喵窝首页∩ω∩";
    $("#title").html("欢迎来到喵窝∩ω∩");
    window.location.hash = "";
    $(window).off("scroll");
}

function urlchenge() {
    /*
    hius();
    delete_us();
    */
    //$("#commitload").hide();
    $("#hcond").show();
    $("#ping").hide();
    $("body,html").off();
    $("#b3").off();
    $("about").hide();
    $(window).off();
    if (window.location.hash == "") {
        chome();
        $("#b3").hide();
    }
    if (window.location.hash == "#!/cping") {
        cping();
    }
    if (window.location.hash == "#!/cabout") {
        cabout();
    }
}
function show_code_time() {
    window.setTimeout("show_code_time()", 1000);
    today = new Date();
    timeold = (today.getTime() - 1434339000000);
    sectimeold = timeold / 1000
    secondsold = Math.floor(sectimeold);
    msPerDay = 24 * 60 * 60 * 1000
    e_daysold = timeold / msPerDay
    daysold = Math.floor(e_daysold);
    e_hrsold = (e_daysold - daysold) * 24;
    hrsold = Math.floor(e_hrsold);
    e_minsold = (e_hrsold - hrsold) * 60;
    minsold = Math.floor((e_hrsold - hrsold) * 60);
    seconds = Math.floor((e_minsold - minsold) * 60);
    //$("#span_dt_dt").text(daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒");
    document.getElementById("span_dt_dt").innerHTML = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
}
function UpladFile(file) {
    var obj = document.getElementById('qifile');
    if (file) {
        var fileObj = file;
    } else {
        var fileObj = document.getElementById("qifile").files[0];
    } // 获取文件对象
    var FileController = "http://upload.qiniu.com/";                    // 接收上传文件的后台地址
    var form = new FormData();
    //form.append("kay","key()");
    form.append("token", window.token);                        // 可以增加表单数据
    form.append("file", fileObj);                           // 文件对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onloadstart = function (evt) {
        console.log("触发");
        $("i.upimgicon").toggleClass("fa-plus").toggleClass("fa-circle-o-notch").toggleClass("fa-spin");
    };
    xhr.onload = function () {
        alert("上传完成!");
        $("i.upimgicon").toggleClass("fa-plus").toggleClass("fa-circle-o-notch").toggleClass("fa-spin");
        console.log(xhr.responseText);
        var tmp = eval("(" + xhr.responseText + ")");
        $("#ti").append("<img src=\"" + servercdnn + tmp.hash + "\" hash=\"" + tmp.hash + "\">");
    };
    if (fileObj == undefined) {
        console.log("没有图片");
    } else if (token == undefined) {
        alert("服务器未响应");
    } else {
        obj.outerHTML = obj.outerHTML;
        xhr.send(form);
    }
}
function debug() {
    //上帝模式（开发者模式）
    if (true) {
        console.log("开发者模式启动");
        return true;
    } else {
    }
}
function battery() {
    //手机电量
}
/*
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/static/js/sw.js').then(function(registration) {
        console.log('service worker 注册成功');
    }).catch(function (err) {
        console.log('servcie worker 注册失败');
        console.log(err);
    });
}else{
    console.log("浏览器不支持");
}
*/