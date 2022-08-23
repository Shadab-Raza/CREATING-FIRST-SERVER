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
                let newToDo = toDoList;
                newToDo.push(body.item);
                console.log(newToDo);
                res.writeHead(201);
            });

        }else if(method === "DELETE"){
            let body = '';
            req.on('error', (err) => {
                console.log(err)
            }).on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                body = JSON.parse(body);
                let deleteThis = body.item;

                    // Method-1
                // for(let i = 0; i < toDoList.length; i++){
                //    if(toDoList[i] === deleteThis){
                //     toDoList.splice(i, 1);
                //     break;
                //    }
                // }
                
                  // Method-2
                toDoList.find((element, index) =>{
                    if(element === deleteThis){
                        toDoList.splice(index, 1);
                    }
                })

                res.writeHead(204);
            })
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