$(".cascadia-dropdown").mouseenter(function () {
  // Close other open dropdowns in the same navigation
  var commonParent = $(this).closest(".navbar"); // Assuming '.navbar' is the common parent
  var commonParent2 = $(this).closest(".custom-dropdown-menu"); // Assuming '.custom-dropdown-menu' is the common parent
  commonParent
    .find(".cascadia-dropdown .dropdown-menu.show")
    .not($(this).find(".dropdown-menu"))
    .removeClass("show");
  commonParent2
    .find(".cascadia-dropdown .dropdown-menu.show")
    .not($(this).find(".dropdown-menu"))
    .removeClass("show");

  // Toggle the dropdown
  var dropdownMenu = $(this).find(".dropdown-menu");
  dropdownMenu.addClass("show");

  // Toggle the icon between fa-plus and fa-minus based on whether the dropdown is open
  var icon = $(this).find("i");
  icon.removeClass("fa-plus").addClass("fa-minus");

  // Reset icons for all other dropdowns
  commonParent
    .find(".cascadia-dropdown .dropdown-toggle i")
    .not(icon)
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

// Toggle the icon on mouse leave
$(".cascadia-dropdown").mouseleave(function () {
  var dropdownMenu = $(this).find(".dropdown-menu");
  dropdownMenu.removeClass("show");

  // Toggle the icon between fa-plus and fa-minus based on whether the dropdown is open
  var icon = $(this).find("i");
  icon.toggleClass("fa-plus fa-minus");

  // Reset icons for all other dropdowns
  var commonParent = $(this).closest(".navbar"); // Assuming '.navbar' is the common parent
  commonParent
    .find(".cascadia-dropdown .dropdown-toggle i")
    .not(icon)
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

// Close the dropdown on mouse leave
$(".cascadia-dropdown").mouseleave(function () {
  var dropdownMenu = $(this).find(".dropdown-menu");
  dropdownMenu.removeClass("show");

  // Reset icons for all dropdowns
  $(this)
    .find(".cascadia-dropdown .dropdown-toggle i")
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

// Close the dropdown on mouse leave
$(".cascadia-dropdown").mouseleave(function () {
  var dropdownMenu = $(this).find(".dropdown-menu");
  dropdownMenu.removeClass("show");

  // Reset icons for all dropdowns
  $(this)
    .find(".cascadia-dropdown .dropdown-toggle i")
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

// Close dropdowns when clicking outside
$(document).on("click", function (e) {
  if (!$(e.target).closest(".cascadia-dropdown").length) {
    $(".cascadia-dropdown .dropdown-menu").removeClass("show");
    $(".cascadia-dropdown .dropdown-toggle i")
      .removeClass("fa-minus")
      .addClass("fa-plus");
  }
});

// Close dropdowns when scrolling
$(document).on("scroll", function () {
  $(".cascadia-dropdown .dropdown-menu").removeClass("show");
  $(".cascadia-dropdown .dropdown-toggle i")
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

// More button script start //
$(window).on("resize", function () {
  checkNavWidth();
});

$(document).ready(function () {
  // Function to check and adjust the navigation width
  function checkNavWidth() {
    // Your existing checkNavWidth function logic
  }

  checkNavWidth(); // Call the function initially

  // Toggle dropdown visibility when more button is clicked
  $(document).on("click", ".more-button", function (e) {
    e.stopPropagation(); // Prevent document click event from closing the dropdown
    $("#dropdownMenu").toggle();

    // Change the color of the more button when the dropdown is open
    if ($("#dropdownMenu").is(":visible")) {
      $(".more-button").addClass("active");
    } else {
      $(".more-button").removeClass("active");
    }
  });

  // Close dropdown when clicking outside of it
  $(document).on("click", function () {
    $("#dropdownMenu").hide();
    $(".more-button").removeClass("active"); // Reset color when closing dropdown
  });

  // Prevent closing the dropdown when clicking inside it
  $(document).on("click", ".custom-dropdown-menu", function (e) {
    e.stopPropagation();
  });

  // Additional event handler for clicking inside dropdown items
  $(document).on("click", ".custom-dropdown-menu .dropdown-item", function (e) {
    // Handle item click as needed
    // You may want to perform some action when a dropdown item is clicked
    e.stopPropagation();
    // Add your logic here
  });
});

var executeCheckNavWidth = true; // Global flag

function checkNavWidth() {
  if (!executeCheckNavWidth) {
    return; // If the flag is false, do not execute the function
  }

  var originalNavWidth = $(".navbar").width();
  var CalculateNavWidth = originalNavWidth - 600;

  // Adjust parentWidthPercentage based on window width and screen size
  var parentWidthPercentage = 0.6;
  if ($(window).width() > 2020) {
    parentWidthPercentage = 0.1;
    var CalculateNavWidth = originalNavWidth - 1200;
  } else if ($(window).width() > 1920) {
    parentWidthPercentage = 0.1;
    var CalculateNavWidth = originalNavWidth - 1000;
  } else if ($(window).width() > 1820) {
    parentWidthPercentage = 0.3;
    var CalculateNavWidth = originalNavWidth - 900;
  } else if ($(window).width() > 1620) {
    parentWidthPercentage = 0.4;
    var CalculateNavWidth = originalNavWidth - 800;
    
  } 
 else if ($(window).width() > 1280) {
  parentWidthPercentage = 0.6;
  var CalculateNavWidth = originalNavWidth - 600;
} 
  else if ($(window).width() <= 1280) {
    parentWidthPercentage = 0.6;
    var CalculateNavWidth = originalNavWidth - 400;
  } else if ($(window).width() <= 991) {
    parentWidthPercentage = 0.3;
    var CalculateNavWidth = originalNavWidth - 400;
  } else if ($(window).width() <= 820) {
    parentWidthPercentage = 0.6;
    var CalculateNavWidth = originalNavWidth - 400;
  } else {
    parentWidthPercentage = 0.6;
  }

  var breadcrumbItems = $(".breadcrumb-item");
  var hiddenItems = [];
  var totalWidth = 0;
  // Reset the visibility of all items
  breadcrumbItems.show();

  breadcrumbItems.each(function () {
    totalWidth += $(this).outerWidth(true);

    if (totalWidth > CalculateNavWidth) {
      var clonedItem = $(this).clone();
      hiddenItems.push(clonedItem);
      $(this).hide();
    }
  });

  if (hiddenItems.length > 0) {
    $(".more-button").show();
  } else {
    $(".more-button").hide();
    $("#dropdownMenu").empty(); // Clear dropdown if not needed
  }

  // Populate the accordion-style dropdown with hidden items
  var accordion = $('<div class="accordion" id="accordionMenu"></div>');
  $(".custom-dropdown-menu").empty().append(accordion);

  if (hiddenItems.length > 0) {
    hiddenItems.forEach(function (item, index) {
      var collapseId = "collapse" + index;

      // Create a new accordion item
      var accordionItem =
        '<div class="px-2 mb-2">' +
        '<div class="casc-accordion-item" id="heading' +
        index +
        '">' +
        '<button class="p-0 accordion-toggle d-flex justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#' +
        collapseId +
        '" aria-expanded="true""' +
        collapseId +
        '">' +
        item.html() +
        "</button>" +
        "</div>" +
        '<div id="' +
        collapseId +
        '" class="collapse" aria-labelledby="heading' +
        index +
        '" data-bs-parent="#accordionMenu">' +
        '<div class="card-body">' +
        item.find(".dropdown-menu").html() +
        "</div>" +
        "</div>" +
        "</div>";

      accordion.append(accordionItem);
    });

    // Refresh Bootstrap's collapse functionality
    $("#accordionMenu .accordion-toggle").click(function () {
      var target = $(this).data("target");
      $(target).collapse("toggle");

      // Toggle the icon between fa-plus and fa-minus for the clicked dropdown
      var icon = $(this).find("i");
      icon.toggleClass("fa-plus fa-minus");

      // Reset icons for all other dropdowns
      $("#accordionMenu .accordion-toggle i")
        .not(icon)
        .removeClass("fa-minus")
        .addClass("fa-plus");
    });
  }
}

$(document).ready(function () {
  $(window).scroll(function () {
    // Get the scroll position
    var scrollPosition = $(this).scrollTop();

    // Get the fixed element
    var fixedElement = $(".cascadia-header");

    // Check if the scroll position is greater than 0
    if (scrollPosition > 0) {
      // Update the style when scrolled
      fixedElement.css({
        position: "fixed",
        top: "0",
      });
    } else {
      // Reset the style when at the top
      fixedElement.css({
        position: "",
        // Add other styles as needed
      });
    }
  });
});
