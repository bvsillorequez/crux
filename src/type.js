let diciplineArray = ["TR", "Trad", "Sport", "Boulder"];

let dpdropdown = document.querySelector(".dropdown");
let dpselect = document.createElement("select");
dpselect.id = "type";
dpdropdown.appendChild(dpselect);

let dpoption = document.createElement("option");
dpoption.innerHTML = "Discipline";
dpoption.value = "null";
dpselect.appendChild(dpoption);

d3.select("#type")
  .selectAll("typeOptions")
  .data(diciplineArray)
  .enter()
  .append("option")
  .text(function (d) {
    return d;
  })
  .attr("value", function (d) {
    return d;
  });


