$(document).ready(function () {
    $("form").on("submit", function (event) {
        event.preventDefault();
        var longitude = "";
        var latitude = "";
        var term = "";
        var categories = "";
        var sortBy = "";
        var radius = "";
        var location = "";
        var webUrl = "";
        if ($("#validationDefault01").val() !== "") {
            longitude = "&longitude=" + $("#validationDefault01").val().trim();
            console.log(longitude);
        }
        if ($("#validationDefault02").val() !== "") {
            latitude = "&latitude=" + $("#validationDefault02").val().trim();
            console.log(latitude);
        }
        if ($("#validationDefault03").val() !== "") {
            term = "&term=" + $("#validationDefault03").val();
            console.log(term);
        }
        if ($("#validationDefault04").val() !== "") {
            categories = "&categories=" + $("#validationDefault04").val();
            console.log(categories);
        }
        if ($("#validationDefault05").val() !== "") {
            sortBy = "&sortBy=" + $("#validationDefault05").val();
            console.log(sortBy);
        }
        if ($("#validationDefault06").val() !== "") {
            radius = "&radius=" + $("#validationDefault06").val();
            console.log(radius);
        }
        if ($("#validationDefault07").val() !== "") {
            location = "&location=" + $("#validationDefault07").val();
            console.log(location);
        }
        $.ajax({
            url: "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=del" + longitude + latitude + location + term + categories + sortBy + radius,
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
