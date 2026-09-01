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

// const presentWrapper = document.querySelector("#icons-wrapper");
// const presentTrack = document.querySelector("#track");
// const presentSlides = document.querySelectorAll(".vision");

// let presentIndex = 0;

// function presentMoveToSlide() {
//     if (presentIndex === 0) {
//         presentTrack.style.transform = 'translateX(0)'
//     } else {
//         const slide = presentSlides[presentIndex];

//         const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
//         const wrapperCenter = presentWrapper.clientWidth / 2;

//         const offset = slideCenter - wrapperCenter;

//         track.style.transform = `translateX(-${offset}px)`;
//     };
// };

// setInterval(() => {
//     presentIndex++;
//     if (presentIndex >= presentSlides.length) {
//         presentIndex = 0;
//     };
//     presentMoveToSlide();
// }, 5000);


// SERVICES SWIPING

const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');
const mobileCards = Array.from(document.getElementsByClassName('mobile-service-card'));
const transformOffsets = [0, 10, 16, 20, 23, 25]; // px, profundidade da pilha
const opacities = [100, 90, 70, 50, 30, 10];
let servicesIndex = 0;

function getAllTranforms(element) {
    const classes = Array.from(element.classList);
    return classes.filter(cls => cls.startsWith('-translate'));
};
function getAllOpacities(element) {
    const classes = Array.from(element.classList);
    return classes.filter(cls => cls.startsWith('opacity'));
};

leftArrow.inert = true;

rightArrow.addEventListener('click', () => {
    if (servicesIndex >= mobileCards.length - 1) {
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

    // joga o card de cima pra cima e some
    const thrownCard = mobileCards[servicesIndex - 1];
    const thrownOldOpacities = getAllOpacities(thrownCard);
    thrownCard.classList.remove(...thrownOldOpacities);
    thrownCard.classList.add('-translate-y-[400dvh]', 'opacity-0');

    if (servicesIndex >= mobileCards.length - 1) {
        const oldTransforms = getAllTranforms(mobileCards[servicesIndex]);
        const oldOpacities = getAllOpacities(mobileCards[servicesIndex]);
        mobileCards[servicesIndex].classList.remove(...oldTransforms, ...oldOpacities);
        mobileCards[servicesIndex].classList.add('-translate-y-[0px]', 'opacity-100');
        rightArrow.classList.add('opacity-0');
        rightArrow.inert = true;
    } else {
        const sliced = mobileCards.slice(servicesIndex);
        sliced.forEach((card, index) => {
            const oldTransforms = getAllTranforms(card);
            const oldOpacities = getAllOpacities(card);
            card.classList.remove(...oldTransforms, ...oldOpacities);
            card.classList.add(`-translate-y-[${transformOffsets[index]}px]`, `opacity-${opacities[index]}`);
        });
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

    const returningCard = mobileCards[servicesIndex];
    returningCard.classList.remove('-translate-y-[400dvh]', 'opacity-0');
    returningCard.classList.add('-translate-y-[0px]', 'opacity-100');

    const sliced = mobileCards.slice(servicesIndex + 1);
    sliced.forEach(card => {
        const transforms = getAllTranforms(card);
        const opacities = getAllOpacities(card);
        card.classList.remove(...transforms.slice(transforms.length - 1), ...opacities.slice(opacities.length - 1));
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
const carouselBottom = document.getElementById('carousel-bottom');
const videos = document.querySelectorAll('.carousel-vid');
let activeVideo = null;

videos.forEach(video => video.muted = true);

function pauseCarousel() {
    carouselBottom.classList.add('paused');
}

function resumeCarousel() {
    carouselBottom.classList.remove('paused');
}

function resetOtherVideos(except) {
    videos.forEach(video => {
        if (video !== except) {
            video.pause();
            video.currentTime = 0;
            video.classList.remove('scale-110');
            video.load();
        }
    });
}

function playVideo(video) {
    activeVideo = video;
    pauseCarousel();
    resetOtherVideos(video);
    video.classList.add('scale-110');
    video.load(); // garante que o buffer comece, já que preload="none"
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            video.addEventListener('canplay', () => {
                if (activeVideo === video) video.play();
            }, { once: true });
        });
    }
}

function stopVideo(video) {
    video.pause();
    video.currentTime = 0;
    video.classList.remove('scale-110');
    video.load();
    if (activeVideo === video) {
        activeVideo = null;
        resumeCarousel();
    }
}

window.addEventListener('load', () => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    videos.forEach(video => {
        if (isTouch) {
            video.addEventListener('click', () => {
                video.paused ? playVideo(video) : stopVideo(video);
            });
        } else {
            video.addEventListener('mouseenter', () => playVideo(video));
            video.addEventListener('mouseleave', () => stopVideo(video));
        }
    });

    if (isTouch) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.carousel-vid')) {
                resetOtherVideos(null);
                activeVideo = null;
                resumeCarousel();
            }
        });
    }
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

function initSectionFadeIn() {
  const sections = document.querySelectorAll('[data-section]');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // anima só uma vez
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    sections.forEach((section) => observer.observe(section));
};

document.addEventListener('DOMContentLoaded', initSectionFadeIn);
