const express= require("express");
const https = require("https");
const app=express();
const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ee427dd64fca991f9b0d6642c2366704&units=metric";
    https.get(url,function(response){
          response.on("data",function(data){
              const weatherdata=JSON.parse(data);
              const temprature=weatherdata.main.temp;
              const discription=weatherdata.weather[0].description;
              const imgdata=weatherdata.weather[0].icon;
              const image = "http://openweathermap.org/img/wn/"+imgdata+"@2x.png";
              res.write("<h1>The Weather of "+city+" is:</h1>");
              res.write("Temprature :"+temprature);
              res.write("Description :"+discription);
              res.write("<img src="+image+" alt='image not found'>");
              res.send();
          });
    });
})
    
    



app.listen(3000, function(){
    console.log("Server is Running");
});
