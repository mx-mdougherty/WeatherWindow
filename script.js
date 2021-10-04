console.log("Page is loading");
//user prompted to enter name of city
let city= prompt("Enter Name of City:", "New York");
console.log(city);
// API sources
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = "&appid=33b40cf9fef3500a477087cae81a8c52";
const Time_URL="https://api.ipgeolocation.io/timezone?apiKey=a5bbce330dad478e8b32a5b596a0258d&location=";
// variables to hold data
let localTime;
let cloudNumber;
let weather;
let h;

//Make sure that the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

// Send a request for weather data based on user input
  let url = API_URL+city+API_KEY;
        fetch(url)
        .then(response => response.json())
        .then(data =>{
          //weather discription  
          console.log(data.weather[0].main);
            // cloud density
            console.log(data.clouds.all);
            cloudNumber= data.clouds.all;
            weather= data.weather[0].main;
  })
  // Send a request for city time 
let url2 = Time_URL+city;
fetch(url2)
.then(response => response.json())
.then(data =>{
  localTime=(data.time_24);
  //convert time into 0-24 value
  h = localTime.split(":", 1);
  console.log(h);
})
  .catch(error => {
    console.log(error);
  });
});

// ----------- p5 -------------
var bg;

function setup(){
let myCanvas = createCanvas (700,720);
myCanvas.parent('data_container');
background (197,231,249);
}

function preload(){
  // Images
  bg = loadImage("assets/window.png");
  overcast = loadImage("assets/overcast.png");
  winter = loadImage("assets/winter.png");
  fall = loadImage("assets/fall.png");
  night = loadImage("assets/night.png");
  clearSky = loadImage("assets/clear.png");
  rain = loadImage ("assets/rain.png");
  cloud2 = loadImage("assets/cloud2.png");
  cloud3 = loadImage("assets/cloud3.png");
  cloud4 = loadImage("assets/cloud4.png");
  lightning = loadImage("assets/thunderstorm.png");
  full = loadImage("assets/full.png");
  snow = loadImage("assets/snow.png");
  raindrops = loadImage("assets/raindrops.png");
  dust = loadImage("assets/Dust.png");
  drizzle = loadImage("assets/drizzle.png");
  atmosphere = loadImage("assets/atmosphere.png");
}

//clouds and precipitation 
function makeClouds(){
  if(cloudNumber>=11 && cloudNumber<25){
    image(cloud2,0,0);
  }
  if(cloudNumber>=25 && cloudNumber<51){
    image(cloud3,0,0);
  }
  if(cloudNumber>=51 && cloudNumber<84){
    image(cloud4,0,0);
  }
  if(cloudNumber>=84 && cloudNumber<100){
    image(full,0,0);
  }
}
function makePrecipitation(){
  if (weather=="Rain"){
    image(raindrops,0,0);
  }
  if (weather=="Drizzle"){
    image(drizzle,0,0);
  }
  if (weather=="Snow"){
    image(snow,0,0);
  }
  if (weather=="Mist" || weather=="Smoke" || weather=="Haze" || weather=="Fog" || weather=="Ash"){
    image(atmosphere,0,0);
  }
  if (weather=="Sand" || weather=="Dust" || weather=="Tornado" || weather=="Dust" || weather=="Fog" || weather=="Sand"){
    image(dust,0,0);
  }
  if (weather=="Squall"){
    image(full,0,0);
  }
}

function draw(){
// LANDSCAPE IMAGE
// set landscape by weather
  if (weather=="Clear"){
    cloudNumber=0;
    background (197,231,249);
    makeClouds();
    image(clearSky,0,0);
  }
  if (weather=="Mist" || weather=="Smoke" || weather=="Haze" || weather=="Fog" || weather=="Ash" || weather=="Sand" || weather=="Dust" || weather=="Tornado" || weather=="Dust" || weather=="Fog" || weather=="Sand" || weather=="Squall"){
    background(214,223,220);
    image(overcast,0,0);
    makePrecipitation()
  }
  if (weather=="Thunderstorm"){
    background (29,31,58);
    makeClouds();
    image(lightning,0,0);
  }
  if (weather=="Rain" || weather=="Drizzle"){
    background(207,237,232);
    makeClouds();
    image(rain,0,0);
    makePrecipitation()
  }
  if (weather=="Snow"){
    background(171,201,221);
    makeClouds();
    image(rain,0,0);
    makePrecipitation();
  }
  if (weather=="Clouds"){
    if(cloudNumber>=11 && cloudNumber<84){
      makeClouds();
      image(overcast,0,0);
    }
    if(cloudNumber>=85 && cloudNumber<=100){
      background(214,223,220);
      makeClouds();
      image(overcast,0,0);
    }
  }
 else{
   console.log("data is not ready");
 }

// fall mode
  let m = month();
  if (m>=9 && m<=11){
    background(214,223,220);
    makeClouds();
    image(fall,0,0);
    makePrecipitation();
}
// winter mode
if (m>=12 && m<=2){
  background(171,201,221);
  makeClouds();
  image(winter,0,0);
  makePrecipitation();
}
// night mode
if (h>=19 || h<=7){
background(19,2,52);
makeClouds();
image(night,0,0);
makePrecipitation()
}

  // place window on top 
  image(bg, 0, -2);
}
