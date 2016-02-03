//Global Variables

var calsFromFood = [];
var calsCON = [];

$(document).ready(function() {
  console.log('just carrying over some goodies from the other page');

  //get the items from local storage for use on this page
  var currUser = JSON.parse(localStorage.getItem("user"));
  var recCals = currUser.recCalories;
  var calsREM = recCals;

  // this will be equal to the total amount of calories consumed so far today
  // var calsCON;

  // var calsREM = Math.floor(recCals - calsCON);

  // append the reccommended amount of calories to the document
  if (calsCON.length === 0) {
    $('#calsConsumed').append('<p class="gUP">Start Tracking Cals</p>');
  }

  $("#calsRemain").append('<p class="gUP">(' + recCals + ')</p>');

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

            calsCON.push(calsFromFood.reduce(function(previousVal, currentVal) {
              return previousVal + currentVal;
            }));
            console.log(calsCON);

          }
        });
      }
    });
    updateCalInfo();
  });

  $("#reset").on('click', function() {
    for (var i = calsCON.length; i >= calsCON.length - 1; i--) {
      console.log(calsCON[i]);
    }
    // console.log(calsCON[]);
  });

  function updateCalInfo() {

    var test = null;
    for (var i = calsCON.length; i >= calsCON.length - 1; i--) {
      test = calsCON[i];
      calsREM = Math.floor(recCals - test);
      console.log(calsCON[i]);
    }

    if (calsCON.length > 0) {
      $('#calsConsumed').empty();
      $('#calsConsumed').append('<p class="gUP">' + test + '</p>');
      $("#calsRemain").empty();
      $("#calsRemain").append('<p class="gUP">('+calsREM+')</p>');
    }
  }


  // append some goodies for water

  $('#add').on('click', function() {
    var allDivsB = $('<p class="mWater"></p>');
    console.log(allDivsB);
    $('section').append(allDivsB);
  });



});
