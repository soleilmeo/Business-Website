console.log("nav.js active")

// THERE IS ONLY ONE NAVIGATION BAR

let nav = "body nav.navbar"
let nav_toggler = ".navbar .navbar-toggler"
let my_nav = "#my-nav"

$(document).ready(function() {
    if($(window).scrollTop() === 0) {
        $(nav).removeClass("navbar-not-on-top")
        $(nav).addClass("navbar-on-top")
    } else {
        $(nav).removeClass("navbar-on-top")
        $(nav).addClass("navbar-not-on-top")
    }

    $(document).scroll(function() { 
        if($(window).scrollTop() === 0) {
            $(nav).removeClass("navbar-not-on-top")
            $(nav).addClass("navbar-on-top")
        } else {
            $(nav).removeClass("navbar-on-top")
            $(nav).addClass("navbar-not-on-top")
        }
     });
    
     $(nav_toggler).click(function (e) {
        if ($(nav_toggler).attr("aria-expanded") === "true") {
            $(nav).removeClass("navbar-burger-menu-shown")
        } else {
            $(nav).addClass("navbar-burger-menu-shown")
        }
     });

})