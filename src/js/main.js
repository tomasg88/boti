
$(document).ready(function() {
  var SCREEN_BREAKPOINT = 992;
  var VIEWPORT = $(window).width();
  var IS_PORTRAIT = window.innerHeight > window.innerWidth;
  var IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
  var IMG_PATH = 'img/'
  var LANDSCAPE_IMG = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  var PORTRAIT_IMG = ['fondo 1 vertical.jpg', 'fondo 2 vertical.jpg', 'fondo 3 vertical.jpg', 'fondo 4 vertical.jpg'];

  adaptLayout();
  $(window).resize(function (event) {
    VIEWPORT = $(window).width();
    IS_PORTRAIT = $(window).innerHeight() > $(window).innerWidth();
    IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

    adaptLayout();
  });

  function adaptLayout() {
    // Mobile and Tablets
    if (VIEWPORT < SCREEN_BREAKPOINT && IS_MOBILE) {
      $(".top").removeClass("border-top");
      $(".left").removeClass("border-left");
      $(".icon").addClass("extra-left");
    } else {
      // Web
      $(".top").addClass("border-top");
      $(".left").addClass("border-left");
      $(".icon").removeClass("extra-left");
    }
    if (IS_PORTRAIT) {
      $('.slide').each(function(i, img) {
        $(img).attr('src', IMG_PATH + PORTRAIT_IMG[i]);
      });
    } else {
      $('.slide').each(function(i, img) {
        $(img).attr('src', IMG_PATH + LANDSCAPE_IMG[i]);
      });
      if (IS_MOBILE) {
        fillExtraBars(true);
      }
    }
  }

  // Para celular en landscape, agrega barras.
  function fillExtraBars(add) {
    if (add) {
      $('.extra').show();
    } else {
      $('.extra').hide();
    }
  }

});
/**
Modo horizontal =
add border-top a row


Modo vertical =
*/
