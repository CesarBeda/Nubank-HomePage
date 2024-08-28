// script.js
let index = 0;
const cardsToShow = 4; // Número de cards a serem exibidos
const totalCards = document.querySelectorAll('.carousel-cards').length; // Contagem total de cards (considerando duplicação)
const totalSlides = Math.ceil(totalCards / cardsToShow);

console.log('cards = '+totalCards);


function updateCarousel() {
    const offset = -index * (100 / totalSlides);
    document.querySelector('.container-cards').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    if (step === 1) {
        index = (index + 1) % totalSlides;
    } else {
        index = (index - 1 + totalSlides) % totalSlides;
    }
    updateCarousel();
}

// Event listeners for buttons
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));

// Inicializa o carousel
updateCarousel();
