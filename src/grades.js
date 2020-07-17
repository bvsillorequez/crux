let gradesArray = [
    "5.6", 
    "5.7", 
    "5.8", 
    "5.9",
    "5.10", 
    "5.10a", 
    "5.10b", 
    "5.10c", 
    "5.10d", 
    "5.11", 
    "5.11a", 
    "5.11b", 
    "5.11c", 
    "5.11d", 
    "5.12", 
    "5.12a", 
    "5.12b", 
    "5.12c", 
    "5.12d", 
    "5.13",
    "5.13a",
    "5.13b",
    "5.13c",
    "5.13d",
    "5.14", 
    "5.14a", 
    "5.14b", 
    "5.14c", 
    "5.14d", 
    "5.15"
  ];

let gpdropdown = document.querySelector(".dropdown");
let gpselect = document.createElement("select");
gpselect.id = "grade";
gpdropdown.appendChild(gpselect);

let gpoption = document.createElement("option");
gpoption.innerHTML = "Grade";
gpoption.value = "null";
gpselect.appendChild(gpoption);

d3.select("#grade")
  .selectAll("gradeOptions")
  .data(gradesArray)
  .enter()
  .append("option")
  .text(function (d) {
    return d;
  })
  .attr("value", function (d) {
    return d;
  });