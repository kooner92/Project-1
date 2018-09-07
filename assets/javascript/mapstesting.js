$(document).ready(function () {

function displaySearch() {
    var apiKey = "AIzaSyDMm86-L51560jHqvvQ46cAZGTyOtYvlT4";
    var proxy = "http://cors-anywhere.herokuapp.com/"
    var queryURL = proxy + "https://maps.googleapis.com/maps/api/directions/json?origin=San Jose&destination=Los Angeles&key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.routes[0].legs[0].start_location.lat);
        console.log(response.routes[0].legs[0].start_location.lng);
        console.log(response.routes[0].legs[0].end_location.lat);
        console.log(response.routes[0].legs[0].end_location.lng);

    });
}
displaySearch();
});