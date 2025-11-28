// ===================================
// 1. Initial Setup
// ===================================
emailjs.init("fcXalr6ZVyNtAshZQ"); // 🔑 Ensure this Public Key is correct and the EmailJS library is linked!

let slides = document.querySelectorAll(".slide");
let index = 0;
let autoSlide;

function showSlide() {
   slides.forEach(s => s.classList.remove("active"));
   slides[index].classList.add("active");
}

function resetAutoSlide() {
   clearInterval(autoSlide);
   autoSlide = setInterval(goNext, 3000);
}

function goPrev() {
   index = (index === 0) ? slides.length - 1 : index - 1;
   showSlide();
  resetAutoSlide();
}

function goNext() {
   index = (index === slides.length - 1) ? 0 : index + 1;
  showSlide();
}

if (slides.length > 0) { // Check if slides exist before starting
    slides[0].classList.add("active"); 
    autoSlide = setInterval(goNext, 3000);

    // Attach event listeners to carousel buttons
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    if (prevBtn) prevBtn.addEventListener("click", goPrev);
    if (nextBtn) nextBtn.addEventListener("click", () => {
       goNext();
        resetAutoSlide();
    });
}


// ===================================
// 2. Popup Form Logic (FIXED)
// ===================================
const popup = document.getElementById("popupForm");
const closeBtn = document.querySelector(".close-btn");

// 🛑 FIX: Add handler for the floating button (#openPopup)
const openFloatingPopup = document.getElementById("openPopup"); 
const openQuotePopup = document.getElementById("openQuotePopup");

function openPopup() {
    if (popup) {
        popup.style.display = "flex"; // Show element first
        // Delay adding 'show' slightly to ensure 'display:flex' is applied for transition
        setTimeout(() => { 
            document.body.classList.add("popup-active");
            popup.classList.add("show");
        }, 10);
    }
}

function closePopup(){
 popup.classList.remove("show"); // 1. Start the visual closing animation

  // 🛑 FIX: Allow scrolling immediately, not after a delay.
 document.body.classList.remove("popup-active");

 setTimeout(() => {
 popup.style.display = "none"; // 2. Hide element completely after transition
 }, 500);
}

// Show popup automatically on page load
window.addEventListener("load", () => {
 if (popup) { 
 openPopup();
}
});

// Listener for the "Get a Quote" link/button
if (openQuotePopup) {
openQuotePopup.addEventListener('click', (e) => {
 e.preventDefault();
 openPopup();
});
}
if (openFloatingPopup) {
openFloatingPopup.addEventListener('click', (e) => {
   e.preventDefault();
    openPopup();
   });
}

// Close popup listeners
if (closeBtn) closeBtn.addEventListener("click", closePopup);
window.addEventListener("click", e => {
   if(e.target === popup) closePopup();
});

// ===================================
// 3. EmailJS Submission (Credentials Check)
// ===================================
function sendEmail(){
const templateParms = {
fullname: document.querySelector("#fullname").value,
email: document.querySelector("#email").value,
 phone: document.querySelector("#phone").value,
company: document.querySelector("#company").value,
city: document.querySelector("#city").value,
 state: document.querySelector("#state").value,
 message: document.querySelector("#message").value,
};
 
// 🔑 IMPORTANT: Double-check these IDs in your EmailJS dashboard!
  emailjs.send("service_qtmmh17", "template_79slw7j", templateParms)
    .then(() => {
        alert("Your query has been sent successfully! We will contact you shortly.");
        // Only close and reset on success
        document.getElementById("queryForm").reset();
        closePopup();
    })
     .catch((error) => {
        console.error('EmailJS Error:', error); // Log error for debugging
        alert("There was an error sending your query. Please try again or contact us directly.");
    });
}

// Form submit handler
const queryForm = document.getElementById("queryForm");
if (queryForm) {
queryForm.addEventListener("submit", e => {
e.preventDefault();
sendEmail();
});
}

// ===================================
// 4. Why Choose Us Accordion
// ===================================
document.querySelectorAll('.point-container').forEach(container => {
 const mainPoint = container.querySelector('.main-point');
 if (mainPoint) {
mainPoint.addEventListener('click', function() {
// Toggle the clicked item
 const wasActive = container.classList.contains('active');

// Close all other active items
 document.querySelectorAll('.point-container.active').forEach(otherContainer => {
otherContainer.classList.remove('active');
});

// Open the clicked item if it was not active before
             if (!wasActive) {
                container.classList.add('active');
             }
 });
 }
});
