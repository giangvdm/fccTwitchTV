var filterMenuIsShown = true;

var Responsive = {
    responsiveFilterMenu() {
        if ($(window).width() <= 360) {
            $(".filter").removeClass("filter--show");
            $(".filter").addClass("filter--hide");
            filterMenuIsShown = false;
        }
        else {
            $(".filter").removeClass("filter--hide");
            $(".filter").addClass("filter--show");
            filterMenuIsShown = true;
        }
    },
    toggleFilterMenu() {
        if (!filterMenuIsShown) {
            $(".filter").removeClass("filter--hide");
            $(".filter").addClass("filter--show");
            filterMenuIsShown = true;
        }
        else {
            $(".filter").removeClass("filter--show");
            $(".filter").addClass("filter--hide");
            filterMenuIsShown = false;
        }
    }
}

// First time call
Responsive.responsiveFilterMenu();
// Add event listener
$(window).on("resize", function () {
    Responsive.responsiveFilterMenu();
});

$(".header__responsive-filter-menu").on("click", function () {
    Responsive.toggleFilterMenu();
});