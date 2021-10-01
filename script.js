console.log("Page is loading");
//user prompted to enter name of city
let city= prompt("Enter Name of City:", "New York");
console.log(city);

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = "&appid=33b40cf9fef3500a477087cae81a8c52";

let cloudNumber = -1;
let weather;

//Make sure that the page has loaded
window.addEventListener('load', () => {
  console.log("Page has loaded");

// Send a request for data based on user input
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

  
  .catch(error => {
    console.log(error);
  });
});

// ----------- p5 -------------

function setup(){
let myCanvas = createCanvas (800,600);
myCanvas.parent('data_container');
}

function draw(){
  // check if data is ready
  if (weather="clear"){
    cloudNumber=0;
  }
  if (cloudNumber != -1){
    for(let i=0; i<cloudNumber; i++){
    }
  }
 else{
   console.log("data is not ready");
 }
  
}
