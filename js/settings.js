function settings() {
    const theme = Cookies.get("theme");
    console.log(`theme: ${theme}`);
} 

function setTheme(theme) {
    Cookies.set("theme", theme);
}

export { settings, setTheme }