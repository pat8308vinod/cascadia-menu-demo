jQuery(document).ready(function ($) {
  // Mobile menu
  $(".navbar-toggler").click(function () {
    $(".cascadia-nav").toggleClass("open");
    $("body")
      .append('<div class="mobile-menu-overlay"></div>')
      .find(".mobile-menu-overlay")
      .click(function () {
        $(".cascadia-nav").removeClass("open");
        $(this).remove();
      });
  });
  $(window)
    .resize(function () {
      if ($(window).width() < 1280) {
        $(".nav-item.has-dropdown >.nav-link .link-arrow").click(function (e) {
          e.preventDefault();
          $(this).parent().parent().parent().addClass("open");
          $(this).parent().siblings(".dropdown-wrapper").css({ display: "block" });
          $(".menu-text").html($(this).find("img").remove().parent().html());
        });
        $("nav .btn-back").click(function (e) {
          e.preventDefault();
          $(this).parent().parent().parent().removeClass("open");
        });
        $("nav .btn-close,.menu-text").click(function () {
          $(".cascadia-nav").removeClass("open");
          $(".mobile-menu-overlay").remove();
        });
      }
    })
    .resize();
});

$(document).ready(function() {
  // When hovering over a dropdown wrapper
  $(".dropdown-wrapper").hover(
    function() {
      // Add the 'dropdown-open' class to all previous siblings with the '.nav-link' class
      $(this)
        .prevAll(".nav-link")
        .addClass("dropdown-open");
    },
    function() {
      // Remove the 'dropdown-open' class when mouse leaves the dropdown wrapper
      $(this)
        .prevAll(".nav-link")
        .removeClass("dropdown-open");
    }
  );
});