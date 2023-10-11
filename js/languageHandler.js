function setIdLang() {
    $(".en-lang").css({"display": "none"})
    $(".id-lang").css({"display": "block"})
    $(".en-lang-inline").css({"display": "none"})
    $(".id-lang-inline").css({"display": "inline-block"})
}

function setEnLang() {
    $(".en-lang").css({"display": "block"})
    $(".id-lang").css({"display": "none"})
}



export { setIdLang, setEnLang }