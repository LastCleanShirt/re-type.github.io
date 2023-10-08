import { settings, setTheme } from "./settings.js";

/* Settings button*/

$(() => {
    // UI
    const settingsButton = $(".settings img") 
    settingsButton.click(function(e) {
        settingsButton.addClass("buttonPressed")
        settingsButton.on("animationend", () => { 
            settingsButton.removeClass("buttonPressed") 

            $('body').addClass("fadeOut")
            $("body").on("animationend", () => {
                setTimeout(function() { 
                    window.location.href = "settings.html"
                }, 1000)
            })
        })
    })
})