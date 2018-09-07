$(document).ready(function () {
    $("form").on("submit", function (event) {
        event.preventDefault();
        var longitude = "";
        var latitude = "";
        var term = "";
        var categories = "";
        var price = "";
        var sortBy = "";
        var radius = "";
        var location = "";
        // if ($("#validationDefault01").val() !== "") {
        //     longitude = "&longitude=" + $("#validationDefault01").val().trim();
        //     console.log("longitude " + longitude);
        // }
        // if ($("#validationDefault02").val() !== "") {
        //     latitude = "&latitude=" + $("#validationDefault02").val().trim();
        //     console.log("latitude " + latitude);
        // }
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
        if ($("#address1").val() !== "") {
            location = "&location=" + $("#address1").val();
            console.log("location " + location);
        }
        var urlCheck = "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del" + longitude + latitude + term + categories + sortBy + radius + location;
        console.log(urlCheck);
        $.ajax({
            url: "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del" + longitude + latitude + term + categories + sortBy + radius + location,
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
