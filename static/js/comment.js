serverphp = "http://server-php.coding.io";
//serverphp = "https://php-qqfs.rhcloud.com/";
servercdn = [ //cdn服务器列表
    "http://7xljsf.com1.z0.glb.clouddn.com/",
    "http://7xr863.dl1.z0.glb.clouddn.com/",
    "http://7xr867.com1.z0.glb.clouddn.com/",
    "http://7xr9yh.com1.z0.glb.clouddn.com/"
]; //随机数分流
window.id = 0; //页数初始化为零
commitNum = 0; //评论偏移数
CommentNum(0); //评论初始化
servercdnn = servercdn[Math.floor(Math.random() * servercdn.length)];
$(document).ready(function() {
    function init(argument) { //脚本初始化函数
        json_comment(1); //评论加载
        htmlinit(); //处理图片和哈希资源
        var index = Math.floor(Math.random() * (11 - 1 + 1) + 1); //评论框随机背景
        $("#ti").css("background-image", "url(http://7xljsf.com1.z0.glb.clouddn.com//bk" + index + ".jpg)");
        //footer(); //底部加载脚本初始化
        if (window.status) { //服务器自动状态提醒
            $('status').text('已连接');
            $('status').css("background-color", "#0275d8");
        } else {
            websocketio();
        }
    }
    $(window).scroll(function() {
        //$(document).scrollTop() 获取垂直滚动的距离
        //$(document).scrollLeft() 这是获取水平滚动条的距离
        if ($(document).scrollTop() + 100 >= $(document).height() - $(window).height()) {
            if (Loading_xml(window.commentjson.responseJSON) == "<wbi></wbi>") {
                $("loading").remove();
                $('wbi').html("<span class=\"glyphicon glyphicon-exclamation-sign\" style=\"color: rgb(255, 140, 60);\">加载完毕</span>");
            } else {
                console.time("执行时间");
                $("#b3").fadeIn(500);
                if (!window.error) {
                    $('#commit').append(Loading_xml(window.commentjson.responseJSON));
                    htmlinit();
                }else{
                    CommentNum(window.id);
                }
                console.timeEnd("执行时间");
                CommentNum(window.id);
                console.log(window.id);
            }
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
    init(); //脚本初始化
    //htmlinit();
});

function commit() {
    $(document).ready(function() {
        comment = $.ajax({
            url: serverphp + "/read.php?line=1",
            cache: false,
            async: false,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
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
        tijiaopostand = $.ajax({
            url: serverphp + "/write.php",
            dataType: "json",
            type: "post",
            data: {
                comment: function(argument) {
                    tmpd = "";
                    for (var i = 0; i < $("#ti").html().length; i++) {
                        if ($("#ti").html().codePointAt(i) > 65535) {
                            tmpd += "&#" + $("#ti").html().codePointAt(i) + ";";
                            i++;
                        } else {
                            tmpd += String.fromCharCode($("#ti").html().codePointAt(i));
                        }
                    } //哈哈，可以支持emoji了😆
                    window.tmop = tmpd;
                    return tmpd;
                }
            },
            success: function(data, textStatus, xhr) {
                if (data.status == "OK") {
                    alert("发送成功");
                    var text = [{
                        "comment": window.tmop,
                        "time": data.time
                    }, "duang"];
                    $('#commit').prepend(Loading_xml(text));
                    iosocket.send(JSON.stringify(text));
                    $("#ti").empty();
                    ++commitNum;
                    htmlinit();
                } else {
                    alert("额，发送失败   _(:qゝ∠)_  \n ", data);
                    console.log(data);
                }
                htmlinit();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
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
    $(".comm").fadeIn(1500);
    $("audio,video").attr("preload", "none");
    $("video").attr("poster", servercdnn + "FogWvOr4txwJPq5fNaIQUdh5oQ7E");
    $("[hash]").attr("src", function() {
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
    $(".img,.qqkj").click(function() {
        if ($(this).css("width") <= "200px") {
            $(this).css("width", "100%");
        } else {
            $(this).css("width", "200px");
        }
        $('.qqkj').height(function(index, oldheight) {
            if (oldheight - $(this).width > 100) {
                $(this).width("100%");
                $(this).removeClass("qqkj");
            }
        });
    });
    $('img').unbind("error")
    $("img").bind("error", function() {
        if (!this.status) {
            error = this.src;
            error = error.replace(/[a-zA-z]+:\/\/[^\s]*myqq\//, "AA2F");
            error = "http://hiqfs.image.alimmdn.com/myqq/" + error.match(/[^\A\A\2\F\\\\]+$/)[0];
            this.src = error;
            this.status = "1";
        } else if (this.status == 2) {
            this.onerror = null;
        } else {
            this.src = "http://77flfx.com1.z0.glb.clouddn.com/404.jpg";
            this.status = 2;
        }
    });
    $(".comm img.qqkj:first-child").before("<br>");

}

function json_comment(id) {
    if (id == 1) {
        $('#commit').empty()
    } else {}
    $('#commit').html(Loading_xml(window.commentjson.responseJSON));
    //$('#commit').html(json_commentxml(commentjson.responseJSON,id));
    console.log(window.id);
    CommentNum(window.id);
}

function Loading_xml(argument) { //json生成评论返回dom
    if (argument.length - 1 >= 0) {
        commithaed = "<div class='comm' style=\"display:none;\"><p>";
        commitzhon = "</p><time>";
        commitfooter = "</time><br></div>";
        var commenttmp = "";
        tiao = 0;
        for (i = tiao; i < tiao + argument.length - 1; i++) {
            commenttmp += commithaed + argument[i].comment;
            commenttmp += commitzhon
            commenttmp += argument[i].time + commitfooter;
        }
        xml = commenttmp.replace(/\n/g, "<br>").replace(/\[em\]e[0-9]+\[\/em\]/g, function(em) {
            emid = em.substring(4, em.length - 5);
            return "<img class=\"emojisize\" src=\"http://hiqfs.image.alimmdn.com/qq%E8%A1%A8%E6%83%85/" + emid + ".gif\">";
        });
        xml = emoji(xml);
        if (argument[argument.length - 1] == "duang") {} else {
            $('loadtime').text(argument[argument.length - 1] + "s");
        } //这里要duang一下
        return xml;
    } else {
        return "<wbi></wbi>";
    }
}

function emoji(argument) { //处理emoji表情
    text = argument.replace(/\&#[1-9]*;/g, function(emojicode) {
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
    iosocket = io.connect("http://jaber-nodejs.daoapp.io/");
    iosocket.on('connect', function() {
        $('status').text('已连接');
        window.status = 1;
        $('status').css("background-color", "#0275d8");
    });
    iosocket.on('message', function(message) {
        var text = JSON.parse(message);
        $('#commit').prepend(Loading_xml(text));
        window.msnum = window.msnum + 1;
        $("num").text(msnum);
        if ($(document).scrollTop() > $(window).height()) {
            $('num').show();
        }
        htmlinit();
    });
    iosocket.on('disconnect', function() {
        $('status').text('已断开');
        $('status').css("background-color", "#d9534f");
        window.status = 0;
    });
}

function CommentNum(id) {
    Num = 20;
    start = id * Num;
    start = start + commitNum;
    window.commentjson = $.ajax({
        url: serverphp + "/jsonread.php?start=" + start + "\&num=" + Num,
        cache: false,
        async: false,
        dataType: "json",
        success: function() {
            window.id++;
            window.error = undefined;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("加载失败.");
            window.error = 1;
        },
    });
}
//蛋疼的封装了一堆函数
// Jquery Code
//开始处理点击事件
timetmp = (new Date).getTime() + 3000;
$("#jiao").click(function() {
    $(this).attr("disabled", true);
    $(this).css("background-color", "#6F6F6F");
    $(this).text("发送中...");
    if (timetmp >= (new Date).getTime()) {
        alert("发太快了哦");
    } else {
        tijiaopost();
        timetmp = (new Date).getTime() + 3000;
    }
    $(this).css("background-color", "#00a3cf");
    $(this).text("发送");
    $(this).attr("disabled", false);
});
$("status").click(function() {
    if (window.status) { //服务器自动状态提醒
        $('status').text('已连接');
        $('status').css("background-color", "#0275d8");
    } else {
        websocketio();
    }
});
$("#b3").click(function() {
    var speed = 200; //滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;
});
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