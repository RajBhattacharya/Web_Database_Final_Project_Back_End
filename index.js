const { MongoClient, ServerApiVersion } = require('mongodb');


const http = require("http");
const path = require("path");
const fs = require("fs");
const uri = "mongodb+srv://newuser:twdcJEsvbzD93AQf@cluster0.ipsl1zq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function getData(res){

    try {await client.connect();
        const data = await client.db("Continents").collection("Continents_And_Countries").find({});
        const chart = await data.toArray();
        const result = JSON.stringify(chart);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
  } catch (error) {
      await console.log(error);
  }        
  finally{client.close();}
}


const server = http.createServer((req, res) => {
    
    /*

        

        we can Navigate to different pages via different requests. 
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam. 



    */
   
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url === '/api') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    
    //else if (req.url==='/')
    //{
        //console.log("Hello World!!!");
        //getData(res);
    //}

 
    else if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }



    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

// it will first try to look for
// environment variable, if not found then go for 8080
const PORT= process.env.PORT || 3983;

// port, callback
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));


