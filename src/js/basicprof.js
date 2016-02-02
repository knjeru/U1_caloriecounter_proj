//** Functions to build a new user profile **//

//** Constructor **//
var UserProf = function(info) {
  this.firstName = info.firstName;
  this.lastName = info.lastName;
  this.age = info.age;
  this.weight = info.weight;
  this.feet = info.feet;
  this.inches = info.inches;

  // calculate userHeight

  this.fullheight = Math.floor((this.feet * 12) + this.inches);

  // calculate BMR

  this.bmr = Math.floor(66 + (6.23 * this.weight) + (12.7 * this.fullheight) - (6.8 * this.age));

  // calculate BMI

  this.bmi = Math.floor(703 * (this.weight/(this.fullheight * this.fullheight)));

};

$(document).ready(function() {
  console.log('sanity check');
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    console.log('I can store for you');
  } else {
    // Sorry! No Web Storage support..
    console.log('I cannot store for you');
  }

  // $("#name").on('blur', function () {
  //   var test = $(this).val();
  //   console.log(test);
  // });

  $('form').on('submit', function(e) {
    e.preventDefault();
    // var newUser = new UserProf();
    var createUser = {};
    createUser.firstName = $("#firstName").val();
    createUser.lastName = $("#lastName").val();
    createUser.age = parseInt($("#age").val());
    createUser.weight = parseInt($("#weight").val());
    createUser.feet = parseInt($("#feet").val());
    createUser.inches = parseInt($("#inches").val());

    var newUser2 = new UserProf(createUser);

    //***   helper functions   ***//

    // // calculate userHeight
    // function convertHeight() {
    //   return Math.floor((createUser.feet * 12) + createUser.inches);
    // }
    // var userHeight2 = convertHeight();
    //
    // // calculate BMR
    // function calcBMR() {
    //   return Math.floor(66 + (6.23 * createUser.weight) + (12.7 * userHeight2) - (6.8 * createUser.age));
    // }
    // var bmrC = calcBMR();
    //
    // // calculate BMI
    // function calcBMI() {
    //   return Math.floor(703 * (createUser.weight/(userHeight2 * userHeight2)));
    // }
    // var bmiC = calcBMI();
    //
    // // show me if it worked!!!
    //
    // // console.log(bmrC);
    // // console.log(bmiC);
    console.log(newUser2);


  });



});
