document.ready=()=>{
    var time;    
    fetch("/README.md").then((response) => {
        console.log(response.headers.get('Date'));
        time = new Date(response.headers.get('Date'));
        return response;
    });
    var time = setInterval(()=>{
        document.getElementById("time").innerHTML = Date();
    },1000);
};
document.ready();