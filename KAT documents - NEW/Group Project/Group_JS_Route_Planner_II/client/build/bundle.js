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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var requestHelper = {}

requestHelper.getRequest = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })
  xhr.send()
}

requestHelper.findRequest = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })
  xhr.send()
}

requestHelper.postRequest = function (url, payload) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  xhr.setRequestHeader('Content-Type', 'application/json')

  var jsonString = JSON.stringify(payload)
  xhr.send(jsonString)
}

module.exports = requestHelper


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var dropdownMaker = {}

dropdownMaker.setUpDropDown = function (items, select) {
  while(select.firstChild){select.removeChild(select.firstChild)}
  var firstOption = document.createElement("option")
  firstOption.innerText = "Select a Route!"
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption)
  items.forEach(function (item) {
    var option = document.createElement('option')
    option.innerText = item.name
    select.appendChild(option)
  })
  // select.addEventListener('change', function () {
  //   console.log(this.value)
  // })
}

module.exports = dropdownMaker


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(3)
var Route = __webpack_require__(4)
var requestHelper = __webpack_require__(0)
var dropdownMaker = __webpack_require__(1)
var flickrHelper = __webpack_require__(5)
var routeView = __webpack_require__(6)
var autocompleteHelper = __webpack_require__(7)
var listRoutes = []
var weatherHelper = __webpack_require__(9)

var app = function () {
  var customRoute = new Route (undefined, undefined, undefined)
  // create the map
  var mapDiv = document.querySelector('div#main-map')
  var mainMap = new MapWrapper(mapDiv)
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: mainMap.googleMap,
    suppressMarkers: true
  })
  // create the list of waypoints to choose from
  // var waypointSelect = document.querySelector("#waypoint-select")
  var url = 'http://localhost:3000/api/waypoints'
  requestHelper.getRequest(url, function (waypoints) {
    var ul = document.querySelector("#waypoint-list")
    waypoints.forEach(function(waypoint){
      renderCheckBoxes(waypoint, ul)
    })
  })
  // creating a custom route
  var routeName = document.querySelector('#route-name')
  var originInput = document.querySelector('#origin-input')
  var destinationInput = document.querySelector('#destination-input')
  var saveButton = document.querySelector('#plan-route-btn')
  saveButton.addEventListener('click', function () {
    // console.log("Button clicked");
    customRoute.name = routeName.value
    customRoute.origin = originInput.value
    customRoute.destination = destinationInput.value
    // var customRoute = new Route(routeName.value, originInput.value, destinationInput.value)
    // console.log("Route is created:", customRoute);
    requestHelper.postRequest('http://localhost:3000/api/routes', customRoute)
    routeView.setUpRouteList()
    routeView.renderRoute(customRoute, directionsService, directionsDisplay)
  })
  // make the routes dropdown
  routeView.setUpRouteList()
  var routeSelect = document.querySelector('#route-select')
  routeSelect.addEventListener('change', function () {
    findRoute(this.value)
  })
  // add the cool autocomplete thing
  // var originInput = document.querySelector('#origin-input')
  // var destinationInput = document.querySelector('#destination-input')
  autocompleteHelper.takeUserInput(mainMap, originInput)
  autocompleteHelper.takeUserInput(mainMap, destinationInput)

  // render the boxes
  var renderCheckBoxes = function (item, ul) {
    var li = document.createElement('li')
    var waypointLabel = document.createElement('label')
    waypointLabel.innerText = item.name
    li.appendChild(waypointLabel)
    var box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    box.value = item.latLng;
    box.addEventListener('change', function(event){
      // console.log(item);
      var waypoint = item.name


      if(this.checked){
      mainMap.addWaypointMarker(item.name)
      customRoute.addWaypoint(waypoint)
    } else{
      mainMap.clearMarker(item.name)
      var filteredArray = customRoute.waypoints.filter(function (waypoint) {
        return waypoint.location !== item.name
      })
      customRoute.waypoints = filteredArray

      //search custom routes waypoint array
      //compare the waypoints location to the item.name(should return same)
      //get the index and use the index to splice out that waypoint from the array

    }

    })
    waypointLabel.appendChild(box)
    ul.appendChild(li)
  }
  weatherHelper.getWeather()
}

var findRoute = function (value) {
  var url = 'http://localhost:3000/api/routes/' + value
  requestHelper.findRequest(url, function (foundRoute) {
    routeView.renderRoute(foundRoute[0], directionsService, directionsDisplay)
    // console.log(foundRoute[0].origin) returns a latlong object
    // function to loop through route waypoints
    // compare to database objects
    // map new array and add markers with appropriate info bubble
    console.log('request sent', foundRoute[0])
  })
}

window.addEventListener('DOMContentLoaded', app)


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var styling = __webpack_require__(8)
var requestHelper = __webpack_require__(0)
var flickrHelper = __webpack_require__(5)


var MapWrapper = function (container) {
  this.markers = [],
  this.googleMap = new google.maps.Map(container, {
    center: {lat: 55.949768, lng: -3.197314},
    zoom: 14,
    styles: styling
  })
  this.googleMap.setMapTypeId('roadmap')
  // this.addWaypointMarker = this.addWaypointMarker.bind(this)
}

MapWrapper.prototype.addMarker = function (object) {
  var marker = new google.maps.Marker({
    position: object.latLng,
    map: this.googleMap
  })
  var infoWindow = this.createInfoWindow(object)
    marker.addListener('click', function() {
    infoWindow.open(marker.map, marker);

  })
  this.markers.push(marker);
  console.log(this.markers);
};


MapWrapper.prototype.addWaypointMarker = function (waypointName) {
    url = "http://localhost:3000/api/waypoints/" + waypointName
    requestHelper.getRequest(url, function(waypoint) {
      var marker = new google.maps.Marker({
        position: waypoint[0].latLng,
        map: this.googleMap
      })
      var infoWindow = this.createInfoWindow(waypoint[0])
      marker.addListener('click', function() {
        infoWindow.open(marker.map, marker);
      })
      this.markers.push(marker)
      console.log(marker.position.lat());
      console.log(this.markers);
    }.bind(this))
}

MapWrapper.prototype.createInfoWindow = function (object) {
  if(object.notes) {
    return this.enhancedWindow(object)
    } else {
    return this.standardWindow(object)
  }
}

MapWrapper.prototype.standardWindow = function (object) {
  var infoWindow = new google.maps.InfoWindow({
    content: "<b>" + object.name + "</b>"
  })
  return infoWindow
};

MapWrapper.prototype.enhancedWindow = function (object) {
  var infoWindow = new google.maps.InfoWindow({
  content: "<div><b>" + object.name + "</b><br>" + object.notes + "</div>"
  })
  return infoWindow
};

MapWrapper.prototype.clearMarker = function (waypointName) {
  url = "http://localhost:3000/api/waypoints/" + waypointName
  requestHelper.getRequest(url, function (waypoint) {
    var filteredArray = this.markers.filter(function (marker) {
      if(marker.position.lat() === waypoint[0].latLng.lat){
        marker.setMap(null)
      }
      return marker.position.lat() !== waypoint[0].latLng.lat
    })
    this.markers = filteredArray;
  }.bind(this))
};
// MapWrapper.prototype.iconSorter = function (object) {
//   flickrHelper.request(object.name)
//
// };

module.exports = MapWrapper


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Route = function (name, origin, destination) {
  this.name = name,
  this.origin = origin,
  this.destination = destination,
  this.waypoints = [],
  this.optimizeWaypoints = true
}

Route.prototype.addWaypoint = function (locationInfo) {
  var waypoint = {
    location: locationInfo,
    stopover: true
  }
  this.waypoints.push(waypoint)
}

module.exports = Route


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// requestFlickr('edinburghnationalgallery')

var flickrHelper = {

  request: function (name) {
    var tag = this.tagMaker(name);

    var url = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=56a4f5d0179598fb68c82a2f0973331f&text=" + tag + "&format=json&nojsoncallback=1"
    var request = new XMLHttpRequest()
    console.log("request url", url);
    request.open("GET", url)

    request.addEventListener( "load", function () {
      var response = JSON.parse(this.responseText)
      var photo = response.photos.photo[0]
      var imageUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"
      var photoDiv = document.querySelector('div#flickr-photo')
      var flickrImage = document.createElement("IMG")
      flickrImage.setAttribute('src', imageUrl)
      photoDiv.appendChild(flickrImage)
      console.log(imageUrl)
    })
    request.send()
  },

  tagMaker: function (name) {
    var step1 = name.replace(" ", "")
    var step2 = step1.replace("'", "")
    return step2.toLowerCase();
  }

}



module.exports = flickrHelper;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(0)
var dropdownMaker = __webpack_require__(1)

var routeView = {

  setUpRouteList: function () {
    var url = 'http://localhost:3000/api/routes'
    var routeSelect = document.querySelector('#route-select')
    requestHelper.getRequest(url, function (routes) {
      dropdownMaker.setUpDropDown(routes, routeSelect)
    })
  },

  renderRoute: function (route, finder, displayer) {
    console.log('requesting route')
    finder.route({
      origin:  route.origin,
      destination: route.destination,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: route.waypoints
    }, function (response, status) {
      displayer.setDirections(response)
      console.log('rendering to screen', response);
    })
  }

}


module.exports = routeView;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var autocompleteHelper = {

  takeUserInput: function (mainMap, inputBox) {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(55.928895, -3.228688),
      new google.maps.LatLng(55.995430, -3.133934));

    var options = {
      bounds: defaultBounds,
      strictBounds: true
    }
    var autocomplete = new google.maps.places.Autocomplete(inputBox, options)
    autocomplete.addListener('place_changed', function () {
      var result = autocomplete.getPlace()
      var objectForMarkerification = {
        name: result.name,
        latLng: {lat: result.geometry.location.lat(), lng: result.geometry.location.lng()}
      }
      console.log(result);
      mainMap.addMarker(objectForMarkerification)
    })
  }

}

module.exports = autocompleteHelper


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var styles = [{
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#ebe3cd"
    }
  ]
},
{
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#523735"
    }
  ]
},
{
  "elementType": "labels.text.stroke",
  "stylers": [
    {
      "color": "#f5f1e6"
    }
  ]
},
{
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#c9b2a6"
    }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#dcd2be"
    }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#ae9e90"
    }
  ]
},
{
  "featureType": "landscape.natural",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#dfd2ae"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#dfd2ae"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#93817c"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#a5b076"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#447530"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#f5f1e6"
    }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#fdfcf8"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#f8c967"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#e9bc62"
    }
  ]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#e98d58"
    }
  ]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#db8555"
    }
  ]
},
{
  "featureType": "road.local",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#806b63"
    }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#dfd2ae"
    }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#8f7d77"
    }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "labels.text.stroke",
  "stylers": [
    {
      "color": "#ebe3cd"
    }
  ]
},
{
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#dfd2ae"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#b9d3c2"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#92998d"
    }
  ]
}]

module.exports = styles


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var weatherHelper = {
  getWeather: function () {
    var url = 'https://api.darksky.net/forecast/41f1b128e2f99ef1453305d6efbd8034/55.9411885,-3.2753782'
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.addEventListener('load', function () {
      var jsonString = xhr.responseText
      var data = JSON.parse(jsonString)
      var weatherDiv = document.querySelector('#weather')
      weatherDiv.innerHTML = data.currently.summary
      console.log(data)
    })
    xhr.send()
  }
}

module.exports = weatherHelper


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map