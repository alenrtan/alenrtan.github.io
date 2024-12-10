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

// code for auto scrolling
let autoScrollInterval;
const scrollContainer = document.querySelector('.data-container-carousel');

function startAutoScroll(){
    let setTime = 3000;
    let imageNumber = 1;

    autoScrollInterval = setInterval(() => {
        imageNumber++
        if (imageNumber > 4) {
            imageNumber = 0; // reset 
        }


        const imageID = document.getElementById(`img-${imageNumber}`)
        if (imageID) {
            imageID.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            })
        }
    

}, setTime)
}


function stopAutoScroll(){
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    console.log("attempting to stop scroll...")
}

startAutoScroll();

// auto stop after passing
// this is done since it'll keep pushing the user back to the images 
window.addEventListener("scroll", () =>{
    const carousel = scrollContainer.getBoundingClientRect();

    if (carousel.bottom >= 0 && carousel.top <= window.innerHeight && !autoScrollInterval){
        startAutoScroll();
    }else if (carousel.bottom < 0 || carousel.top > window.innerHeight){
        stopAutoScroll();
    }

    
})