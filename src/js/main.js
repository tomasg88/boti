(function() {
  'use strict';

  $(window).on('load', function() {
    $(".loader-screen").fadeOut('slow');
  })


  $(document).ready(function() {
    var SCREEN_BREAKPOINT = 767;
    var VIEWPORT = $(window).width();
    var IS_PORTRAIT = window.innerHeight > window.innerWidth;
    var IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
    var IMG_PATH = 'img/'
    var LANDSCAPE_IMG = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
    var PORTRAIT_IMG = ['fondo 1 vertical.jpg', 'fondo 2 vertical.jpg', 'fondo 3 vertical.jpg', 'fondo 4 vertical.jpg', 'fondo 5 vertical.jpg'];

    adaptLayout();
    $(window).resize(function (event) {
      VIEWPORT = $(window).width();
      IS_PORTRAIT = $(window).innerHeight() > $(window).innerWidth();
      IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

      adaptLayout();
    });

    function adaptLayout() {

      if (VIEWPORT < SCREEN_BREAKPOINT) {
        changeText(true);
        $(".top").addClass("border-top");
        $(".left").removeClass("border-left");
        $(".down").addClass("pull-down");
        $('.slide').each(function(i, img) {
          $(img).attr('src', IMG_PATH + PORTRAIT_IMG[i]);
        });

      } else {
        // Web
        changeText(false);
        $(".left").addClass("border-left");
        $(".top").removeClass("border-top");
        $(".down").removeClass("pull-down");
      }

      IS_PORTRAIT? changeBackground(PORTRAIT_IMG) : changeBackground(LANDSCAPE_IMG);
    }

    function changeBackground(pictures) {
      $('.slide').each(function(i, img) {
        $(img).attr('src', IMG_PATH + pictures[i]);
      });
    }

    function changeText(mobile) {
      var title = '<h5 class="title"><strong>HORARIOS</strong></h5>',
      location = '<a target="_blank" href="//www.google.com.ar/maps/place/Boticario+Bar/@-34.5872654,-58.4343985,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb5892da124ad:0x4c941c7ee7ee4229!8m2!3d-34.5872654!4d-58.4322098?hl=es-419"><h5><span class="icon icon-location"></span><strong class="location-title">HONDURAS 5207</strong></h5></a>';

      if (mobile) {
        $('.changing-cell').html(location);
      } else {
        $('.changing-cell').html(title);
      }
    }

  }); // end document-ready

})();
