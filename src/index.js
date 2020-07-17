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
  var elements = document.getElementsByTagName('select');
  for (var i = 0; i < elements.length; i++) {
    elements[i].selectedIndex = 0;
  }
  d3.json(
    // `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${cords.lat}&lon=${cords.lng}&maxDistance=10&maxResults=50&minDiff=5.6&maxDiff=5.15a&key=200243839-81d7f5a3fe0faee7505eebca1bbee9af`,
    "src/yosemite.json",
    function (data) {
      let color = d3
        .scaleOrdinal()
        .domain(["Trad", "Sport", "Boulder"])
        .range(["#29526D", "#AA8C39", "#551600"]); //blue trad, yellow sport, red boulder


      let onClick = function (d) {
        let circle = L.circle([d.latitude, d.longitude], 100, {
          color: 'none',
          fillColor: 'white',
          fillOpacity: 0
        }).addTo(mymap);

        circle.bindPopup(d.name +
          "  ||  Type: " + d.type + "  ||  Grade: " + d.rating);
      }

      let onTypeChange = function () {
        let e = document.getElementById("type");
        let dicipline = e.options[e.selectedIndex].value;
        render(dicipline)
      };

      let onGradeChange = function () {
        let e = document.getElementById("grade");
        let grade = e.options[e.selectedIndex].value;
        console.log(`${grade}`)
        renderGrade(grade)
      };

      document.querySelector("#type").addEventListener("change", onTypeChange);
      document.querySelector("#grade").addEventListener("change", onGradeChange);

      function render(dicipline) {
        d3.selectAll("circle").data([]).exit().remove();
        const update = d3.select("#mapid")
          .select("svg")
          .attr("pointer-events", "auto")
          .selectAll("circles")
          .data(data.routes.filter(d => d.type === dicipline))

        update.exit().remove()

        update
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
          .on("click", onClick);
      }

      
      function renderGrade(grade) {
        d3.selectAll("circle").data([]).exit().remove();
        const update = d3.select("#mapid")
          .select("svg")
          .attr("pointer-events", "auto")
          .selectAll("circles")
          .data(data.routes.filter(d => d.rating === grade))
        // debugger
        update.exit().remove()

        update
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
          .on("click", onClick);
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

function update() {
  d3.selectAll("circle")
    .attr("cx", function (d) {
      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;
    })
    .attr("cy", function (d) {
      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;
    });
  d3.selectAll('circle').data([]).exit().remove()
  changeCords()
}

function changeCords() {
  var cords = mymap.getCenter();
  // debugger
  svgCords(cords);
  // mymap.flyTo([cords.lat, cords.lng])
}


mymap.on("moveend", update);
svgCords()