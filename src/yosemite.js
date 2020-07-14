//Location On Map
var mymap = L.map("mapid").setView([37.840548, -119.5165878], 10);


//Map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  maxZoom: 16,
}).addTo(mymap);

//Add svg with data
L.svg().addTo(mymap);


function svgCords(cords = mymap.getCenter()) {
  d3.json(
    `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${cords.lat}&lon=${cords.lng}&maxDistance=10&maxResults=500&minDiff=5.6&maxDiff=5.15a&key=200243839-81d7f5a3fe0faee7505eebca1bbee9af`,
    function (data) {
      let color = d3
        .scaleOrdinal()
        .domain(["Trad", "Sport", "Boulder"])
        .range(["#29526D", "#AA8C39", "#551600"]); //blue trad, yellow sport, red boulder
  
      d3.select("#mapid")
        .select("svg")
        .selectAll("circles")
        .data(data.routes)
        .enter()
        .append("circle")
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
  changeCords()
}

function changeCords() {
  let cords = mymap.getCenter();
  svgCords(cords);
}


svgCords()
mymap.on("moveend", update);