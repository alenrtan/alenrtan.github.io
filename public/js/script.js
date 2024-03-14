// makes sure to activate dark/light mode when button is clicked
document.getElementById("dark-light").onclick = function(){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    
    const lightmode = window.sessionStorage.getItem("dark-light") == "true";
    window.sessionStorage.setItem("dark-light", !lightmode);
    console.log("I have been clicked; Dark Mode should be activated");
};

// this "stores" whether dark/light mode is active - then uses that mode through out all pages (for current session)
const darkMode = window.sessionStorage.getItem("dark-light");
if (darkMode == "true"){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
}

//make sure the hamburger menu (ty w3schools) works


function burgerMenu() {
    var linksContainer = document.querySelectorAll(".links");

    linksContainer.forEach(function(container) {
        if (container.style.display === "block"){
            container.style.display = "none";
        }else{
            container.style.display = "block";
        }
    });
}// end burgerMenu()

