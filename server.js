const http = require('http');

const port = 3000;

const toDoList = ["Complete Node Bytes", "Play Cricket"];

http.createServer((req, res) =>{
    const {method, url} = req;
    
    if(url === "/todos"){
        if(method === "GET"){
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write(toDoList.toString());
        } else if(method === 'POST'){
            let body = "";
            req.on('error',() => {
                console.error(err)
            }).on('data',(chunk) => {
                body += chunk;
            }).on('end', () => {
                body = JSON.parse(body);
                console.log("data: ", body);
            });
        }
        else{
            res.writeHead(404);
        }
    }
    res.end();
})
.listen(port, () => {
    console.log(`Node.js server started on port ${port}`);
})


// http://localhost:3000