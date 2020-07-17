# Crux

![ezgif.com-video-to-gif-11a9288473eff29e7.gif](https://s7.gifyu.com/images/ezgif.com-video-to-gif-11a9288473eff29e7.gif)

## Live Site

View [Crux](https://bvsillorequez.github.io/crux/)

## Background

**Crux** is a climbers best friend.  Often, climbers get to a location without
knowing where the climbs they read about in a book are.  Using GPS location and,
Crux pinpoints the climb and each climb can be filtered by dicipline or grade.

## Instructions

To use **Crux**, use your mouse to zoom and pan around the map.  The user can
select the location they want to climb in and upon zooming in, the user can find
what climbs are in that area along with information on the climb, clicking the 
marker.

**NB:** MountainProjectAPI was set to reveal 50 climbs at a time to control the 
amount of GET request API calls to their server.

![cruxclick](https://s7.gifyu.com/images/ezgif.com-video-to-gif7d1b37388683b5a6.gif)

## Technologies Used

- D3.js
  - Import and filter data used to create data filled markers
- Vanilla JS
  - Used for dynamic features such as dropdown menus
- Leaflet.js
  - Create a topographic map
- HTML5
  - Display content
- CSS3
  - Styling
- MountainProject API
  - Data for coordinates and information of each available route

## Features

### Data Filters

- Using the MountainProject API, D3.js, and Vanilla Javascrip, the user can 
filter what they want to view by selecting the options in a dropdown menu.  With
Vanilla Javacript, **Crux** uses an onChange event listener that takes the value
of the option and threads down the information to D3.js.  This filters to that
selection, and uses D3 to clear the map and repopulate with the new information.

```
      let onTypeChange = function () {
        let e = document.getElementById("type");
        let dicipline = e.options[e.selectedIndex].value;
        var elements = document.getElementsByTagName('select');
        renderType(dicipline)
      };

      document.querySelector("#type").addEventListener("change", onTypeChange);
      
      function renderType(dicipline) {
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
```

### Update map with a dynamic drop down menu 

- Utilizing Leaflet.js and Vanilla Javascript, an editable object is used to 
populate the dropdown menu.  Within the dropdown menu and selection, an 
onChange eventHandler is used to seperate value from the option HTML and parse
the value into a number.  These numbers are passed into Leaflet.js, panning
the map to the selected view

```
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
```