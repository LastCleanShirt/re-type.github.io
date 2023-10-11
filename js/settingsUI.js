import { setIdLang, setEnLang } from "./languageHandler.js";

$(() => {
    const lang = Cookies.get("lang")

    if (lang === "id") setIdLang()
    else if (lang === "en") setEnLang()

    // All these shit just for a simple effect
    const navTitle = $(".navbar a");
    navTitle.hover(
    function() {
        navTitle.addClass("blurry-text")
        setTimeout(() => {
            navTitle.removeClass("blurry-text")
        }, 100)
        navTitle.text("Re-type")
        
    }, function() {
        navTitle.addClass("blurry-text")
        setTimeout(() => {
            navTitle.removeClass("blurry-text")
        }, 100)
        if (lang === "id") navTitle.text("Pengaturan")
        else if (lang === "en") navTitle.text("Settings")
        
    })
})