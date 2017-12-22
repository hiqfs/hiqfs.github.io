var fs = require('fs');
var minify = require('html-minifier').minify;
fs.readFile(process.cwd() + '/src/html' +'/index.dev.html', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    fs.writeFile(process.cwd() + '/index.html', minify(data,{removeComments: true,collapseWhitespace: true,minifyJS:true, minifyCSS:true}),function(){
        console.log('success');
    });
});
