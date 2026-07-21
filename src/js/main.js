const hamMenuBtn = document.getElementById('ham-menu-btn');
const hamMenu = document.getElementById('ham-menu');
const overlay = document.getElementById('overlay');
const benditoImg = document.getElementById('header-logo');
const header = document.querySelector('header');
const app = document.querySelector("#app");

// HAM MENU

let isMenuOpen = false;

function openMenu() {
    isMenuOpen = true;

    hamMenuBtn.classList.add('active');
    hamMenu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    benditoImg.classList.add('opacity-50');
    document.documentElement.classList.add('overflow-hidden');

    app.setAttribute('inert', '');
    header.classList.remove('scale-y-85');
}

function closeMenu() {
    isMenuOpen = false;

    hamMenuBtn.classList.remove('active');
    hamMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    benditoImg.classList.remove('opacity-50');
    document.documentElement.classList.remove('overflow-hidden');

    app.removeAttribute('inert');
    header.classList.remove('scale-y-85');
}

hamMenuBtn.addEventListener('click', () => {
    isMenuOpen ? closeMenu() : openMenu();
});

hamMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));


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

const presentWrapper = document.querySelector("#icons-wrapper");
const presentTrack = document.querySelector("#track");
const presentSlides = document.querySelectorAll(".vision");

let presentIndex = 0;

function presentMoveToSlide() {
    if (presentIndex === 0) {
        presentTrack.style.transform = 'translateX(0)'
    } else {
        const slide = presentSlides[presentIndex];
    
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const wrapperCenter = presentWrapper.clientWidth / 2;
    
        const offset = slideCenter - wrapperCenter;
    
        track.style.transform = `translateX(-${offset}px)`;
    };
};

setInterval(() => {
    presentIndex++;
    if (presentIndex >= presentSlides.length) {
        presentIndex = 0;
    };
    presentMoveToSlide();
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
    if (servicesIndex >= mobileCards.length -1) {
        rightArrow.inert = true;
        return;
    };
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
    if (servicesIndex <= 0) {
        leftArrow.inert = true;
        return;
    };
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

// TESTIMONIALS
const testimonialsWrapper = document.querySelector("#testimonials-wrapper");
const testimonialTrack = document.querySelector("#testimonials-track");
const spacerStart = document.querySelector("#spacer-start");
const spacerEnd = document.querySelector("#spacer-end");

let interval;
const gap = 24;

function getRealCards() {
    return [...testimonialTrack.children].filter(
        (el) => el.id !== "spacer-start" && el.id !== "spacer-end"
    );
}

function updateSpacers() {
    const cards = getRealCards();
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const wrapperWidth = testimonialsWrapper.clientWidth;
    const spacerWidth = Math.max((wrapperWidth - cardWidth) / 2 - gap, 0);

    spacerStart.style.width = `${spacerWidth}px`;
    spacerEnd.style.width = `${spacerWidth}px`;

    testimonialsWrapper.scrollLeft = 0;
}

function highlightCenterCard() {
    const wrapperRect = testimonialsWrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;
    let closest = null;
    let closestDist = Infinity;

    for (const card of getRealCards()) {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < closestDist) {
            closestDist = dist;
            closest = card;
        }
    }

    for (const card of getRealCards()) {
        card.classList.remove("-translate-y-4");
    }
    if (closest) closest.classList.add("-translate-y-4");
}

function nextSlide() {
    const cards = getRealCards();
    const cardWidth = cards[0].offsetWidth + gap;
    const maxScroll = testimonialsWrapper.scrollWidth - testimonialsWrapper.clientWidth;
    let target = testimonialsWrapper.scrollLeft + cardWidth;

    if (target >= maxScroll - 5) {
        target = 0;
    }
    testimonialsWrapper.scrollTo({ left: target, behavior: "smooth" });
}

function startCarousel() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
    clearInterval(interval);
}

testimonialsWrapper.addEventListener("mouseenter", stopCarousel);
testimonialsWrapper.addEventListener("mouseleave", startCarousel);
testimonialsWrapper.addEventListener("touchstart", stopCarousel, { passive: true });
testimonialsWrapper.addEventListener("touchend", () => setTimeout(startCarousel, 1500), { passive: true });

let scrollTimeout;
testimonialsWrapper.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(highlightCenterCard, 100);
}, { passive: true });

window.addEventListener("resize", updateSpacers);

let isDown = false;
let startX;
let scrollLeftStart;

testimonialsWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    testimonialsWrapper.classList.add("cursor-grabbing");
    startX = e.pageX - testimonialsWrapper.offsetLeft;
    scrollLeftStart = testimonialsWrapper.scrollLeft;
    stopCarousel();
});

testimonialsWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    testimonialsWrapper.classList.remove("cursor-grabbing");
});

testimonialsWrapper.addEventListener("mouseup", () => {
    isDown = false;
    testimonialsWrapper.classList.remove("cursor-grabbing");
    setTimeout(startCarousel, 1500);
});

testimonialsWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialsWrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    testimonialsWrapper.scrollLeft = scrollLeftStart - walk;
});

testimonialsWrapper.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        testimonialsWrapper.scrollLeft += e.deltaY;
        stopCarousel();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            highlightCenterCard();
            startCarousel();
        }, 1000);
    }
}, { passive: false });

updateSpacers();
highlightCenterCard();
startCarousel();

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
