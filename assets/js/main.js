$(document).ready(function () {
  "use strict";

  /*----------------------------- Site Loader & Popup --------------------*/
  $(window).on("load", function () {
    $("#ms-overlay").fadeOut("slow");
  });

  /*----------------------------- Scroll Up Button --------------------- */
  var btn = $("#scrollup");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  /*----------------------------- Scroll Down Button on hero section --------------------- */
  $(".scroll-down").on("click", function (e) {
    $("html,body").animate(
      {
        scrollTop: $("#about").offset().top,
      },
      "slow"
    );
  });

  /*--------------------- Aos animation on scroll --------------------*/
  AOS.init({
    once: true,
  });

  /*--------------------- Process bar for about skills --------------------*/
  $(document).ready(function () {
    startAnimation();
    function startAnimation() {
      $(".progress").each(function () {
        var width = $(this).attr("data-percent");
        // console.log(width);
        $(this).find(".progress-done").css("width", width);
      });
    }
  });

  /*-------------------- Potfolio for Mixit up --------------------*/
  var portfolioContent = $(".portfolio-content");
  portfolioContent.mixItUp();

  /*--------------------- Replace all SVG images with inline SVG -------------------------------- */
  $(document).ready(function () {
    $('img.svg_img[src$=".svg"]').each(function () {
      var $img = $(this);
      var imgURL = $img.attr("src");
      var attributes = $img.prop("attributes");

      $.get(
        imgURL,
        function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find("svg");

          // Remove any invalid XML tags
          $svg = $svg.removeAttr("xmlns:a");

          // Loop through IMG attributes and apply on SVG
          $.each(attributes, function () {
            $svg.attr(this.name, this.value);
          });

          // Replace IMG with SVG
          $img.replaceWith($svg);
        },
        "xml"
      );
    });
  });

  /*--------------------- On click menu scroll section to section -------------------------------- */
  // Cache selectors
  var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $("html, body").stop().animate(
      {
        scrollTop: offsetTop,
      },
      300
    );
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active");
    }
  });

  /*--------------------- Scroll to fixed navigation bar -------------------------------- */
  $(function () {
    var header = $(".ms-static");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 10) {
        header.removeClass("ms-static").addClass("ms-fixed");
      } else {
        header.removeClass("ms-fixed").addClass("ms-static");
      }
    });
  });

  /*--------------------- News carousel -------------------------------- */
  $(".news-carousel").owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    smartSpeed: 1000,
    autoplay: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      991: {
        items: 3,
      },
    },
  });

  /*----------------------------- Direct chat --------------------------------*/
  $(document).ready(function () {
    //click event on a tag
    $(".ms-list").on("click", function () {
      var number = $(this).attr("data-number");
      var message = $(this).attr("data-message");

      //checking for device type
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // redirect link for mobile WhatsApp chat awc
        window.open("https://wa.me/" + number + "/?text=" + message, "-blank");
      } else {
        // redirect link for WhatsApp chat in website
        window.open(
          "https://web.WhatsApp.com/send?phone=" + number + "&text=" + message,
          "-blank"
        );
      }
    });

    // chat widget open/close duration
    $("ms-style1").launchBtn({ openDuration: 400, closeDuration: 300 });
  });

  // chat panel open/close function
  $.fn.launchBtn = function (options) {
    var mainBtn,
      panel,
      clicks,
      settings,
      launchPanelAnim,
      closePanelAnim,
      openPanel,
      boxClick;

    mainBtn = $(".ms-button");
    panel = $(".ms-panel");
    clicks = 0;

    //default settings
    settings = $.extend(
      {
        openDuration: 600,
        closeDuration: 200,
        rotate: true,
      },
      options
    );

    //Open panel animation
    launchPanelAnim = function () {
      panel.animate(
        {
          opacity: "toggle",
          height: "toggle",
        },
        settings.openDuration
      );
    };

    //Close panel animation
    closePanelAnim = function () {
      panel.animate(
        {
          opacity: "hide",
          height: "hide",
        },
        settings.closeDuration
      );
    };

    //Open panel and rotate icon
    openPanel = function (e) {
      if (clicks === 0) {
        if (settings.rotate) {
          $(this).removeClass("rotateBackward").toggleClass("rotateForward");
        }

        launchPanelAnim();
        clicks++;
      } else {
        if (settings.rotate) {
          $(this).removeClass("rotateForward").toggleClass("rotateBackward");
        }

        closePanelAnim();
        clicks--;
      }
      e.preventDefault();
      return false;
    };

    //Allow clicking in panel
    boxClick = function (e) {
      e.stopPropagation();
    };

    //Main button click
    mainBtn.on("click", openPanel);

    //Prevent closing panel when clicking inside
    panel.click(boxClick);

    //Click away closes panel when clicked in document
    $(document).click(function () {
      closePanelAnim();
      if (clicks === 1) {
        mainBtn.removeClass("rotateForward").toggleClass("rotateBackward");
      }
      clicks = 0;
    });
  };
  /*--------------------- Instagram slider & Category slider & Tooltips ---------------------*/
  $(function () {
    $(".insta-auto").infiniteslide({
      direction: "left",
      speed: 50,
      clone: 10,
    });
    $('[data-toggle="tooltip"]').tooltip();
  });
  /*--------------------- water js start ---------------------*/
  $(document).ready(function () {
    try {
      $(".ms-home-water").ripples({
        resolution: 512,
        dropRadius: 20, //px
        perturbance: 0.01,
      });
      $(".ms-home-water").ripples({
        resolution: 512,
        dropRadius: 20, //px
        perturbance: 0.04,
        interactive: false,
      });
    } catch (e) {
      $(".error").show().text(e);
    }

    $(".js-ripples-disable").on("click", function () {
      $(".ms-home-water").ripples("destroy");
      $(this).hide();
    });

    $(".js-ripples-play").on("click", function () {
      $(".ms-home-water").ripples("play");
    });

    $(".js-ripples-pause").on("click", function () {
      $(".ms-home-water").ripples("pause");
    });

    // Automatic drops
    setInterval(function () {
      var $el = $(".main");
      var x = Math.random() * $el.outerWidth();
      var y = Math.random() * $el.outerHeight();
      var dropRadius = 20;
      var strength = 0.04 + Math.random() * 0.04;

      $el.ripples("drop", x, y, dropRadius, strength);
    }, 600);
  });

  /*--------------------- Custom Cursor JS -------------------------------- */
  var ms_cursor = document.querySelector(".ms-cursor");
  var ms_cursorinner = document.querySelector(".ms-cursor-2");
  var a = document.querySelectorAll("a");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    ms_cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
  });

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    ms_cursorinner.style.left = x + "px";
    ms_cursorinner.style.top = y + "px";
  });

  document.addEventListener("mousedown", function () {
    ms_cursor.classList.add("click");
    ms_cursorinner.classList.add("ms-cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    ms_cursor.classList.remove("click");
    ms_cursorinner.classList.remove("ms-cursorinnerhover");
  });

  a.forEach((item) => {
    item.addEventListener("mouseover", () => {
      ms_cursor.classList.add("ms-hover-cursor");
    });
    item.addEventListener("mouseleave", () => {
      ms_cursor.classList.remove("ms-hover-cursor");
    });
  });
});
