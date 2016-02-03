//** Constructor **//
var UserProf = function(info) {
  this.firstName = info.firstName;
  this.lastName = info.lastName;
  this.gender = info.gender;
  this.age = info.age;
  this.weight = info.weight;
  this.feet = info.feet;
  this.inches = info.inches;
  this.activeLevel = info.activeLevel;

  // calculate userHeight
  this.heightToinches = Math.floor((this.feet * 12) + this.inches);

  // calculate BMR based on gender
  if(this.gender === "male") {
    // male BMR calc
    this.bmr = Math.floor(66 + (6.23 * this.weight) + (12.7 * this.heightToinches) - (6.8 * this.age));
  } else {
    // female BMR calc
    this.bmr = Math.floor(655 + (4.35 * this.weight) + (4.7 * this.heightToinches) - (4.7 * this.age));
  }

  // calculate BMI
  this.bmi = Math.floor(703 * (this.weight / (this.heightToinches * this.heightToinches)));

  // calculate cals safe for consumption based on activity level
  this.recCalories = Math.floor(this.bmr * this.activeLevel);
};

var storeData = [];

$(document).ready(function() {
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    console.log('Pay no attention to me tucking things away');
  } else {
    // Sorry! No Web Storage support..
    console.log('I cannot store for you');
  }


  $('form').on('submit', function(e) {
    e.preventDefault();

    var createUser = {};
    createUser.firstName = $("#firstName").val();
    createUser.lastName = $("#lastName").val();
    createUser.gender = $('input[name="gender"]:checked').val();
    createUser.age = parseInt($("#age").val());
    createUser.weight = parseInt($("#weight").val());
    createUser.feet = parseInt($("#feet").val());
    createUser.inches = parseInt($("#inches").val());
    createUser.activeLevel = $('input[name="activity"]:checked').val();

    var newUser = new UserProf(createUser);

    console.log(newUser);

    //store user in localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    //fetch object
    console.log(localStorage.getItem("user"));

    // clear inputs
    $('input').val('');
    $('input[name="gender"]').prop('checked', false);
    $('input[name="activity"]').prop('checked', false);

  });



});
