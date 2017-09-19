$(document).ready(function() {
  var SCREEN_BREAKPOINT = 992;
  var VIEWPORT = $(window).width();
  var IS_PORTRAIT = window.innerHeight > window.innerWidth;
  var IMG_PATH = 'img/'
  var LANDSCAPE_IMG = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  var PORTRAIT_IMG = ['fondo 1 vertical.jpg', 'fondo 2 vertical.jpg', 'fondo 3 vertical.jpg', 'fondo 4 vertical.jpg'];
  adaptLayout();

  $(window).resize(function (event) {
    VIEWPORT = $(window).width();
    IS_PORTRAIT = $(window).innerHeight() > $(window).innerWidth();

    adaptLayout();
  });

  function adaptLayout() {
    // Mobile and Tablets
    if (VIEWPORT < SCREEN_BREAKPOINT) {
      $(".top").removeClass("border-top");
      $(".left").removeClass("border-left");
    } else {
      // Web
      $(".top").addClass("border-top");
      $(".left").addClass("border-left");
    }
    console.log(IS_PORTRAIT);
    if (IS_PORTRAIT) {
      $('.slide').each(function(i, img) {
        console.log('imagen',IMG_PATH + PORTRAIT_IMG[i]);
        $(img).attr('src', IMG_PATH + PORTRAIT_IMG[i]);
      });
    } else {
      $('.slide').each(function(i, img) {
        console.log('imagen',IMG_PATH + LANDSCAPE_IMG[i]);
        $(img).attr('src', IMG_PATH + LANDSCAPE_IMG[i]);
      });
    }
  }

});
/**
Modo horizontal =
add border-top a row


Modo vertical =
*/
