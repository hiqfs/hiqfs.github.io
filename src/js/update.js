function UpladFile() {
    var fileObj = document.getElementById("qifile").files[0]; // 获取文件对象
    var FileController = "http://upload.qiniu.com/";                    // 接收上传文件的后台地址
    var form = new FormData();
    //form.append("kay","key()");
    form.append("token", token=$.ajax({url:"http://php-servers.hifs.tk/token.php",async:false}).responseText);                        // 可以增加表单数据
    form.append("file", fileObj);                           // 文件对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function () {
        alert("上传完成!");
        console.log(xhr.responseText);
        var tmp=eval("(" + xhr.responseText + ")");
        $("#ti").append("<img src=\"http://7xljsf.com1.z0.glb.clouddn.com/"+tmp.hash+"\"><br>");
        $("update").append("<p>http://7xljsf.com1.z0.glb.clouddn.com/"+tmp.hash+"</p>");
    };
    xhr.send(form);
}
function key(argument) {
  var filename=document.getElementById("qifile").value;
  var filename=filename.split('\\');//注split可以用字符或字符串分割
  var my=filename[filename.length-1];//这就是要取得的图片名称
  return my;
}
//http://7xljsf.com1.z0.glb.clouddn.com/FtXUzQdhalQokbfsLQJXs6JLaYVu
