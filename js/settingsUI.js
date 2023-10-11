import { setIdLang, setEnLang } from "./languageHandler.js";

$(() => {
    const lang = Cookies.get("lang")
    const languageOption = $("#language")

    if (lang === "id") { 
        setIdLang()
    } else if (lang === "en") { 
        setEnLang()
    }

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

    /*
     * Detect if the option changes
     */
    languageOption.change(() => {
        var selectedVal = languageOption.text()
        var selectedText = languageOption.find('option:selected').text()
        var selectedTextClass = languageOption.find('option:selected').attr("class")
        console.log('Selected Value: ' + selectedVal);
        console.log('Selected Text: ' + selectedText);

        if (selectedText === "Bahasa Indonesia") Cookies.set("lang", "id")
        else if (selectedText === "English") Cookies.set("lang", "en")
    
        location.href = location.href
        
    })
})