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
        header.classList.add('scale-y-90');
    } else {
        header.classList.remove('scale-y-90')
    }
});


// NAV BAR

const navLinks = Array.from(document.querySelectorAll('#navbar > a'));
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.dataset.section;
        if (!id) return;

        const activeLink = document.querySelector(`[data-link="${id}"]`);
        if (!activeLink) return;

        if (entry.isIntersecting) {
            document.querySelectorAll('[data-link]').forEach(link => link.classList.remove('active'));

            activeLink.classList.add('active');
        }
    });
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

const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');
const mobileCards = Array.from(document.getElementsByClassName('mobile-service-card'));

const transformPercentages = [50, 48, 46, 44, 42, 40];
const opacities = [100, 90, 70, 50, 30, 10];
let servicesIndex = 0;

function getAllTranforms(element) {
    const classes = Array.from(element.classList);
    const transforms = classes.filter(cls => cls.startsWith('-translate'));
    return transforms;
};

function getAllOpacities(element) {
    const classes = Array.from(element.classList);
    const opacities = classes.filter(cls => cls.startsWith('opacity'));
    return opacities;
};

leftArrow.inert = true;

rightArrow.addEventListener('click', () => {
    ++servicesIndex;
    leftArrow.classList.remove('opacity-0');
    leftArrow.inert = true;
    rightArrow.inert = true;
    setTimeout(() => {
        leftArrow.inert = false;
        rightArrow.inert = false;
    }, 500);
    if (servicesIndex >= mobileCards.length - 1) {
        mobileCards[servicesIndex - 1].classList.add('-translate-y-[400dvh]');
        mobileCards[servicesIndex].classList.add('-translate-y-[50%]', 'opacity-100');
        rightArrow.classList.add('opacity-0');
        rightArrow.inert = true;
    } else {
        mobileCards[servicesIndex - 1].classList.add('-translate-y-[400dvh]');
        const sliced = mobileCards.slice(servicesIndex);
        sliced.forEach((card, index) => card.classList.add(`-translate-y-[${transformPercentages[index]}%]`, `opacity-${opacities[index]}`));
    };
});

leftArrow.addEventListener('click', () => {
    --servicesIndex;
    rightArrow.inert = true;
    leftArrow.inert = true;
    setTimeout(() => {
        leftArrow.inert = false;
        rightArrow.inert = false;
    }, 500);
    rightArrow.classList.remove('opacity-0');
    if (servicesIndex <= 0) {
        leftArrow.classList.add('opacity-0');
        leftArrow.inert = true;
    };
    mobileCards[servicesIndex].classList.remove('-translate-y-[400dvh]');
    const sliced = mobileCards.slice(servicesIndex + 1);
    sliced.forEach(card => {
        const transforms = getAllTranforms(card);
        const opacities = getAllOpacities(card);
        card.classList.remove(...transforms.slice(transforms.length - 1,), ...opacities.slice(opacities.length - 1));
    });
});

// PORTFOLIO

const carouselTop = document.getElementById('carousel-top');
const carouselBottom = document.getElementById('carousel-bottom');
const videos = document.querySelectorAll('video');
videos.forEach(video => video.muted = true)

window.addEventListener('load', () => {
    if (window.innerWidth <= 640) {
        window.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('carousel-vid')) {
                carouselTop.classList.add('paused');
                carouselBottom.classList.add('paused');
                videos.forEach(video => video.pause());
                videos.forEach(video => video.classList.remove('scale-110'));
                e.target.play();
                e.target.classList.add('scale-110');
            } else {
                carouselTop.classList.remove('paused');
                carouselBottom.classList.remove('paused');
                videos.forEach(video => video.pause());
                videos.forEach(video => video.classList.remove('scale-110'));
            };
        });
    } else {
        window.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('carousel-vid')) {
                carouselTop.classList.add('paused');
                carouselBottom.classList.add('paused');
                e.target.preload = "auto";
                e.target.load();
                const playPromise = e.target.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        e.target.addEventListener("canplay", () => {
                            e.target.play();
                        }, { once: true });
                    });
                }
            };
        });

        window.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('carousel-vid')) {
                carouselTop.classList.remove('paused');
                carouselBottom.classList.remove('paused');
                e.target.pause();
            };
        });
    };
});

const inputs = document.querySelectorAll("#contact-form input");

inputs.forEach(input => input.addEventListener("input", (e) => {
    if (e.target.value.trim() !== "") {
        e.target.classList.remove("input-error");
    } else {
        e.target.classList.add("input-error");
    };
}));

const form = document.querySelector("#contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = [
      { id: "nome" },
      { id: "email" },
      { id: "cidade" },
      { id: "empresa" }
    ];

    let hasError = false;

    fields.forEach(({ id }) => {
      const input = document.getElementById(id);

        if (!input.value.trim()) {
            hasError = true;
            input.classList.add("input-error");
        } else {
            input.classList.add("border-gray-300");
        };
    });

    if (hasError) return;

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cidade = document.getElementById("cidade").value;
    const empresa = document.getElementById("empresa").value;

    const mensagem = `Olá! Vim pelo site e tenho interesse em marketing digital para crescimento da minha empresa.

    Nome: ${nome}
    Email: ${email}
    Cidade: ${cidade}
    Empresa: ${empresa}

    Fico no aguardo para conversarmos melhor.`;

    const numero = "5511999999999";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});
