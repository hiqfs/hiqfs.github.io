//代码重构
serverjs = "https://hiqfs.herokuapp.com/";
//serverphp = "https://jaber.daoapp.io";
//serverphp = "http://server-php.coding.io";
serverphp = "http://php-servers.hifs.tk/";
servercdn = [ //cdn服务器列表
    "http://7xljsf.com1.z0.glb.clouddn.com/",
    "http://7xr863.dl1.z0.glb.clouddn.com/",
    "http://7xr867.com1.z0.glb.clouddn.com/",
    "http://7xr9yh.com1.z0.glb.clouddn.com/"
]; //随机数分流
function init_comment() {
    if (!window.id) {
        window.id = 0; //页数初始化为零
        commitNum = 0; //评论偏移数
        CommentNum(0); //评论初始化
        stava = true;
        $("#jiao").bind("click", function () {
            $(this).attr("disabled", true);
            $(this).css("background-color", "#6F6F6F");
            $(this).text("发送中...");
            if (timetmp >= new Date().getTime()) {
                alert("发太快了哦");
            } else {
                tijiaopost();
                timetmp = new Date().getTime() + 3000;
            }
            $(this).css("background-color", "#00a3cf");
            $(this).html("<i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i> 发送");
            $(this).attr("disabled", false);
        });
    }
}
servercdnn = servercdn[Math.floor(Math.random() * servercdn.length)];//随机使用cdn服务器

function init(argument) { //脚本初始化函数
    //评论加载
    htmlinit(); //处理图片和哈希资源
    var index = Math.floor(Math.random() * (12 - 1 + 1) + 1); //评论框随机背景
    $("#ti").css("background-image", "url(http://7u2f38.com5.z0.glb.clouddn.com/bk" + index + ".jpg)");
    //footer(); //底部加载脚本初始化
    /*
    if (window.status) { //服务器自动状态提醒
        $('status').text('已连接');
        $('status').css("background-color", "#0275d8");
    } else {
        websocketio();
    }
    */
}
//init(); //脚本初始化

function commit() {
    $(document).ready(function () {
        comment = $.ajax({
            url: serverphp + "/read.php?line=1",
            cache: false,
            async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                document.getElementById("commit").innerHTML = "<div class='comment' ><p> _(:qゝ∠)_  错误：加载超时，刷新看看....</p></div>";
            },
        });
        var com = comment.responseText;
        var commit = com.replace(/\n/g, "<br>");
        document.getElementById("commit").innerHTML = commit;
        htmlinit();
    });
}

function tijiaopost() {
    if ($("#ti").html()) {
        $("img[hash]").removeAttr("src");
        if ("test".codePointAt) {
            tmpd = "";
            for (var i = 0; i < $("#ti").html().length; i++) {
                if ($("#ti").html().codePointAt(i) > 65535) {
                    tmpd += "&#" + $("#ti").html().codePointAt(i) + ";";
                    i++;
                } else {
                    tmpd += String.fromCharCode($("#ti").html().codePointAt(i));
                }
            } //哈哈，可以支持emoji了😆
            tmpd = tmpd.replace(/<div><br><\/div>/g, "");
            //window.tmop = tmpd;
            ping = tmpd;
        } else {
            //window.tmop = $("#ti").html();
            ping = $("#ti").html().replace(/<div><br><\/div>/g, "");
        }
        tijiaopostand = $.ajax({
            url: serverphp + "/w.php",
            dataType: "json",
            type: "post",
            async: "true",
            timeout: 5000,
            data: {
                comment: ping
            },
            success: function (data, textStatus, xhr) {
                if (data.status == "OK") {
                    var text = [{
                        "comment": ping,
                        "time": data.time,
                        "ua": navigator.userAgent
                    }, "duang"];
                    $('#commit').prepend(Loading_xml(text));
                    iosocket.send(JSON.stringify(text));
                    $("#ti").empty();
                    ++commitNum;
                    htmlinit();
                    alert("发送成功");
                } else {
                    alert("额，发送失败   _(:qゝ∠)_  \n ", data);
                    console.log(data);
                }
                htmlinit();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                alert("error");
            },

            cache: "false"
        });
        return tijiaopostand;
    } else {
        alert("总得写些什么吧！");
    }
}

function htmlinit() {
    $("ua span").addClass("label");
    //$(".comm").show();
    $(".comm").fadeIn(1500);
    $("audio,video").attr("preload", "none");
    $("video").attr("poster", servercdnn + "FogWvOr4txwJPq5fNaIQUdh5oQ7E");
    $("[hash]").attr("src", function () {
        $("img[hash]").addClass("img");
        //return "http://hiqfs.file.alimmdn.com" + $(this).attr("hash");
        return servercdnn + $(this).attr("hash");
    });
    /*
    $(".img[hash]").attr("src", function() {//分流备用
        return "http://hiqfs.image.alimmdn.com" + $(this).attr("hash");
    });*/
    $("[hash]").removeAttr("hash");
    $('img').unbind("click"); //移除事件重新创建
    $(".comment img[class!='emojisize']").click(function () {
        if ($(this).css("width") <= "200px") {
            //$(this).css("width", "100%");
            $(this).animate({
                "width": '100%'
            });
        } else {
            //$(this).css("width", "200px");
            $(this).animate({
                "width": '200px'
            });
        }
        $('.qqkj').height(function (index, oldheight) {
            if (oldheight - $(this).width > 100) {
                $(this).width("100%");
                $(this).removeClass("qqkj");
            }
        });
    });
    $('img').unbind("error");
    $("img").bind("error", function () {
        if (!this.status) {
            error = this.src;
            error = error.replace(/[a-zA-z]+:\/\/[^\s]*myqq\//, "AA2F");
            error = "http://hiqfs.image.alimmdn.com/myqq/" + error.match(/[^\A\A\2\F\\\\]+$/)[0];
            this.src = error;
            this.status = "1";
        } else if (this.status == 2) {
            this.onerror = null;
        } else {
            this.src = "http://77flfx.com5.z0.glb.clouddn.com/404.jpg";
            this.status = 2;
        }
    });
    $(".comm img.qqkj:first-child").before("<br>");
    /*
    $("img").onload(function () {
        $(this).prepend("<div class=imgload><div>");
    });
    */
}

function json_comment(id) {
    /*
        if (id == 1) {
            $('#commit').empty()
        } else {}*/
    $('#commit').html(Loading_xml(window.commentjson.responseJSON));
    htmlinit();
    //$('#commit').html(json_commentxml(commentjson.responseJSON,id));
    //console.log(window.id);
    //CommentNum(window.id);
}

function Loading_xml(argument) { //json生成评论返回dom
    if (argument) {
        //if(cache[0]==argument[0]){return "";}
        //cache=argument;
        commithaed = "<div class='comm' style=\"display:none;\"><div>";
        commitzhon = "</div><time>";
        commitfooter = "</div>";
        var commenttmp = "";
        for (i = 0; i < argument.length - 1; i++) {
            if (argument[i].ua) {
                commenttmp += commithaed + argument[i].comment + commitzhon + argument[i].time + " </time><ua>" + ua(argument[i].ua) + os(argument[i].ua) + "</ua>" + commitfooter;
            } else {
                commenttmp += commithaed + argument[i].comment + commitzhon + argument[i].time + " </time>" + commitfooter;
            }
        }
        xml = commenttmp.replace(/\[em\]e[0-9]+\[\/em\]/g, function (em) {
            emid = em.substring(4, em.length - 5);
            return "<img class=\"emojisize\" src=\"http://hiqfs.image.alimmdn.com/qq%E8%A1%A8%E6%83%85/" + emid + ".gif\">";
        });
        xml = emoji(xml);
        if (argument[argument.length - 1] == "duang") { } else {
            $('loadtime').text(argument[argument.length - 1] + "s");
        } //这里要duang一下
        return xml;
    } else {
        return "<wbi></wbi>";
    }
}

function emoji(argument) { //处理emoji表情
    var text = argument.replace(/\&#[1-9]*;/g, function (emojicode) {
        var num = parseInt(emojicode.substring(2, emojicode.length - 1)).toString(16);
        if (num > "20e3" && num < "1f6c5") {
            return argument;
        } else {
            return "<img class=\"emojisize\" src=\"http://7u2f38.com5.z0.glb.clouddn.com/emoji" + num + ".png\"></img>";
        }
    });
    return text;
}

function websocketio() {
    iosocket = io.connect(serverjs);
    iosocket.on('connect', function () {
        $('status').text('已连接');
        window.status = 1;
        $('status').css("background-color", "#0275d8");
        check_comment_num();
    });
    iosocket.on('message', function (message) {
        var text = JSON.parse(message);
        $('#commit').prepend(Loading_xml(text));
        window.msnum = window.msnum + 1;
        console.log("收到消息");
        commitNum++;
        notifyMe(text);
        $("num").text(msnum);
        if ($(document).scrollTop() > $(window).height()) {
            $('num').show();
        } else { }
        htmlinit();
    });
    iosocket.on('disconnect', function () {
        $('status').text('已断开');
        $('status').css("background-color", "#d9534f");
        window.status = 0;
    });
}

function CommentNum(id, error) {
    if (error) {
        Num = id;
        start = 0;
    } else {
        Num = 20;
        start = id * Num;
        start = start + commitNum;
    }
    window.commentjson = $.ajax({
        url: serverphp + "/json.php?start=" + start + "\&num=" + Num,
        cache: false,
        async: true,
        dataType: "json",
        beforeSend: function () {
            $("#commitload").show();
            stava = false;
        },
        timeout: 5000,
        completed: function () {
            stava = true;
            $("#commitload").hide();
        },
        success: function (data, textStatus) {
            console.time("执行时间");
            if (error) {
                $('#commit').prepend(Loading_xml(data));
                htmlinit();
                $("#commitload").hide();
                //window.error = undefined;
                //CommentNum(window.id);
                stava = true;
            } else if (data.length <= 1) {
                stava = false;
                console.log("加载完毕");
                $("#commitload").hide();
                $('#comment_error').remove();
                $('.comment_error').append("<powered>加载完毕</powered>");
            } else {
                $('#commit').append(Loading_xml(data));
                htmlinit();
                window.id++;
                $("#commitload").hide();
                //window.error = undefined;
                //CommentNum(window.id);
                stava = true;
            }
            console.timeEnd("执行时间");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#commitload").hide();
            if (window.location.hash == "#!/cping") {
                alert("评论加载失败");
            }
            if (window.id == "0") {
                $("#comment_error").show();
            }
            console.log(XMLHttpRequest, textStatus, errorThrown);
            stava = true;
            //comment.error(); //迷之代码;
            //return false;
        }
    });
    if (typeof (document.cookie) !== undefined) {
        document.cookie = "id=" + window.id;
        document.cookie = "commitNum=" + commitNum;
    }
}
timetmp = new Date().getTime() + 3000;
websocketio();
var heighttmp;

function sjmo() {
    //蛋疼的封装了一堆函数
    // Jquery Code
    //开始处理点击事件
    $("status").click(function () {
        iosocket.connect();
    });
    $("#b3").click(function () {
        var speed = 200; //滑动的速度
        $('body,html').animate({
            scrollTop: 0
        }, speed);
        return false;
    });
    $(window).scroll(function (data) {
        //$(document).scrollTop() 获取垂直滚动的距离
        //$(document).scrollLeft() 这是获取水平滚动条的距离
        if ($(document).scrollTop() !== 0) {
            heighttmp = $(document).scrollTop();
            if (typeof (document.cookie) !== undefined) {
                document.cookie = "top=" + heighttmp;
            }
            //console.log(heighttmp);
        }
        if (window.id != "0" && $(document).scrollTop() + 80 >= $(document).height() - $(window).height()) {
            /*if (Loading_xml(window.commentjson.responseJSON) == "<wbi></wbi>") {
                $("loading").remove();
                $('wbi').html("<span class=\"glyphicon glyphicon-exclamation-sign\" style=\"color: rgb(255, 140, 60);\">加载完毕</span>");
            } else {*/
            //$("#b3").fadeIn(500);
            if (stava) {
                CommentNum(window.id);
            }
            //1}
        }
        if ($(document).scrollTop() > $(window).height()) {
            $('#b3').show("100");
        } else {
            $('#b3').hide("100");
            $("num").hide();
            window.msnum = 0;
            $("num").text(msnum);
        }
    });
}
/*
$(function() {
    $('#fileupload').fileupload({
        dataType: 'json',
        formData: {
            token: $.ajax({
                type: "GET",
                url: "http://server-php.coding.io/token.php",
                async: false
            }).responseText
        },
        done: function(e, data) {
            $.each(data.result.files, function(index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});
*/
//显UA开始
function ua(e) {
    var r = new Array([]);
    var outputer = '';
    if ((r = e.match(/MSIE\s([^\s|;]+)/gi))) {
        outputer = '<span class="ua_ie"><i class="fa fa-internet-explorer" aria-hidden="true"></i> Internet Explorer' + ' ' + r[0].replace('MSIE', '').split('.')[0];
    } else if ((r = e.match(/FireFox\/([^\s]+)/ig))) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_firefox"><i class="fa fa-firefox" aria-hidden="true"></i> Mozilla FireFox' + ' ' + r1[1];
    } else if (r = e.match(/Maxthon([\d]*)\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_maxthon">Maxthon'
    } else if (r = e.match(/UBrowser([\d]*)\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_ucweb">UCBrowser' + ' ' + r1[1];
    } else if (r = e.match(/MetaSr/ig)) {
        outputer = '<span class="ua_sogou">搜狗浏览器';
    } else if (r = e.match(/2345Explorer/ig)) {
        outputer = '<span class="ua_2345explorer">2345王牌浏览器';
    } else if (r = e.match(/2345chrome/ig)) {
        outputer = '<span class="ua_2345chrome">2345加速浏览器';
    } else if (r = e.match(/LBBROWSER/ig)) {
        outputer = '<span class="ua_lbbrowser">猎豹安全浏览器';
    } else if (r = e.match(/MicroMessenger\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_qq"><i class="fa fa-weixin" aria-hidden="true"></i> 微信' + ' ' + r1[1].split('/')[0];
    } else if (r = e.match(/QQBrowser\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_qq"><i class="fa fa-qq" aria-hidden="true"></i> QQ浏览器' + ' ' + r1[1].split('/')[0];
    } else if (r = e.match(/QQ\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_qq"><i class="fa fa-qq" aria-hidden="true"></i> QQ浏览器' + ' ' + r1[1].split('/')[0];
    } else if (r = e.match(/MiuiBrowser\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_mi">Miui浏览器' + ' ' + r1[1].split('/')[0];
    } else if (r = e.match(/Chrome([\d]*)\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_chrome"><i class="fa fa-chrome" ></i> Chrome' + ' ' + r1[1].split('.')[0];
    } else if (r = e.match(/safari\/([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_apple"><i class="fa fa-safari" aria-hidden="true"></i> Apple Safari' + ' ' + r1[1];
    } else if (r = e.match(/Opera[\s|\/]([^\s]+)/ig)) {
        var r1 = r[0].split("/");
        outputer = '<span class="ua_opera"><i class="fa fa-opera" aria-hidden="true"></i> Opera' + ' ' + r[1];
    } else if (r = e.match(/Trident\/7.0/gi)) {
        outputer = '<span class="ua_ie"><i class="fa fa-internet-explorer" aria-hidden="true"></i> Internet Explorer 11';
    } else {
        outputer = '<span class="ua_other">其它浏览器';
    }
    return outputer + "</span> ";
}

function os(e) {
    var os = '';
    var s = new Array([]);
    if (e.match(/win/ig)) {
        if (e.match(/nt 5.1/ig)) {
            os = '<span class="os_xp"><i class="fa fa-windows" aria-hidden="true"></i> Windows XP';
        } else if (e.match(/nt 6.1/ig)) {
            os = '<span class="os_7"><i class="fa fa-windows" aria-hidden="true"></i> Windows 7';
        } else if (e.match(/nt 6.2/ig)) {
            os = '<span class="os_8"><i class="fa fa-windows" aria-hidden="true"></i> Windows 8';
        } else if (e.match(/nt 6.3/ig)) {
            os = '<span class="os_8_1"><i class="fa fa-windows" aria-hidden="true"></i> Windows 8.1';
        } else if (e.match(/nt 10.0/ig)) {
            os = '<span class="os_8_1"><i class="fa fa-windows" aria-hidden="true"></i> Windows 10';
        } else if (e.match(/nt 6.0/ig)) {
            os = '<span class="os_vista"><i class="fa fa-windows" aria-hidden="true"></i> Windows Vista';
        } else if (e.match(/nt 5/ig)) {
            os = '<span class="os_2000"><i class="fa fa-windows" aria-hidden="true"></i> Windows 2000';
        } else {
            os = '<span class="os_windows"><i class="fa fa-windows" aria-hidden="true"></i> Windows';
        }
        if (e.match(/x[0-9][0-9]/)) {
            os += " " + e.match(/x[0-9][0-9]/)[0];
        }
    } else if ((s = e.match(/android \d+(\.\d+)*/ig))) {
        os = '<span class="os_android"><i class="fa fa-android" aria-hidden="true"></i> ' + s;
    } else if (e.match(/ubuntu/ig)) {
        os = '<span class="os_ubuntu"><i class="fa fa-linux" aria-hidden="true"></i> Ubuntu';
    } else if (e.match(/linux/ig)) {
        os = '<span class="os_linux"><i class="fa fa-linux" aria-hidden="true"></i> Linux';
    } else if (e.match(/Mac OS X \d+(\_\d+)*/ig)) {
        os = '<span class="os_mac"><i class="fa fa-apple" aria-hidden="true"></i> ' + s[0].replace(/_/g, ".");
    } else if (e.match(/unix/ig)) {
        os = '<span class="os_unix">Unix';
    } else if (e.match(/symbian/ig)) {
        os = '<span class="os_nokia">Nokia SymbianOS';
    } else if ((s = e.match(/iPhone OS \d+(\_\d+)*/ig))) {
        os = '<span class="os_mac"><i class="fa fa-apple" aria-hidden="true"></i> ' + s[0].replace(/_/g, ".");
    } else {
        os = '<span class="os_other">其它操作系统';
    }
    return os + "</span>";
} //显UA结束
function notifyMe(Messenger) {
    //构建web Notificatio对象
    if (!window.Notification || !Notification.requestPermission)
        return;
    if (Notification.permission == 'granted')
        //throw new Error("消息提醒错误");
        return;
    try {
        new Notification('');
    } catch (e) {
        if (e.name == 'TypeError')
            return;
    }
    Notification_options = {
        icon: "http://77flfx.com5.z0.glb.clouddn.com/favicon.ico",
        body: Messenger[0].time.substring(11, 20),
    };
    if (!("Notification" in window)) {
        console.log("呃.你的浏览器不支持Web Notification 提醒");
    } else if (Notification.permission === "granted") {
        var notification = new Notification(Messenger[0].comment, Notification_options);
        notification.onclick = function (event) {
            if (document.hidden) {
                //event.preventDefault(); // prevent the browser from focusing the Notification's tab
                //window.open('http://www.hifs.tk/#!/cping', '_blank');
            } else {
                if (window.location.hash == "#!/cping") {
                    $("#b3").click();
                } else {
                    window.location.hash = "!/cping";
                    heighttmp = 0;
                }
            }
            notification.close();
        };
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(Messenger[0].comment, Notification_options);
                notification.onclick = function (event) {
                    if (document.hidden) {
                        event.preventDefault(); // prevent the browser from focusing the Notification's tab
                        window.open('http://www.hifs.tk/#!/cping', '_blank');
                    } else {
                        if (window.location.hash == "#!/cping") {
                            $("#b3").click();
                        } else {
                            window.location.hash = "!/cping";
                            heighttmp = 0;
                        }
                    }
                    notification.close();
                };
            }
        });
    }
}
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/js/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}*/
/*
function errorload() {
    CommentNum(window.id);
    $("#comment_error").hide();
    //CommentNum(window.id);$('#comment_error').hide();
}
*/
function check_comment_num() {
    $.ajax({
        url: serverphp + "num.php",
        async: true,
        success: function (data, textStatus) {
            var error_commmit = data - (comment_num + commitNum);
            if (error_commmit) {
                CommentNum(error_commmit, true);
                commitNum = commitNum + error_commmit;
                console.log("评论数不正常");
                comment_num = data;
            } else {
                console.log("评论数正常");
            }
        }
    });
}
/*
if (typeof (Worker) !== "undefined") {
    var htmlWorker = new Worker('/src/js/Worker.js');
}
else {
    console.log("不支持Worker");
}
*/