const knowMoreBtn = document.getElementById('know-more');
const knowMoreArrow = document.getElementById('arrow-down');
const knowMoreText = document.getElementById('know-more-text');

knowMoreBtn.addEventListener('pointerenter', () => {
    knowMoreArrow.classList.toggle('-translate-y-48');
    knowMoreArrow.classList.toggle('-translate-y-1/2');
    knowMoreText.classList.toggle('translate-y-24');
});

knowMoreBtn.addEventListener('pointerleave', () => {
    knowMoreArrow.classList.toggle('-translate-y-48');
    knowMoreArrow.classList.toggle('-translate-y-1/2');
    knowMoreText.classList.toggle('translate-y-24');
});