const hamMenuBtn = document.getElementById('ham-menu-btn');
const hamMenu = document.getElementById('ham-menu');

hamMenuBtn.addEventListener('click', () => {
    hamMenuBtn.classList.toggle('active');
    hamMenu.classList.toggle('active');
    hamMenu.classList.toggle('-translate-x-[100dvw]');
    document.documentElement.classList.toggle('op-blur');
});

if (innerWidth > 640) {
    hamMenu.inert = true;
}

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (scrollY > 0) {
        header.classList.add('scale-y-85');
    } else {
        header.classList.remove('scale-y-85')
    }
});

const wrapper = document.querySelector("#icons-wrapper");
const track = document.querySelector("#track");
const slides = document.querySelectorAll(".vision");

let index = 0;

function moveToSlide() {
    if (index === 0) {
        track.style.transform = 'translateX(0)'
    } else {
        const slide = slides[index];
    
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const wrapperCenter = wrapper.clientWidth / 2;
    
        const offset = slideCenter - wrapperCenter;
    
        track.style.transform = `translateX(-${offset}px)`;
    };
};

setInterval(() => {
    index++;
    if (index >= slides.length) {
        index = 0;
    };
    moveToSlide();
}, 5000);

