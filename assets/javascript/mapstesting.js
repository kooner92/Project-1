$(document).ready(function () {

    $("form").on("submit", function (event) {

        $("#yelp-results").empty();
        $(".modal").modal();
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
            if ($("input[id='hotNew']:checked").val() !== undefined) {
                yelpAttributes.push($("input[id='hotNew']:checked").val());
            }
            if ($("input[id='reservation']:checked").val() !== undefined) {
                yelpAttributes.push($("input[id='reservation']:checked").val());
            }
            if ($("input[id='deals']:checked").val() !== undefined) {
                yelpAttributes.push($("input[id='deals']:checked").val());
            }
            if (yelpAttributes !== undefined) {
                advanceSearch = "&attributes=" + yelpAttributes.toString();
            }

            $.ajax({
                url: `http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del${midLongitude}${midLatitude}${term}${price}${radius}${sortBy}${open}${advanceSearch}`,
                method: "GET",
                headers: { "Authorization": "Bearer 0xtZshssd9WzNzqiXrck1pdz-jC9mbOOkdDQL6xxKj9g78FU9wRHpXKxGLLSNAVo2jR-0bcLCaUn9x9yj8zGbBVY2zUM6wnl6-rWjmAo2mdtG_LSaF-uS7dDPLaQW3Yx" }
            }).then(function (response) {

                console.log(response);
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
                    for (i = 0; i < 5; i++) {
                        var resultNumber = i + 1;
                        var name = array[i].placeName;
                        var price = array[i].placePrice;
                        var rating = array[i].placeRating;
                        var image = array[i].placeImage;
                        var link = array[i].placeUrl;
                        var phone = array[i].placePhone;
                        var location = array[i].placeLocation;

                        var resultDiv = $("<div>");
                        resultDiv.attr("id", "result" + resultNumber);
                        var resultHeader = $("<div>");
                        resultHeader.addClass("row");
                        var resultTitle = $("<div>");
                        resultTitle.addClass("col s12");
                        var resultContent = $("<div>");
                        resultContent.addClass("row");
                        var resultImage = $("<div>");
                        resultImage.addClass("col s6").attr("id", "imageColumn");
                        var resultText = $("<div>");
                        resultText.addClass("col s6");

                        resultTitle.append(resultNumber).append($("<a>").attr("href", link).text(") " + name));
                        resultHeader.append(resultTitle);

                        resultImage.append($("<img>").attr("src", image).attr("alt", name).attr("id", "resultImage"));
                        resultText.append(location + "<br> Contact: " + phone + "<br> Price: " + price + "<br> Rating: " + rating + "/5");
                        resultContent.append(resultImage, resultText);

                        resultDiv.append(resultHeader, resultContent);
                        $("#yelp-results").append(resultDiv);
                    };
                }
                
                function initMap() {
                    var pointMid = {};
                    pointMid.lat = (latitude1 + latitude2) / 2;
                    pointMid.lng = (longitude1 + longitude2) / 2;
                    var pointA = {};
                    pointA.lat = latitude1;
                    pointA.lng = longitude1;
                    var pointB = {};
                    pointB.lat = latitude2;
                    pointB.lng = longitude2;
                    var image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                    var map = new google.maps.Map(
                        document.getElementById('map'), { zoom: 4, center: pointMid });
                    var markerMid = new google.maps.Marker({ position: pointMid, map: map, icon: image, title: "Mid Point" });
                    var markerA = new google.maps.Marker({ position: pointA, map: map, title: "1st Location" });
                    var markerB = new google.maps.Marker({ position: pointB, map: map, title: "2nd location" });
                    var markers = [markerMid, markerA, markerB];
                    var bounds = new google.maps.LatLngBounds();
                    for (var i = 0; i < markers.length; i++) {
                        bounds.extend(markers[i].getPosition());
                    }
                    map.fitBounds(bounds);
                }
                initMap();
            });
        });
    });
});