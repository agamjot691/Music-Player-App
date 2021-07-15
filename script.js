
let audioPlayer = document.querySelector("audio");

let isPlaying = false;
isAppstarted = false;
let song;
let totalSongs = 6;
let num = 0;
let Liked_container = document.querySelector(".Liked-container");
let  next = document.querySelector(".next-btn");
// let name;
loadData();

function loadData(){
  let store = localStorage.getItem("store");
  store = JSON.parse(store);
  
   if(store != null){
      for( let i = 0 ; i< store.length ; i++){
        let set = "" + store[i];
     let classListx =  document.getElementById(set).classList;
     classListx.add("added");
     let div = document.createElement("div");
    div.setAttribute("id", `${set}`);
    div.setAttribute("class", "lisong effects ");
    div.innerHTML =document.getElementById(set).innerHTML ;
    Liked_container.appendChild(div);
  
    
      }
   }

}


let base_song_div;
list2 = ["Dil-Ibadat.jpg", "abeer-arora.jpg", "drake-hotline-bling-.jpg", "Bpraak.jpg", "aur.jpg", "Alan_Walker_-_Alone.png"]
artists = ["KK" , "Abeer Arora" , "Drake" , "B Praak" , "Aurora" , "Alan Walker"];

let songlist = document.querySelectorAll(".song");
let L_songlist = document.querySelectorAll(".lisong");

for (let i = 0; i < songlist.length; i++) {
  songlist[i].addEventListener("click", function () {
    
    let idx = songlist[i].id;
    isPlaying = true;
    // name = songlist[i].innerHTML;
    base_song_div = songlist[i];
     document.querySelector(".Name").innerHTML = base_song_div.innerHTML;
     document.querySelector(".Artist-name").innerHTML = artists[i];
    heart_update();
    updateSource(idx);
    background_change(idx -1);
    isAppstarted = true;
     document.querySelector(".play-btn").innerHTML = "pause"; 
    // var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // document.querySelector("body").style.backgroundColor = '#' + randomColor;
  });
 
 
}


for (let i = 0; i < L_songlist.length; i++) {
  L_songlist[i].addEventListener("click", function () {
    
    let idx = L_songlist[i].id;
    // isPlaying = isPlaying == true ? false : true;
    // name = songlist[i].innerHTML;
    base_song_div = L_songlist[i];
     document.querySelector(".Name").innerHTML = base_song_div.innerHTML;
     document.querySelector(".Artist-name").innerHTML = artists[i];
    heart_update();
    updateSource(idx);
    background_change(idx-1);
    isAppstarted = true;
     document.querySelector(".play-btn").innerHTML = "pause"; 
    // var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // document.querySelector("body").style.backgroundColor = '#' + randomColor;
  });
}







document.querySelector(".play-btn").addEventListener("click", function playAudio() {

  if (isAppstarted == true) {

    if (isPlaying == false) {
      audioPlayer.play();
      isPlaying = true;

      document.querySelector(".play-btn").innerHTML = "pause";
    }
    else {
      audioPlayer.pause();
      isPlaying = false;
      document.querySelector(".play-btn").innerHTML = "play_arrow";
    }

  }
})



function photoupdate(id) {
  let imagecontainer = document.querySelector(".img-container");
  imagecontainer.removeChild(imagecontainer.lastElementChild);
  let img = document.createElement("img");
  img.setAttribute("src", `${list2[id - 1]}`)
  img.setAttribute("id", "img")
  imagecontainer.appendChild(img);
}
function updateSource(id) {
  song = "#s" + id;
  num = id;
  audioPlayer.src = document.querySelector(song).getAttribute("src");
  base_song_div = document.getElementById(id);
  document.querySelector(".Artist-name").innerHTML = artists[id-1];
  document.querySelector(".Name").innerHTML = base_song_div.innerHTML;
  heart_update()
  // console.log(base_song_div);
  background_change(id-1);
  photoupdate(id);
}
document.querySelector(".prev-btn").addEventListener("click", function prevsong() {
  if (num > 1 && isAppstarted) {
    let j = parseInt(num);

    j -= 1;

    isPlaying = true;
    updateSource(j);
    document.querySelector(".play-btn").innerHTML = "pause";

  }
})
document.querySelector(".next-btn").addEventListener("click", function nextsong() {
  if (num < totalSongs && isAppstarted) {
    let n = parseInt(num);

    n += 1;
    updateSource(n);
    document.querySelector(".play-btn").innerHTML = "pause";

  }
}
)
let loopsetter = false;
document.querySelector(".loop-btn").addEventListener("click", function nextsong() {
  if (isAppstarted && !loopsetter) {

    document.querySelector("audio").setAttribute("loop", "true");
    document.querySelector(".loop-btn").classList.add("selected");
    loopsetter = true;
  }
  else {
    document.querySelector("audio").removeAttribute("loop");
    document.querySelector(".loop-btn").classList.remove("selected");;
    loopsetter = false;
  }

})


let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (e) {
  audioPlayer.volume = e.currentTarget.value / 100;
})

progressBar = document.getElementById('progress-bar');

canvas = document.getElementById('progress-bar');

canvas.addEventListener("click", function (e) {

  var canvas = document.getElementById('progress-bar');

  if (!e) {
    e = window.event;
  } //get the latest windows event if it isn't set
  try {
    //calculate the current time based on position of mouse cursor in canvas box
    audioPlayer.currentTime = audioPlayer.duration * (e.offsetX / canvas.clientWidth);
  }
  catch (err) {
    // Fail silently but show in F12 developer tools console
    if (window.console && console.error("Error:" + err));
  }
}, true);




  audioPlayer.addEventListener('timeupdate', updateProgressBar, false);
function updateProgressBar() {

  //get current time in seconds
  var elapsedTime = Math.round(audioPlayer.currentTime);
  //update the progress bar
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    //clear canvas before painting
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "black";
    var fWidth = (elapsedTime / audioPlayer.duration) * (canvas.clientWidth);
    
    if (fWidth > 0) {
      ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
    }
  }
}











let liked = false;


// localStorage.clear();
let store = localStorage.getItem("store");





store1 =[];
if(store!= null){
  store1 = JSON.parse(store);
}
document.querySelector(".liked-btn").addEventListener("click", function () {

  let song_id;

  song_id = document.querySelector(song).getAttribute("id").split("s")[1];

  let big_list = base_song_div.classList;
  if (!big_list.contains("added")) {
    document.querySelector(".liked-btn").innerHTML = "favorite";
    let div = document.createElement("div");
    div.setAttribute("id", `${song_id}`);
    div.setAttribute("class", "lisong effects ");
    base_song_div.classList.add("added");
    div.innerHTML = base_song_div.innerHTML;
  
    store1.push(song_id);
    localStorage.setItem("store", JSON.stringify(store1));
    Liked_container.appendChild(div);
  
    

  }
  else {
    let list = document.querySelectorAll(".lisong");
    let id_storage;
    for (let i = 0; i < list.length; i++) {

      let getter_ = list[i].getAttribute("id");

      if (getter_ == `${song_id}`) {
        id_storage = getter_;
        Liked_container.removeChild(list[i]);
      }

    }

   
    let sender = id_storage+"";
    store1 = store1.filter(word => word!== sender);

    localStorage.setItem("store", JSON.stringify(store1));
    
   

       
    document.querySelector(".liked-btn").innerHTML = "favorite_border";
    base_song_div.classList.remove("added");
  }

   
})

// localStorage.clear();


function heart_update() {
  let list_of_classes = base_song_div.classList;
  if (list_of_classes.contains("added")) {
    document.querySelector(".liked-btn").innerHTML = "favorite";
  }
  else {
    document.querySelector(".liked-btn").innerHTML = "favorite_border";
  }
}

function background_change(i){
  document.body.style.backgroundImage =background_url[i];
console.log(i);
}


let background_url = ["url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRMYHigsGBoxGxUVJjYtMSsrOi4uFx8/OzkyOTQ5OjcBCgoKDg0OFQ0NDysZFRkrKy0tLS0rKysrLSstNy0rKy0rKysrKysrLSsrKysrKysrKysrKy0rKysrKysrKysrK//AABEIAL4BCQMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAABAgMABAcFBv/EADUQAAICAQIDBgUDAgcBAAAAAAABAgMREiEEBVETFDFTkdEiQWGSkyNxgQZSJDRCYnSxsxX/xAAaAQADAQEBAQAAAAAAAAAAAAAAAgMBBAUG/8QAHBEBAQEBAQEAAwAAAAAAAAAAAAECEVESAyEx/9oADAMBAAIRAxEAPwD8AgmCdD72MEwQPGGQEEDwUFAQyNPBQwoTTwwUAKN6aCggCjTChkKhkPDQyGQqGRbJ4dDIVDIvk0Mh4sRDxKwysGXgyEC8DaTSsR0LFFIoW1K1khkgpDqIvUrQURlEZIZIW1O0mA6SqibSYS1PSbBXSDSYXrztBMFHmljIJgoDwUEAQPBCgIZAeCggCgPBCAJvTwQgChpWihkBDIeHkMhkBDIvk8hkMhUMi+TSGQ8REVgisapBF4RErReETLUdU0UVihYxKxQtqOqyRRIyQ6QvUrQSHSCojpCp2hgKiOkbAJWkwbBTSDBhevNAgCjzlIIQBMPBCBBA8FDAQUB4KCBDIOnjBAEOnFDIVDIaGhkOhUh0WyeQUMgIdIvmHkZDIyGRbJuDFFq4iQR01QKF1eKVxLxiLBFoIVzaoxRSKBFFIoWo2jFDpGSHijErWSHSMkOkKnaGDYGwYxO0MGwEwF68vCgBR5y8FBAEFIKCgIKMPDBFQwHgoKAgoDQQgQUB4ZDIVDofJ4ZDoVDIvlSGQ6FQyL5PDIaKAitcS8b/ABWqB1QiTridEImWubejQiWihYxLRiY59aGMR0jJFEhUbWSHSMkMkYnayQ2DJBMJaGA4Dg2AJaGDBMBXlgRQnnOmGQRRkYeCECCYeCggCB4ZBFCB4ZBQEFGw8Oh0Ih4lMqQ6GQqHRfKkMhkBDI6Mw5kjppiRrjk7aolLSb1yKQR0QiJCJeCF6496NCJWKBFFIoxDVFIdICGiYlaKQyAkMkYS0UExjCsYJgLQMEAFeVBQoUea6YYKFQQUhggCBoIRQmHhgoVDIDwyHQiGQ0Uh0OhEOiuVIdFEIh0dGVIZFIIRFq0dGTr0xOutEakdMEZa5vyVSCLwRKJaIOXVUiUQiHRiNNgaMcAQyMJRQwAowlEIAgVjGMBawAmArydBFCjzXRKYYRDGHlMFChQKSmMAJhpTIKFQyNh5ToZCIdDxSU6HiIh4lcqyqIdE4jo6MqxRHRSjmidVJZur+nXWdEDnrOiIrl0tErFkYlYmoaVQ8SSZRMxKqIZCJjoE6ZDCoZGEohFCBRAYwFrGA2ACvJ0MmImFM8xWU+QoVMKYKSnCJkJh5TphQgyA8phkIhkbDynQ6JodDxSVRDomh0WyrKqh0TQ6OjKsqkTqpOWB11FGarqrLxOeBeLMQ0vFlIkYspFglVYjommPFglVEOmTQ6ZidUTGyTTGyCdNk2RchyBaOTZBkDYFFsGRWwZBnHlKYUxEwpnliVRMZE0xkwUlOmERMZMFJTIYRBTA8p0xkImMmaeU6Y6JodDxWVRDomh0WypKqh0SiUTOjKsq1Z1VHJWddbHrNV0wLQZCDKwZiNroiUiRiyiYJVWLHTJJjpgS1VMZMmmMmCdUTGyTTDkE6pk2RMgyBafUByFyK2BTti6hXIXUAeWphTETCmeUjKomMmTTGTNVlOhkxEHIHlOmMmTGTBSU6GRNMZM2HlUTHRNDplIrmqodMkh0VyrKqh4skmOi+VZV4M662cVbOqtj1mq64MrBnPBlosxGuiLHTIxZRME6smOmSTGTAlVTGTJJjJmkquQ6iWTajCK5BkTUDUDFNQrkI5CuRrDuQNRNyBqAPMkxkySkuoykup5MrjmlEMmTUl1QykupvVJVEHIikuoVJdTVJVEwoTK6hTNPKohkTTGTXU2KSqpjImn9Rk/qPFc1ZMdElIdMrlXNViOmSTHUi2arKvBnTWzijJHRXYuq9R22uyDLRZyQtj/cvVFo2LqvVGJV1RkOmc0bF1XqVjYuq9QJXQmOmc6sXVeoymuq9QTq6YyZBWLqvUPaLqvUC1fUbUR7RdUbtF1RpVtQNRHtF1QHYuq9TCrahXIi7F1XqK7F1XqaOLOQuoi7F1XqDtV1XqAez8g4Kh8DwbdNTb4Th22645b7OP0Podxo8mn8cPY5/wCnv8jwX/E4b/yifQPJfDdc/caPJp/HD2N3Gjyafxw9joMDe1z9xo8mr8cfY3caPJq/HD2OgwDtc/caPJq/HD2N3Gjyavxw9joMA7fXP3Gjyavxx9jdxo8mr8cPY6DAO318nmd/B8NGxzqpcq6ZXutVx1dms7+G3g/Rk7+P5bXVO1qhxrjJyUaoueUptx048f057f7WdXMOVVcRJSsc9oTrxGSimpJp5eMvxe2cfTZHLd/TXDTlOTduLXbKyKniMpT7XL8Ol1i/ldAHb61XHcuk5LTVBxsVX6lGjMnGMtsrwxJAt5hy6MLLEqpquDskq6db0J4ytuqa/h9Ck+Q0SsVkpWTmpqeqfZy+LRCMtnHbKrhn9tsDWcjolGMXK1RjTKhJSS+GWd28Zb3/AG+gDt9B8Vy/LX+HzFpOPZrVl7YSxu/+vmDg+I4K2qy3s6Ixqdna5jDFajKSbk8bbRz+zRv/AIFOtWKdyshKcqpqcc1Sm27HHb/U285z47YGp5Dw8K7qoa413uc7YKSxOyTk3Pw2llrdf2oB9X0suM5cvHu6eM4daT+W2GvHdbeO5Th7eBtjKcO7OEGlKWmCUW/DLaElyGmU1Oc7pyVkbvimsO+KS7VpJb6YpdMfI6eF5bTVr0pvXGuMlN6k1Fya2/eTDo+r65uLv4emyNcuElLUnplCiEoymoSn2a+erEX8seG5y8NzjgrMaeGlpeYuSornGNmJNV/C3qbUHjGU8x33R9DieWRstdzuvjJ1urTCUFGMfHMXpzF5w9ms6VnKRCnkNFctcJ3KTlK2T1R+O96v1pLGHL45fTw22WDo+r65XzrgUq26Eu04SHGYcKFONUlLCdblqcvhawk8MpVzThJXKh8Oq7cTdkbVw0HSo5zqTn8W0W/h1bYKz/p+mVVVNk7raqYKMK5SiksRcYyzGKepKTx/HzGnyGiaUbXZfDXKyyu1xlC61prXNY3eHjGy2W2wdH1fUqOY8LZ2Ljws1C6ydUZy4eEYxnGycEmnvu65eCeFhvB9XulPlV/ZE4KOSVVWV2VSsh2crpqtODrcrJuU3iUXh74ymnjY+qHR2+o90q8qv7I+xu6VeVX9kfYsY3o+r6j3Sryq/sibulXlV/ZH2LGM6O31HulXlV/ZE3dKvKr+yJYwdHb6j3Sryq/sibulPlV/ZH2LGDo7fUO6U+VX9kfY3c6fKr+yPsXMHR2+v//Z')" ,
"url('data:image/jpeg;base64,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')" , 
"url('data:image/jpeg;base64,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')",
 "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISDxUPDxIVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFSsZFRkrKysrKysrKy0tLSs3LS0tKys3NysrLSstNy0tLS03Ny0tLSs3LSsrKystKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAGBABAQEBAQAAAAAAAAAAAAAAAAERAhL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIGA//EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+iqTpOEdAqKiIuAKmxZYDPDkaYcgFzFyHIqQGfXLLqOmxl1yoy5bcVHlfMBvxWnLHhryDWLkRyrVZ08F5Gnqoi8pvLVNBlYlpYjEaSKorEGdRWlibBUUrF4mwEWBV5EgEFYBHKIcPBThworUAZGCoqJhwFRUSJVF1Fh6NBPlU5VFyAictOTkVIAlUWDFQ9HpNIRp6LUnoQ00yoJI6mopVNUQqaSiESDpKAAwcsNnOlSo0oJ0aIpUqIqILikSqlUUAQA5SEBpy05Y8teQa8rZ81UqosYUp6InBiyBGDF2JopFTpIJqbFpoJpKIEkohUkeAQABR52n6QEaX6VGcXyDSKlTypA9PUgRrKpny0lUPBhgBI05iYvkFQ5QBFacqIai5RqNGiRelaWptFO0tK1OoKCdGimRkBYVitIRFhLqcUIywweWEyrRsSKhRUEXzV6zioIoQgC4uI5VKgvTlZ6eqNYuVjzWkoNZT1kqUGhs5WnIg8lY1kFipWJVfURRUWptOpqKenKiGCtGpAK0tSNBWhOnFQwZA8iKiT5RtpIcKLggioJDkAAYWiLi2fLSVAAwoIvlEqoDSUJlPQVK046YLlB1c9Kc/PTSdqzFdMu16joVlU1fTOoo0I0ekF6NRo9KKtTaV6TaC5VysNVOgbaEaFR5mLkPyrnlGhIuQ5yuQEw1YMELEtMTYCYqVNg0Gk6WxlXzQVYFQYAlOIp6CzidPQVKqdMtL0Df0L0x9J9g16rPql6TaBWp9CpqKv0Wo0aqKtLS0qCtVKx050DfSZegA8qkM0DkPClVFDKxQBJVVTQTU4vBICMVydhYg15qmfK5VBYlRAC0FUD0rU6AFqfR2M7BVejnTI5VF2po0wTTgsSIpNAqibU3o+oz6BXoM9Cwdpg2QRUEVAOAwCU1pibAQBSlBRwpVIAyCgGggPSBAVBkgC8qhxRleU2N/KbBaykXIcipARhXltgvIjnvKbG95TeVGGI6je8s+oowwL8gHYZHGQ4qJioCoeJioB4mxcFVGPUQ26jOxFKKhQAoJo0FClKegmkqpAHSAEqEAWKmGAOEJQWaNGqHYiqvRURl0z6a9MulGYFCq6YuJ5XHmHhyCKigkURgAC1UKo6aVHQMxKKSKZAAWqlTYQNNCJVaAPCEoKwYcME2EtNgFaWmmqH6Gs6JQXaV6LUWqh3pHVFqL0qkE2kDs5rTmsuWvMYFw4UMFSgjEBHgwUqjqrrPqqIqT6JBUMoaBFTCiYcp4MAtOFgBUq5WRyg1BSgCxPUWLFRjYlp1EWClUdVVZ9KJtT1RUWqFaaPQB6HLXkB5i4ZhQzAUMAJqJ6Y9gC4joAAcFMAQgAHAAAKgAmlDAK5UAChAFxE1NADWVZ9AKrGpoCjMACv/2Q==')",
 "url('https://wallpaperaccess.com/full/449895.jpg')", 
 "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEUA/4AA/7MA/40A/5kA/6YA/5gA/6W2WEC7AAABAUlEQVR4nO3QMQEAIAwDsA0G/iXjoQ9PIiFVmZXZkTOR25mwxIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixImTrycPZ1yMFoVVP1kAAAAASUVORK5CYII=')"]





