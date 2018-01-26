function UpladFile() {
    var fileObj = document.getElementById("qifile").files[0]; // 获取文件对象
    var FileController = "http://upload.qiniu.com/";                    // 接收上传文件的后台地址
    var form = new FormData();
    //form.append("kay","key()");
    form.append("token", token);                        // 可以增加表单数据
    form.append("file", fileObj);                           // 文件对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function () {
        alert("上传完成!");
        console.log(xhr.responseText);
        var tmp = eval("(" + xhr.responseText + ")");
        $("#ti").append("<img src=\"http://7xljsf.com1.z0.glb.clouddn.com/" + tmp.hash + "\"><br>");
        $("update").append("<p>http://7xljsf.com1.z0.glb.clouddn.com/" + tmp.hash + "</p>");
        $.ajax({
            url: api.serverphp+"url.php?source=2849184197&url_long=" + encodeURI("http://7xljsf.com1.z0.glb.clouddn.com/") + tmp.hash + "?attname=" + encodeURI(fileObj.name),
            type: "get",
            dataType: "json",
            async: false,
            cache: false,
            success:function(data,status){
                var qr = document.getElementById("qrs");
                qr.setAttribute("src", "http://qr.liantu.com/api.php?m=5&text=" + data.urls[0].url_short);
            }
        });
    };
    xhr.send(form);
}
function key(argument) {
    var filename = document.getElementById("qifile").value;
    var filename = filename.split('\\');//注split可以用字符或字符串分割
    var my = filename[filename.length - 1];//这就是要取得的图片名称
    return my;
}
//http://7xljsf.com1.z0.glb.clouddn.com/FtXUzQdhalQokbfsLQJXs6JLaYVu
$(document).ready(function () {
    $.ajax({
        url: api.serverphp + api.php_api.token,
        async: false,
        dataType: "text",
        success: function (data, status) {
            token = data;
            $("token").text("得到认证");
        }
    });
});