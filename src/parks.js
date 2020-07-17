let parks = {
  Location: null,
  Yosemite: [37.840548, -119.5165878, 10],
  RedRock: [36.144252016957466, -115.4502512631274, 14],
  Zion: [37.26246914115453, -112.9923491146186, 12],
  Tonsai: [8.01, 98.833, 16]
};

var c
let onChange = function() {
  let e = document.getElementById("drop-down")
  let cord = e.options[e.selectedIndex].value

  if (!cord) return;

  let array = cord.split(",")
  c = ({lat: Number(array[0]), lng: Number(array[1]), zoom: Number(array[2])})
  mymap.setView([c.lat, c.lng], c.zoom);
  
} 

let npdropdown = document.querySelector('.dropdown')
let npselect = document.createElement('select')
npselect.id = "drop-down"
npselect.addEventListener("change", onChange);
npdropdown.appendChild(npselect)


for(const [park, cords] of Object.entries(parks)){
  let option = document.createElement('option')
  option.value = cords
  option.innerHTML = park
  npselect.appendChild(option)
}