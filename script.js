/* =========================
   LANGUAGE SWITCH
========================= */

function changeLanguage(language) {

    const elements = document.querySelectorAll("[data-el]");

    elements.forEach(element => {

        if (language === "en") {

            element.innerHTML = element.dataset.en;

        } else {

            element.innerHTML = element.dataset.el;

        }

    });

}


/* =========================
   SECTION / CARD ANIMATION
========================= */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});


/*
   Animate cards when they enter
   the viewport.
*/
document.querySelectorAll(".card")
.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(50px)";

    element.style.transition = "0.8s";

    observer.observe(element);

});


/* =========================
   PROJECTS SLIDESHOW
========================= */

const slideshow = document.getElementById("slideshow");

const slides = document.querySelectorAll(".slide");

const nextButton = document.getElementById("next");

const previousButton = document.getElementById("prev");


/*
   Only run slideshow code if the
   slideshow exists on the page.
*/
if (slideshow && slides.length > 0) {

    let currentSlide = 0;

    let slideshowTimer = null;


    /* =========================
       SHOW SLIDE
    ========================= */

    function showSlide(index) {

        /*
           Remove active class
           from current image.
        */
        slides[currentSlide].classList.remove("active");


        /*
           Calculate the new slide.
        */
        currentSlide = index;


        /*
           If we go after the last image,
           return to the first.
        */
        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }


        /*
           If we go before the first image,
           go to the last.
        */
        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }


        /*
           Show new image.
        */
        slides[currentSlide].classList.add("active");

    }


    /* =========================
       NEXT SLIDE
    ========================= */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =========================
       PREVIOUS SLIDE
    ========================= */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* =========================
       START AUTOPLAY
    ========================= */

    function startSlideshow() {

        /*
           Clear previous timer first.
           This prevents multiple timers
           running at the same time.
        */
        clearInterval(slideshowTimer);


        /*
           Change image every 5 seconds.
        */
        slideshowTimer =
            setInterval(nextSlide, 5000);

    }


    /* =========================
       STOP AUTOPLAY
    ========================= */

    function stopSlideshow() {

        clearInterval(slideshowTimer);

    }


    /* =========================
       NEXT BUTTON
    ========================= */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();

            /*
               Restart the 5-second timer
               after manual navigation.
            */
            startSlideshow();

        });

    }


    /* =========================
       PREVIOUS BUTTON
    ========================= */

    if (previousButton) {

        previousButton.addEventListener("click", () => {

            previousSlide();

            /*
               Restart the 5-second timer
               after manual navigation.
            */
            startSlideshow();

        });

    }


    /* =========================
       PAUSE ON HOVER
    ========================= */

    slideshow.addEventListener(
        "mouseenter",
        stopSlideshow
    );


    slideshow.addEventListener(
        "mouseleave",
        startSlideshow
    );


    /* =========================
       KEYBOARD NAVIGATION
    ========================= */

    document.addEventListener("keydown", event => {

        /*
           Right arrow
        */
        if (event.key === "ArrowRight") {

            nextSlide();

            startSlideshow();

        }


        /*
           Left arrow
        */
        if (event.key === "ArrowLeft") {

            previousSlide();

            startSlideshow();

        }

    });


    /* =========================
       START SLIDESHOW
    ========================= */

    startSlideshow();

}