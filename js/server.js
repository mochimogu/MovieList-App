const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 4212;

app.use(express.static("static"));
app.use(express.json());

app.set("views", "templates");
app.set("view engine", "pug");

app.get("/search" , (request, response) => {
    response.render("search.pug");
})

app.get("/movieCollection" , (request, response) => {
    response.sendFile(path.join(__dirname + '/static/html/allMovies.html'));
})

app.get("/getLinkPage", (request, response) => {
    response.sendFile(path.join(__dirname + '/static/html/displayMovieInfo.html'));
    // console.log(request.body);
})

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + '/static/html/index.html'));
})

app.get("/home", (request, response) => {
    response.sendFile(path.join(__dirname + '/static/html/index.html'));
})

app.get("/myList", (request, response) => {
    response.sendFile(path.join(__dirname + '/static/html/myList.html'));
});

app.get("/myListData", (request, response) => {
    const readJsonData = fs.readFileSync("./static/json/storage.json")
    const parseData = JSON.parse(readJsonData);
    response.status(200).send(parseData);
    
})

app.post("/post", (request, response) => {
    // console.log(request.body);

    const jsonFile = fs.readFileSync('./static/json/storage.json');

    const parseJson = JSON.parse(jsonFile);
    parseJson.movies.push(request.body);

    const newParseJson = JSON.stringify(parseJson);

    fs.writeFileSync("./static/json/storage.json", newParseJson, err => {
        if(err) throw err;
    })

    response.send(200)
})


app.delete("/deleteItem", (request, response) => {


    const jsonFile = fs.readFileSync("./static/json/storage.json");

    const parseJson = JSON.parse(jsonFile);

    // console.log(parseJson);
    // console.log(request.body);

    for(let i in parseJson.movies) {
        // console.log(parseJson.birthdays[i]);
        if(request.body.delete == parseJson.movies[i].movie_id) {
            console.log("matches")
            parseJson.movies.splice(i,1);
            // console.log(parseJson.movies);
        }
    }

    const newParseJson = JSON.stringify(parseJson, null, 2);

    fs.writeFileSync("./static/json/storage.json", newParseJson, err => {
        if(err) throw err;
        console.log("SUCCESSFULLY DELETED DATA");
    })

    response.status(200).send("DELETED DATA");
})



app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
