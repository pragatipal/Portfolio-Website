window.addEventListener("load", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    // Page Loader
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".page-loader").style.display ="none";
    },600)
});

/*----------------------
Toggle Navbar
------------------------ */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar() {
    document.querySelector(".header").classList.toggle("active");
}
/*----------------------
Active Section
------------------------ */
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(()=>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500);
    }
});

/*----------------------
About Tabs
------------------------ */
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click",(e) =>{
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const targetTab  = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(targetTab).classList.add("active");

    };
});

/*---------------------------
Portfolio Item Details Popup
-----------------------------*/

document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
});
function togglePortfolioPopup(_params) {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle
    ("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}

// hide portfolio popup when clicked close btn
document.querySelector(".pp-close-btn").addEventListener("click", togglePortfolioPopup);

// hide portfolio popup when clicked outside of it
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner") && !e.target.classList.contains("pp-content")){
        togglePortfolioPopup();
    }
});
// ------------------------------------

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
    
}

// Contact form

var form = document.getElementById("contact-form");
form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(_response => {
        status.classList.add("success");
        status.classList.remove("hidden");
        status.innerHTML = "Message sent successfully!";
        form.reset();
        setTimeout(() => {
            status.classList.remove("success");
            status.classList.add("hidden");
        }, 4000);
    }).catch(_error => {
        status.classList.add("error");
        status.classList.remove("hidden");
        status.innerHTML = "Oops! There was a problem. Please reload and try again.";
        setTimeout(() => {
            status.classList.remove("error");
            status.classList.add("hidden");
        }, 4000);
    });
}

