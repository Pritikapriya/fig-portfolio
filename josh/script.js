// ############################ Smooth scrolling for anchor links ############################ 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offset = window.innerWidth < 768 ? 30 : 50;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

//############################  Reccomendations slider setup ############################//
const slider = document.querySelector('.testimonial-slider');
const wrapper = document.querySelector('.testimonial-wrapper');
const cards = Array.from(document.querySelectorAll('.testimonial-card'));
const dots = Array.from(document.querySelectorAll('.dot'));

let currentSlide = 1; 

const firstCard = cards[0].cloneNode(true);
const lastCard = cards[cards.length - 1].cloneNode(true);

wrapper.appendChild(firstCard); 
wrapper.insertBefore(lastCard, cards[0]); 

const allCards = Array.from(document.querySelectorAll('.testimonial-card')); 
const totalSlides = allCards.length;

function getSlideWidth() {
    return allCards[0].offsetWidth;
}

function updateSliderPosition() {
    const slideWidth = getSlideWidth();
    wrapper.style.transform = `translateX(-${slideWidth}px)`;
}

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    currentSlide = index;
    const slideWidth = getSlideWidth();
    const slideOffset = slideWidth * (currentSlide + 1);

    wrapper.style.transition = 'transform 0.5s ease-in-out';
    wrapper.style.transform = `translateX(-${slideOffset}px)`;

    dots.forEach((dot, i) => {
        if (i === (currentSlide - 1) % (totalSlides - 2)) { 
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    //############################ Reset position when reaching the cloned slides ############################//
    if (currentSlide === 0) {
        setTimeout(() => {
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-${getSlideWidth() * (totalSlides - 2)}px)`;
            currentSlide = totalSlides - 2; 
        }, 500); 
    } else if (currentSlide === totalSlides - 1) {
        setTimeout(() => {
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-${getSlideWidth()}px)`;
            currentSlide = 1; 
        }, 500); 
    }
}

//############################  Event listener for dot clicks ############################//
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index + 1); 
    });
});


if (allCards.length > 0 && dots.length > 0) {
    updateSliderPosition(); 
    goToSlide(currentSlide);
}

window.addEventListener('resize', updateSliderPosition);

//######################################### ADD SKILLS SECTION #############################################//


const modal = document.getElementById("addSkillModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.getElementsByClassName("close")[0];
const addSkillBtn = document.getElementById("addSkill");
const cancelSkillBtn = document.getElementById("cancelSkill");
const skillList = document.getElementById("skillList");


openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}


addSkillBtn.onclick = function() {
    const domain = document.getElementById("domain").value;
    const skill = document.getElementById("skill1").value;
    const proficiency = document.getElementById("proficiency1").value;

    if (domain && skill && proficiency) {
        const skillItem = document.createElement("div");
        skillItem.classList.add("skill-item");
        skillItem.innerHTML = `
            <h3>${domain}</h3>
            <p>${skill} - ${proficiency}%</p>
        `;
        skillList.appendChild(skillItem);

        document.getElementById("domain").value = "";
        document.getElementById("skill1").value = "";
        document.getElementById("proficiency1").value = "";
        modal.style.display = "none";
    } else {
        alert("Please fill in all fields");
    }
}

//############################  Close modal when clicking outside of the modal content ############################//
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function centerModal() {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
        const windowHeight = window.innerHeight;
        const modalHeight = modalContent.offsetHeight;
        modalContent.style.marginTop = `${(windowHeight - modalHeight) / 2}px`;
    }
}

window.addEventListener('resize', centerModal);
centerModal(); 

/*########################################## Form Submission #################################################*/

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        //############################  Form validation ############################//
        if (name === "" || email === "") {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("Name: " + name);
        console.log("Email: " + email);
        console.log("Subject: " + subject);
        console.log("Message: " + message);
        alert("Your message has been sent successfully!");

        //############################ Clear the form after submission ############################//
        form.reset();
    });
});
