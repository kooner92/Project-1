$(document).ready(function () {

$("form").on("submit", function(event) {

    event.preventDefault();
    var address1 = "";
    var address2 = "";

    address1 = $("#address1").val()
    address2 = $("#address2").val()

    var apiKey = "AIzaSyDMm86-L51560jHqvvQ46cAZGTyOtYvlT4";
    var proxy = "http://cors-anywhere.herokuapp.com/"
    var queryURL = proxy + "https://maps.googleapis.com/maps/api/directions/json?origin=" + address1 + "&destination=" + address2 + "&key=" + apiKey;
    
        console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var latitude1 = response.routes[0].legs[0].start_location.lat;
        var longitude1 = response.routes[0].legs[0].start_location.lng;
        var latitude2 = response.routes[0].legs[0].end_location.lat;
        var longitude2 = response.routes[0].legs[0].end_location.lng;
        
        console.log("start lat " + latitude1);
        console.log("start long " + longitude1);
        console.log("end lat " + latitude2);
        console.log("end long " + longitude2);
        
        var midLongitude = "&longitude=" + ((longitude1 + longitude2) / 2);
        var midLatitude = "&latitude=" + ((latitude1 + latitude2) / 2);
        console.log(midLatitude);
        console.log(midLongitude);

        var term = "";
        var categories = "";
        var price = "";
        var sortBy = "";
        var radius = "";
        var location = "";
       
        if ($("#term").val() !== "") {
            term = "&term=" + $("#term").val();
            console.log("search " + term);
        }
        if ($("#categories").val() !== "") {
            categories = "&categories=" + $("#categories").val();
            console.log("categories " + categories);
            console.log($("#categories").val());
        }

        if ($("#price").val() !== "") {
            price = "&price=" + $("#price").val();
            console.log("price " + price);
        }
        if ($("#sortBy").val() !== "") {
            sortBy = "&sortBy=" + $("#sortBy").val();
            console.log("sortBy " + sortBy);
        }
        if ($("#radius").val() !== "") {
            radius = "&radius=" + $("#radius").val();
            console.log("radius " + radius);
        }
        var urlCheck = "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del" + midLongitude + midLatitude + term + categories + sortBy + radius;
        console.log(urlCheck);
        $.ajax({
            url: "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del" + midLongitude + midLatitude + term + categories + sortBy + radius,
            method: "GET",
            headers: { "Authorization": "Bearer 0xtZshssd9WzNzqiXrck1pdz-jC9mbOOkdDQL6xxKj9g78FU9wRHpXKxGLLSNAVo2jR-0bcLCaUn9x9yj8zGbBVY2zUM6wnl6-rWjmAo2mdtG_LSaF-uS7dDPLaQW3Yx" }
        }).then(function (response) {
            console.log(response);
            var array = [];
            for (var i = 0; i < 10; i++) {
                var meetUp = {};
                meetUp.placeName = response.businesses[i].name;
                meetUp.placePrice = response.businesses[i].price;
                meetUp.placeRating = response.businesses[i].rating;
                meetUp.placeImage = response.businesses[i].image_url;
                meetUp.placeUrl = response.businesses[i].url;
                meetUp.placePhone = response.businesses[i].phone;
                meetUp.placeLocation = response.businesses[i].location.display_address;
                array.push(meetUp);
            }
            console.log(array);
        });

        
    });

});

});