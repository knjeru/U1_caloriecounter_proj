$(document).ready(function() {
  console.log('just carrying over some goodies from the other page');

  //get the items from local storage for use on this page
  localStorage.getItem("user");

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
