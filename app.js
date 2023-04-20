
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const access_key = "0fb9313caa15103262ca610eb40aed3c";
    const units = "m";
    const url = "http://api.weatherstack.com/current?access_key=" + access_key + "&query=" + query + "&units=" + units;
    console.log(url);
    http.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.current.temperature;
            const icon = weatherData.current.weather_icons[0];
            const weatherDescription = weatherData.current.weather_descriptions[0];
            res.write("<p>The weather currently is " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + weatherData.location.name + " is " + temp + "deg Celsius.</h1>");
            res.write("<img src=" + icon + ">");
            res.send();
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    // http.get(url, function(response) {
    //     console.log(response.statusCode);
    //     response.on("data", data=>{
    //         
    //     });
    // // });
    // res.send("Post request received");
});



app.listen(3000, function() {
    console.log("Server is running at port 3000");
});