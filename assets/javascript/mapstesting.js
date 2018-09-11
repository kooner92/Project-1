$(document).ready(function () {

    $("#reg-form").validate({
        rules: {
            add: {
                required: true,
                minlength: 3
            },
            add2: {
                required: true,
                minlength: 3
            },
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("form").on("submit", function (event) {

        $(".carousel").empty();
        $(".modal").modal();
        event.preventDefault();

        var address1 = $("#address1").val();
        var address2 = $("#address2").val();
        var apiKey = "AIzaSyDMm86-L51560jHqvvQ46cAZGTyOtYvlT4";
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var queryURL = `${proxy}https://maps.googleapis.com/maps/api/directions/json?origin=${address1}&destination=${address2}&key=${apiKey}`;
        $("#loadingModal").modal("open");
        if (address1 !== "" && address2 !== "") {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);


                
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
                    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del&limit=5${midLongitude}${midLatitude}${term}${price}${radius}${sortBy}${open}${advanceSearch}`,
                    method: "GET",
                    headers: { "Authorization": "Bearer 0xtZshssd9WzNzqiXrck1pdz-jC9mbOOkdDQL6xxKj9g78FU9wRHpXKxGLLSNAVo2jR-0bcLCaUn9x9yj8zGbBVY2zUM6wnl6-rWjmAo2mdtG_LSaF-uS7dDPLaQW3Yx" }
                }).then(function (response) {

                    console.log(response);
                    if (response.businesses.length === 0) {
                        $("#modal1").modal("open");
                        $("#loadingModal").modal("close");
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
                            meetUp.placePhone = response.businesses[i].display_phone;
                            meetUp.placeLocation = response.businesses[i].location.display_address;
                            array.push(meetUp);
                        }
                        for (i = 0; i < response.businesses.length; i++) {
                            var resultNumber = i + 1;
                            var name = array[i].placeName;
                            var price = array[i].placePrice;
                            var rating = array[i].placeRating;
                            var image = array[i].placeImage;
                            var link = array[i].placeUrl;
                            var phone = array[i].placePhone;
                            var location = array[i].placeLocation;

                            var carouselItem = $("<div>");
                            carouselItem.addClass("carousel-item");
                            var resultDiv = $("<div>");
                            resultDiv.attr("id", "result" + resultNumber).addClass("card result");
                            var imageDiv = $("<div>");
                            imageDiv.addClass("card-image");
                            var resultImage = $("<img>");
                            resultImage.attr("src", image).attr("alt", name);
                            var resultName = $("<span>");
                            resultName.addClass("card-title").text(name);
                            var resultContent = $("<div>");
                            resultContent.addClass("card-content");
                            var resultAction = $("<div>");
                            resultAction.addClass("card-action");
                            var resultLink = $("<a>");
                            resultLink.attr("href", link).text("link");
                            var header = $("<h6>");

                            resultAction.append(resultLink);
                            resultContent.append(location + "<br>" + phone + "<br> Price: " + price + "<br> Rating: " + rating + "/5");
                            header.append(resultName);
                            imageDiv.append(resultImage, header);
                            resultDiv.append(imageDiv, resultContent, resultAction);
                            carouselItem.append(resultDiv);

                            $(".carousel").append(carouselItem);
                        };
                        $('.carousel').carousel();
                        $("#loadingModal").modal("close");


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
                        var places = [];
                        for (var i = 0; i < response.businesses.length; i++) {
                            places[i] = {};
                            places[i].yelpLong = response.businesses[i].coordinates.longitude;
                            places[i].yelpLat = response.businesses[i].coordinates.latitude;
                            places[i].pointY = {};
                            places[i].pointY.lat = places[i].yelpLat;
                            places[i].pointY.lng = places[i].yelpLong;
                            places[i].yelpMarker = new google.maps.Marker({
                                position: places[i].pointY, map: map, title: response.businesses[i].name, icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 5
                                }
                            });
                            places[i].contentString = '<div id="content">' +
                                '<id="firstHeading" class="firstHeading">' + '<h6><b>' + response.businesses[i].name + '</b></h6>' +
                                '<div id="bodyContent">' + '<p>' + response.businesses[i].location.display_address + '</p>' + '<p>' + response.businesses[i].display_phone + '</p>'
                            '</div>' +
                                '</div>';

                            places[i].infowindow = new google.maps.InfoWindow({
                                content: places[i].contentString
                            });
                        }
                        places.forEach(place => {
                            google.maps.event.addListener(place.yelpMarker, 'click', function () {
                                place.infowindow.open(map, this);
                                places.forEach(place => {
                                    if (place.yelpMarker !== this) {
                                        place.infowindow.close();
                                    }
                                })
                            });
                        })
                    }
                    initMap();
                });
            });
        }
    });
});