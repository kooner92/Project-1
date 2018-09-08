$(document).ready(function () {

    $("form").on("submit", function (event) {

        event.preventDefault();
        var address1 = $("#address1").val();
        var address2 = $("#address2").val();
        var apiKey = "AIzaSyDMm86-L51560jHqvvQ46cAZGTyOtYvlT4";
        var proxy = "http://cors-anywhere.herokuapp.com/";
        var queryURL = `${proxy}https://maps.googleapis.com/maps/api/directions/json?origin=${address1}&destination=${address2}&key=${apiKey}`;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var latitude1 = response.routes[0].legs[0].start_location.lat;
            var longitude1 = response.routes[0].legs[0].start_location.lng;
            var latitude2 = response.routes[0].legs[0].end_location.lat;
            var longitude2 = response.routes[0].legs[0].end_location.lng;
            var midLongitude = "&longitude=" + ((longitude1 + longitude2) / 2);
            var midLatitude = "&latitude=" + ((latitude1 + latitude2) / 2);
            var term = "";
            var price = $("input[name='price']:checked").val();
            var radius = $("input[name='radius']:checked").val();
            var sortBy = $("input[name='sortBy']:checked").val();
            var open = "";
            var yelpAttributes = [];
            var advanceSearch = ""; 
            if ($("#term").val() !== "") {
                term = "&term=" + $("#term").val();
            }
            if ($("input[id='openNow']:checked").val() !== undefined) {
                open = $("input[id='openNow']:checked").val();
            }
            if ($("input[id='hotNew']:checked").val() !== undefined){
                yelpAttributes.push($("input[id='hotNew']:checked").val());
            }
            if ($("input[id='reservation']:checked").val() !== undefined){
                yelpAttributes.push($("input[id='reservation']:checked").val());
            }
            if ($("input[id='deals']:checked").val() !== undefined){
                yelpAttributes.push($("input[id='deals']:checked").val());
            }
            if (yelpAttributes !== undefined){
                advanceSearch = "&attributes=" + yelpAttributes.toString();
            }
            $.ajax({
                url: `http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del${midLongitude}${midLatitude}${term}${price}${radius}${sortBy}${open}${advanceSearch}`,
                method: "GET",
                headers: { "Authorization": "Bearer 0xtZshssd9WzNzqiXrck1pdz-jC9mbOOkdDQL6xxKj9g78FU9wRHpXKxGLLSNAVo2jR-0bcLCaUn9x9yj8zGbBVY2zUM6wnl6-rWjmAo2mdtG_LSaF-uS7dDPLaQW3Yx" }
            }).then(function (response) {
                if (response.businesses.length === 0) {
                    alert("no businesses in this search area");
                }
                else {
                    var array = [];
                    for (var i = 0; i < response.businesses.length; i++) {
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
                }
            });
        });
    });
});