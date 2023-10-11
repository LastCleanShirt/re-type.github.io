function setIdLang() {
    $(".id-select").insertAfter(".en-select") 
    $(".navbar a").text("Pengaturan")
    $(".left-side h1").text("Bahasa:")
}

function setEnLang() {
    var idSelect = $(".id-select")
    var select = $("select")
    select.empty()
    select.append(`
    <option value="1" class="en-select">English</option>
    <option value="0" class="id-select">Bahasa Indonesia</option>
    `)
    $(".en-select").insertAfter(".id-select")
    $(".navbar a").text("Settings")
    $(".left-side h1").text("Language:")

    
}



export { setIdLang, setEnLang }