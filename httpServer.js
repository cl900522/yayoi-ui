var http = require('http');
var fs = require("fs");
var pwd = process.cwd();

http.createServer(function(request, response) {
    var url = request.url;
    if (url.endsWith("/")) {
        url += "index.html";
    }
    var index = url.lastIndexOf("?");
    if (index != -1) {
        url = url.substring(0, index);
    }

    console.log(url);
    response.writeHead(200, {
        'Content-Type': parseContentType(url)
    });

    var filePath = pwd + url;
    fs.exists((filePath), (exist) => {
        if(exist) {
            fs.stat(filePath,(err, states)=>{
                if(states.isDirectory()) {
                    filePath += "/index.html";
                }
                fs.readFile(filePath, function(err, fileContent) {
                    if (err) {
                        response.write("" + err);
                    } else {
                        response.write(fileContent);
                    }

                    response.end();
                });
            });
        } else {
            response.write("No such file.");
            response.end();
        }
    });

}).listen(80);


var parseContentType = function(url) {
    if (url.endsWith(".html")) {
        return "text/html;charset=UTF-8";
    }
    if (url.endsWith(".xml")) {
        return "text/xml;charset=UTF-8";
    }
    if (url.endsWith(".js")) {
        return "text/javascript;charset=UTF-8";
    }
    if (url.endsWith(".json")) {
        return "application/json;charset=UTF-8";
    }
    if (url.endsWith(".css")) {
        return "text/css;charset=UTF-8";
    }
    /*pictures*/
    if (url.endsWith(".jpg")) {
        return "image/jpeg";
    }
    if (url.endsWith(".png")) {
        return "image/png";
    }
    if (url.endsWith(".gif")) {
        return "image/gif";
    }
    if (url.endsWith(".ico")) {
        return "image/x-icon";
    }
    /*fonts*/
    if (url.endsWith(".svg")) {
        return "image/svg+xml";
    }
    if (url.endsWith(".ttf")) {
        return "application/octet-stream";
    }
    if (url.endsWith(".eot")) {
        return "application/octet-stream";
    }
    if (url.endsWith(".woff")) {
        return "application/octet-stream";
    }
    if (url.endsWith(".woff2")) {
        return "application/octet-stream";
    }
    if (url.endsWith(".otf")) {
        return "application/octet-stream";
    }
}
console.log("HTTP server is listening at port 80.");
