//js多线程
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
}
onmessage = function (e) {
    postMessage(Loading_xml(e));
}
