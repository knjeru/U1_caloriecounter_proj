// add scripts

$(document).on('ready', function() {
  // console.log('sanity check!');

  $('#introEnter')
    .show()
    .css('opacity', 0)
    .slideDown('fast')
    .animate({
      opacity: 1
    }, {
      queue: false,
      duration: 'slow'
    });

    $('nav')
      .css('opacity', 0)
      .slideDown('slow')
      .animate({
        opacity: 1
      }, {
        queue: false,
        duration: 'slow'
      });


    localStorage.clear();

});
