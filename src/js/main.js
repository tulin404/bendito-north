const hamMenuBtn = document.getElementById('ham-menu-btn');
const hamMenu = document.getElementById('ham-menu');
const overlay = document.getElementById('overlay');
const benditoImg = document.getElementById('header-logo');
const header = document.querySelector('header');


// HAM MENU

hamMenuBtn.addEventListener('click', () => {
    hamMenuBtn.classList.toggle('active');
    hamMenu.classList.toggle('-translate-x-[100dvw]');
    overlay.classList.toggle('hidden');
    benditoImg.classList.toggle('opacity-50');
    document.documentElement.classList.toggle('overflow-hidden');
    if (header.classList.contains('scale-y-85')) {
        header.classList.remove('scale-y-85');
    };
});

if (window.innerWidth <= 640) {
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('ham-link')) {
            hamMenuBtn.classList.toggle('active');
            hamMenu.classList.toggle('-translate-x-[100dvw]');
            overlay.classList.toggle('hidden');
            benditoImg.classList.toggle('opacity-50');
            document.documentElement.classList.toggle('overflow-hidden');
            if (header.classList.contains('scale-y-85')) {
                header.classList.remove('scale-y-85');
            };
        };
    });
};

if (innerWidth > 640) {
    hamMenu.inert = true;
};


// HEADER SCALE

window.addEventListener('scroll', () => {
    if (scrollY > 0) {
        header.classList.add('scale-y-85');
    } else {
        header.classList.remove('scale-y-85')
    }
});


// NAV BAR

const navLinks = Array.from(document.querySelectorAll('#navbar > a'));
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = Array.from(sections).indexOf(entry.target);

        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        } else {
            navLinks[index].classList.remove('active');
        }
    })
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));


// PRESENT SLIDES

const wrapper = document.querySelector("#icons-wrapper");
const track = document.querySelector("#track");
const slides = document.querySelectorAll(".vision");

let presentIindex = 0;

function moveToSlide() {
    if (presentIindex === 0) {
        track.style.transform = 'translateX(0)'
    } else {
        const slide = slides[presentIindex];
    
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const wrapperCenter = wrapper.clientWidth / 2;
    
        const offset = slideCenter - wrapperCenter;
    
        track.style.transform = `translateX(-${offset}px)`;
    };
};

setInterval(() => {
    presentIindex++;
    if (presentIindex >= slides.length) {
        presentIindex = 0;
    };
    moveToSlide();
}, 5000);


// SERVICES SWIPING
const leftArrow = document.getElementById('left-right');
const rightArrow = document.getElementById('arrow-right');
const mobileCards = Array.from(document.getElementsByClassName('mobile-service-card'));

const transformPercentages = [50, 48, 46, 44, 42, 40];
let servicesIndex = 0;

rightArrow.addEventListener('click', () => {
    if (++servicesIndex >= mobileCards.length - 1) {
        mobileCards[servicesIndex - 1].classList.add('-translate-y-[110dvh]');
        setTimeout(() => {
            mobileCards[servicesIndex].classList.add('-translate-y-[50%]')
        }, 600)
        rightArrow.classList.add('hidden');
    } else {
        mobileCards[servicesIndex - 1].classList.add('-translate-y-[110dvh]');
        setTimeout(() => {
            console.log(servicesIndex)
            const sliced = mobileCards.slice(servicesIndex);
            console.log(sliced);
            sliced.forEach((card, index) => card.classList.add(`-translate-y-[${transformPercentages[index]}%]`));
        }, 600)
    };
});