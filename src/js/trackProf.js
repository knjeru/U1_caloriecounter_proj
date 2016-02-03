$(document).ready(function() {
  console.log('just carrying over some goodies from the other page');

  //get the items from local storage for use on this page
  var currUser = JSON.parse(localStorage.getItem("user"));
  var recCals = currUser.recCalories;

  // this will be equal to the total amount of calories consumed so far today
  // var calsCON;

  // var calsREM = Math.floor(recCals - calsCON);

  // append the reccommended amount of calories to the document
  // $("#calsConsumed").append('<p class="gUP">('+calsCON+')</p>');
  
  $("#calsRemain").append('<p class="gUP">('+recCals+')</p>');

  //pull API info for different foods

  $("#addFood").on("click", function() {
    var baseFood = $("#anyfood").val();

    var url = "http://api.nal.usda.gov/ndb/search/?format=json&q="+baseFood+"&api_key=eK14TgAhnQ8N7hkvSC1gCLuRHbtUUiw9T4XsKBHJ";
    $.ajax({
      url: url,
      method: "GET",
      success: function(data) {
        $("#bfood").val('');
        var searchResult = data["list"]["item"][0]["ndbno"];
            var url2 = "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=eK14TgAhnQ8N7hkvSC1gCLuRHbtUUiw9T4XsKBHJ&nutrients=208&ndbno="+searchResult+"";
        $.ajax({
          url: url2,
          method: "GET",
          success: function(data) {
            console.log(data);
            var calories = data["report"]["foods"][0]["nutrients"][0]["value"];
            console.log(calories);
      }
    });
  }
});
});
// });

  // append some goodies for water

  $('#add').on('click', function() {
    var allDivsB = $('<p class="mWater"></p>');
    console.log(allDivsB);
    $('section').append(allDivsB);
  });



});
