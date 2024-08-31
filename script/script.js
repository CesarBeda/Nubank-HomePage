// script.js

//Carousel Cards Script

let index = 0;
const cardsToShow = 4; // Número de cards a serem exibidos
const totalCards = document.querySelectorAll('.carousel-cards').length; // Contagem total de cards (considerando duplicação)
const totalSlides = Math.ceil(totalCards / cardsToShow);

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

//SubMenu Drop-Down script

const containerDropDown = document.querySelector('.menu-dropdown');
const subMenu1 = document.getElementById('submenu-1');
const subMenu2 = document.getElementById('submenu-2');
const subMenu3 = document.getElementById('submenu-3');

function showSubMenu(index) {
    setTimeout(() => {
        containerDropDown.classList.add('open');

        switch (index) {
            
            case 1:
                subMenu2.style.display = 'none'
                subMenu3.style.display = 'none'
                subMenu1.style.display = 'flex'
                break;
                
            case 2:
                subMenu1.style.display = 'none'
                subMenu3.style.display = 'none'
                subMenu2.style.display = 'flex'
                break;

            case 3:
                subMenu1.style.display = 'none'
                subMenu2.style.display = 'none'
                subMenu3.style.display = 'flex'
                break;
        
            default:
                break;
        }
    }, 250);
}

function keepSubmenu() { containerDropDown.classList.add('open'); }
function hideSubmenu() { containerDropDown.classList.remove('open'); }

document.getElementById('switch-submenu-1').addEventListener('mouseenter', () => showSubMenu(1));
document.getElementById('switch-submenu-2').addEventListener('mouseenter', () => showSubMenu(2));
document.getElementById('switch-submenu-3').addEventListener('mouseenter', () => showSubMenu(3));

document.getElementById('switch-submenu-1').addEventListener('mouseleave', () => hideSubmenu(subMenu1));
document.getElementById('switch-submenu-2').addEventListener('mouseleave', () => hideSubmenu(subMenu2));
document.getElementById('switch-submenu-3').addEventListener('mouseleave', () => hideSubmenu(subMenu3));

containerDropDown.addEventListener('mouseenter', () => keepSubmenu());
containerDropDown.addEventListener('mouseleave', () => hideSubmenu());

