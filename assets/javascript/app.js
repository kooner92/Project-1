$(document).ready(function () {

    function displaySearch() {
        var string = "westwood, ca"

        var proxy = "http://cors-anywhere.herokuapp.com/"
        var queryURL = `${proxy}https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=`;    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.results[0].geometry.location.lat);
            console.log(response.results[0].geometry.location.lng);
        });
    
    }
        displaySearch();

});
