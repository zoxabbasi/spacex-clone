const button = document.getElementById('menu-button');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');

// Flag for the scroll, it will be let because we will reasign it later
let scrollStarted = false;

button.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

function navToggle() {
    button.classList.toggle('open');
    overlay.classList.toggle('overlay-show');

    // To remove scrolling form the body
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}

function scrollPage(){
    const scrollPosition = window.scrollY;
    // console.log(scrollPosition);

    if(scrollPosition > 110 && !scrollStarted){
        countUp();

        // Set the scrollStarted to true after the countUp and in the if statment we will check to see if it isn't run yet
        scrollStarted= true
    }else if(scrollPosition < 110 && scrollStarted){
        reset();

        // We need to set it to false to let it run again
        scrollStarted = false;

        // This does reset it but as soon as we scroll the counter starts over, in order to stop it we need a flag,
        // to let it know we have already scrolled orelse it will constantly do that
    }
}

// To reset the counter when we scroll up
function reset(){
     counters.forEach((counter) => counter.innerHTML = '0')
}

function countUp(){
    counters.forEach((counter) => {
        counter.innerText = 0;

        const updateCounter = () => {

            // We want to get the data attrubute on the span elements
            //  This will give us a String, we want it to be a number and we can do that parseInt or Number or use a plus sign
            // const target = Number(counter.getAttribute('data-target'));
            const target = +counter.getAttribute('data-target');
            
            // Now we need to get the current counter value
            const c = +counter.innerText;

            // Create increment
            const increment = target / 100;

            // If counter is less than target, then add an increment
            if(c < target){

                // Round up and set the counter value
                counter.innerText = `${Math.ceil(c + increment)}`;

                // The above will only run once
                setTimeout(updateCounter, 75);

                // This will run the counter as soon as the page loads, we want the counter to run when we scroll down, so we will add an eventListener for scroll
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
};
