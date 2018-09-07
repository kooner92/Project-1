$(document).ready(function () {

function displaySearch() {
    var apiKey = "AIzaSyDrpfdCExJEExJV2qeTvUosEud5Issbyps";
    var proxy = "http://cors-anywhere.herokuapp.com/"
    var queryURL = `${proxy}https://maps.googleapis.com/maps/api/directions/json?origin=4603+Crosshaven+Bakersfield+CA&destination=Fresno`;
    console.log(apiKey);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response;
        console.log(results);
    });
}
displaySearch();
});
