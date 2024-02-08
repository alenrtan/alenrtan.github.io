document.getElementById("dark-light").onclick = function(){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    
    const lightmode = window.sessionStorage.getItem("dark-light") == "true";
    window.sessionStorage.setItem("dark-light", !lightmode);
};

const darkMode = window.sessionStorage.getItem("dark-light");
if (darkMode == "true"){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
}