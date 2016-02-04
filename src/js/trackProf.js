//Global Variables

var calsFromFood = [];
var calsCON;
var currWater = 0;

// helper function for text capitalization
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function() {
  console.log('just carrying over some goodies from the other page');

  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $('#trackUserProf').show('slow', 'swing');

  if (JSON.parse(localStorage.getItem("user")) === null) {
    $('#trackUserProf').empty();
    $("#trackUserProf").append('<p class="gUP warning">Please fill out your profile to use our amazing calorie counter!</p>');
  } else {

    //get the items from local storage for use on this page
    var currUser = JSON.parse(localStorage.getItem("user"));
    var recCals = currUser.recCalories;
    var calsREM = recCals;

    // append the reccommended amount of calories to the document
    if (calsCON === undefined) {
      $('#foodItem').append('<p class="gUP">Good Day, <strong>'+currUser.firstName+'</strong>!<br> What have you eaten today?</p>');
      $('#calsConsumed').append('<p class="gUP">Enter a food item to start tracking calories</p>');
    }

    $("#calsRemain").append('<p class="gUP"><strong>' + recCals + '</strong></p>');

  }

  $('html, body').animate({
    scrollTop: $("#water").offset().top
  }, 1000);

  //pull API info for different foods

  $("#addFood").on("click", function() {
    var baseFood = $("#anyfood").val();

    var url = "http://api.nal.usda.gov/ndb/search/?format=json&q=" + baseFood + "&api_key=eK14TgAhnQ8N7hkvSC1gCLuRHbtUUiw9T4XsKBHJ";
    $.ajax({
      url: url,
      method: "GET",
      success: function(data) {
        var searchResult = data["list"]["item"][0]["ndbno"];
        var url2 = "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=eK14TgAhnQ8N7hkvSC1gCLuRHbtUUiw9T4XsKBHJ&nutrients=208&ndbno=" + searchResult + "";
        $.ajax({
          url: url2,
          method: "GET",
          success: function(data) {
            // console.log(data);
            var calories = data["report"]["foods"][0]["nutrients"][0]["value"];
            console.log(calories);

            // store calories in local storage
            localStorage.setItem("foodCON", JSON.stringify(calories));
            // return calories from local storage
            calsFromFood.push(parseInt((JSON.parse(localStorage.getItem("foodCON")))));

            calsCON = calsFromFood.reduce(function(previousVal, currentVal) {
              return previousVal + currentVal;
            });
            updateCalInfo();

            // show user the food item they just added
            $('#foodItem').append('<p class="gUP">I hope that the <strong>' + capitalizeFirstLetter(baseFood) + '</strong> you had tasted good going down because it added <strong>' + calories + '</strong> calories to your body!</p>');
          }
        });
      },

      error: function(err) {
        console.log(err);
        $('#foodItem').append('<p class="gUP">Sorry it appears as if our kitchen does not stock <strong>' + capitalizeFirstLetter(baseFood) + '</strong>. Maybe you should try selecting a real food next time?</p>');

      }
    });

    // clear input value
    $('input').val('');
    $('#foodItem').empty();

    $('html, body').animate({
      scrollTop: $("#water").offset().top
    }, 1000);
  });

  function updateCalInfo() {

    calsREM = Math.floor(recCals - calsCON);
    $('#calsConsumed').empty();
    $('#calsConsumed').append('<p class="gUP"><strong>' + calsCON + '</strong></p>');
    $("#calsRemain").empty();
    $("#calsRemain").append('<p class="gUP"><strong>' + calsREM + '</strong></p>');
  }


  // append some goodies for water

  if (currWater === 0) {
      $('#water').append("<p class='gUP'>Oh no! It looks like you haven't hydrated yet today! Quick take a sip before you wither away!</p>");
  }

  var remWater = 0;

  $('#add').on('click', function() {
    $('html, body').animate({
      scrollTop: $("#water").offset().top
    }, 1000);
    currWater = Math.floor(currWater + 8);
    remWater = Math.floor(64 - currWater);
    $('#water').empty();
    if (currWater === 8) {
      $('#water').append("<p class='gUP'>Phew! You're up to " + currWater + " ounces of water now, but keep chugging!</p>");
      $('#water').append("<p class='gUP'>Only " + remWater + " ounces to go!</p>");
    }
    else if (currWater < 64) {
      $('#water').append("<p class='gUP'>You're up to " + currWater + " ounces of water!</p>");
      $('#water').append("<p class='gUP'>Only " + remWater + " ounces to go!</p>");
    } else {
      $('#water').append("<p class='gUP'>You're up to " + currWater + " ounces of water!</p>");
      $('#water').append("<p class='appendedText'>You've reached your goal, but keeping going!</p>");
    }

  });



});
