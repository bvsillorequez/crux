/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var mymap = L.map(\"mapid\").setView([37.840548, -119.5165878], 10);\n\n//Map\nL.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n  attribution:\n    'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a>',\n  maxZoom: 18,\n  minZoom: 10,\n}).addTo(mymap);\n\n//Add svg with data\nL.svg({ clickable: true }).addTo(mymap);\n\n\n\nfunction svgCords(cords = mymap.getCenter()) {\n  \n  d3.json(\n    // `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${cords.lat}&lon=${cords.lng}&maxDistance=10&maxResults=50&minDiff=5.6&maxDiff=5.15a&key=200243839-81d7f5a3fe0faee7505eebca1bbee9af`,\n    \"src/yosemite.json\",\n    function (data) {\n      let color = d3\n        .scaleOrdinal()\n        .domain([\"Trad\", \"Sport\", \"Boulder\"])\n        .range([\"#29526D\", \"#AA8C39\", \"#551600\"]); //blue trad, yellow sport, red boulder\n\n\n      let onClick = function (d) {\n        let circle = L.circle([d.latitude, d.longitude], 40, {\n          color: 'none',\n          fillColor: 'white',\n          fillOpacity: 0\n        }).addTo(mymap);\n\n        circle.bindPopup(d.name +\n          \"  ||  Type: \" + d.type + \"  ||  Grade: \" + d.rating);\n      }\n\n      let onTypeChange = function () {\n        let e = document.getElementById(\"type\");\n        let dicipline = e.options[e.selectedIndex].value;\n        render(dicipline)\n      };\n\n      let onGradeChange = function () {\n        let e = document.getElementById(\"grade\");\n        let grade = e.options[e.selectedIndex].value;\n        console.log(`${grade}`)\n        renderGrade(grade)\n      };\n\n      document.querySelector(\"#type\").addEventListener(\"change\", onTypeChange);\n      document.querySelector(\"#grade\").addEventListener(\"change\", onGradeChange);\n\n      function render(dicipline) {\n        d3.selectAll(\"circle\").data([]).exit().remove();\n        const update = d3.select(\"#mapid\")\n          .select(\"svg\")\n          .attr(\"pointer-events\", \"auto\")\n          .selectAll(\"circles\")\n          .data(data.routes.filter(d => d.type === dicipline))\n\n        update.exit().remove()\n\n        update\n          .enter()\n          .append(\"circle\")\n          .attr(\"class\", \"datapoint\")\n          .attr(\"cx\", function (d) {\n            return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;\n          })\n          .attr(\"cy\", function (d) {\n            return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;\n          })\n          .attr(\"r\", 10)\n          .style(\"fill\", function (d) {\n            return color(d.type);\n          })\n          .attr(\"stroke\", \"black\")\n          .attr(\"stroke-width\", 1)\n          .attr(\"fill-opacity\", 0.2)\n          .on(\"click\", onClick);\n      }\n\n      \n      function renderGrade(grade) {\n        d3.selectAll(\"circle\").data([]).exit().remove();\n        const update = d3.select(\"#mapid\")\n          .select(\"svg\")\n          .attr(\"pointer-events\", \"auto\")\n          .selectAll(\"circles\")\n          .data(data.routes.filter(d => d.rating === grade))\n        // debugger\n        update.exit().remove()\n\n        update\n          .enter()\n          .append(\"circle\")\n          .attr(\"class\", \"datapoint\")\n          .attr(\"cx\", function (d) {\n            return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;\n          })\n          .attr(\"cy\", function (d) {\n            return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;\n          })\n          .attr(\"r\", 10)\n          .style(\"fill\", function (d) {\n            return color(d.type);\n          })\n          .attr(\"stroke\", \"black\")\n          .attr(\"stroke-width\", 1)\n          .attr(\"fill-opacity\", 0.2)\n          .on(\"click\", onClick);\n      }\n\n\n      d3.select(\"#mapid\")\n        .select(\"svg\")\n        .attr(\"pointer-events\", \"auto\")\n        .selectAll(\"circles\")\n        .data(data.routes)\n        .enter()\n        .append(\"circle\")\n        .attr(\"class\", \"datapoint\")\n        .attr(\"cx\", function (d) {\n          return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;\n        })\n        .attr(\"cy\", function (d) {\n          return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;\n        })\n        .attr(\"r\", 10)\n        .style(\"fill\", function (d) {\n          return color(d.type);\n        })\n        .attr(\"stroke\", \"black\")\n        .attr(\"stroke-width\", 1)\n        .attr(\"fill-opacity\", 0.2)\n        .on(\"click\", onClick)\n    }\n  );\n}\n\nfunction update() {\n  d3.selectAll(\"circle\")\n    .attr(\"cx\", function (d) {\n      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).x;\n    })\n    .attr(\"cy\", function (d) {\n      return mymap.latLngToLayerPoint([d.latitude, d.longitude]).y;\n    });\n  d3.selectAll('circle').data([]).exit().remove()\n  changeCords()\n}\n\nfunction changeCords() {\n  var cords = mymap.getCenter();\n  // debugger\n  svgCords(cords);\n  // mymap.flyTo([cords.lat, cords.lng])\n}\n\n\nmymap.on(\"moveend\", update);\nsvgCords()\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });