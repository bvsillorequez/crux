let parks = {
  NationalParks: null,
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


let dropdown = document.querySelector('.dropdown')
let select = document.createElement('select')
select.id = "drop-down"
select.addEventListener("change", onChange);
dropdown.appendChild(select)


for(const [park, cords] of Object.entries(parks)){
  let option = document.createElement('option')
  option.value = cords
  option.innerHTML = park
  select.appendChild(option)
}

var mymap = L.map("mapid").setView([37.840548, -119.5165878], 10);

//Map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  maxZoom: 18,
  minZoom: 10,
}).addTo(mymap);

//Add svg with data
L.svg({ clickable: true }).addTo(mymap);



function svgCords(cords = mymap.getCenter()) {
  d3.json(
    // `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${cords.lat}&lon=${cords.lng}&maxDistance=10&maxResults=50&minDiff=5.6&maxDiff=5.15a&key=200243839-81d7f5a3fe0faee7505eebca1bbee9af`,
    "src/yosemite.json",
    function (data) {
      let color = d3
        .scaleOrdinal()
        .domain(["Trad", "Sport", "Boulder"])
        .range(["#29526D", "#AA8C39", "#551600"]); //blue trad, yellow sport, red boulder

      // var Tooltip = d3.select(".datapoint")
      //   .append("div")
      //   .attr("class", "route-info")
      //   .style("opacity", 1)
      //   .style("background-color", "white")
      //   .style("border", "solid")
      //   .style("border-width", "2px")
      //   .style("border-radius", "5px")
      //   .style("padding", "5px")

      // var modal = document.querySelector(".modal");
      // var onClick = function(d) {
      //   modal.classList.toggle("show-modal");


      //   document.querySelector(".route-name").innerHTML = d.name //this works
      //   document.querySelector(".route-type").innerHTML = d.type
      //   document.querySelector(".route-grade").innerHTML = d.rating
      // }


      var onClick = function (d) {
        var circle = L.circle([d.latitude, d.longitude], 40, {
          color: 'none',
          fillColor: 'white',
          fillOpacity: 0
        }).addTo(mymap);

        circle.bindPopup(d.name +
          "  ||  Type: " + d.type + "  ||  Grade: " + d.rating);
      }

      d3.select("#mapid")
        .select("svg")
        .attr("pointer-events", "auto")
        .selectAll("circles")
        .data(data.routes)
        .enter()
        .append("circle")
        .attr("class", "datapoint")
        .attr("cx", function (d) {
          return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;
        })
        .attr("cy", function (d) {
          return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;
        })
        .attr("r", 10)
        .style("fill", function (d) {
          return color(d.type);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill-opacity", 0.2)
        .on("click", onClick)
    }
  );
}

//update map on move
function update() {
  d3.selectAll("circle")
    .attr("cx", function (d) {
      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;
    })
    .attr("cy", function (d) {
      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;
    });
  // mymap.removeLayer("circle")
  d3.selectAll('circle').data([]).exit().remove()
  changeCords()
}

function changeCords() {
  var cords = mymap.getCenter();
  svgCords(cords);
}


mymap.on("moveend", update);
svgCords()