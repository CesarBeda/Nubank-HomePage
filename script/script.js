// script.js

//Carousel Cards Script
let index = 0;
const cardsToShow = 4; // Number of cards to be displayed.
const totalCards = document.querySelectorAll('.carousel-cards').length; 
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

// Event listeners for arrow carousel buttons.
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));

// Initialize the carousel.
updateCarousel();

// Header.
const header = document.querySelector('.header-menu');
const buttonHeader = document.querySelector('#header-button');
const menuItems = header.querySelectorAll('li');

/* add hover and leave events in <li> menuItems. */
menuItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => hoverHeader(index));
    item.addEventListener('mouseleave', leaveHeader);
});

/* hover opacity transitions. */
function hoverHeader(index) {
    // If the item is the first (logo), do nothing.
    if (index === 0) return;
    menuItems.forEach((item, i) => {
        // Change the opacity of all items except the logo and the hovered item.
        if (i !== 0) {
            item.style.opacity = (i === index) ? '1' : '0.5';
            item.style.transition = 'opacity 0.2s linear';
        }
    });
}

// On hover leave, return to the original opacity.
function leaveHeader() {
    menuItems.forEach((item) => {
        item.style.opacity = '';
    });
}

// header button on scroll.
window.addEventListener('scroll', () => {
    const headerPosition = header.offsetTop + window.scrollY;
    /* add a button to the header when you get past the Hero section. */
    buttonHeader.style.display = (headerPosition >= 672) ? 'block' : 'none';
});

/* add link to button. */
buttonHeader.addEventListener('click', () => {
    window.open("https://nubank.com.br/conta", "_blank");
});


//SubMenu Drop-Down script
const switchMenus = document.querySelectorAll('.switch-submenu');
const subMenus = document.querySelectorAll('.submenu');
const arrowsHeader = document.querySelectorAll('.arrow-header');

function showSubMenu(index) {
    subMenus[index].classList.add('show'); // display submenu corresponding to the index.
}

function keepSubMenu(index) {
    // if the mouse leaves the <li> #switch-menu, but enters the SubMenu.
    subMenus[index].classList.add('show'); // keep submenu corresponding to the index.
    arrowsHeader[index].style.transform = 'rotate(180deg)'; // keep the arrow pointing up when the menu is displayed.
    menuItems.forEach((item, i) => {
        // Change the opacity of all items except the logo and the hovered subMenu <li> #switch.
        if (i !== 0) {
            item.style.opacity = (i === index + 2) ? '1' : '0.5';
        }
    });
    
}

function hideSubMenu(index) {
    subMenus[index].classList.remove('show');
    arrowsHeader[index].style.transform = ''; // arrow in the original position

    // On hover leave in subMenu, return to the original opacity.
    menuItems.forEach((item, i) => {
        if (i !== 0) {
            item.style.opacity = '';
        }
    });
}

// Add event listeners for each switch menu
switchMenus.forEach((switchMenu, i) => {
    switchMenu.addEventListener('mouseenter', () => showSubMenu(i))
    switchMenu.addEventListener('mouseleave', () => hideSubMenu(i))
});

// Add event listeners for each subMenu.
subMenus.forEach((subMenu, i) => {
    subMenu.addEventListener('mouseenter', () => keepSubMenu(i))
    subMenu.addEventListener('mouseleave', () => hideSubMenu(i))
});

// Hero Section CPF Card
const input = document.querySelector('input');
const placeholder = document.getElementById('placeholder-cpf');
const span = document.querySelector('#cpf-invalid');
const invalidIcon = document.querySelector('#input-invalid-icon');
const validIcon = document.querySelector('#input-valid-icon');
const buttonCpf =  document.querySelector('#button-cpf');
let firstTimeInput = true;

function formatCpf(){

    let value = input.value.replace(/\D/g, ''); // Removes all characters that are not digits.

    // Formata conforme o padrão ###.###.###-##.
    // Format to standard ###.###.###-##
    if      (value.length > 3 && value.length <= 6) { value = value.slice(0, 3) + '.' + value.slice(3);} 
    else if (value.length > 6 && value.length <= 9) { value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6); } 
    else if (value.length > 9)                      { value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9, 11); }

    input.value = value;

    // change the status when the input text is completely filled in for the first time.
    if(input.value.length === 14){
        firstTimeInput = false;
    }

    // check that the cpf is valid
    if(!firstTimeInput){
        approveCpf();
    }

}

function approveCpf(){

    //if cpf is valid or invalid.
    if (validateCPF(input.value)){
        span.style.color = 'transparent';
        input.style.color = 'var(--green)';
        input.style.borderColor = 'var(--green)';
        validIcon.style.display = 'block';
        invalidIcon.style.display = 'none';
        buttonCpf.style.backgroundColor = 'var(--purple)';
        buttonCpf.style.color = 'var(--primary)';
        buttonCpf.style.cursor = 'pointer';
        buttonCpf.addEventListener('click', () => {
            window.open("https://nubank.com.br/conta", "_blank");
        });
        buttonCpf.disabled = false;
        
    } else {
        span.style.color = 'var(--red)';
        span.style.userSelect = 'text';
        input.style.color = 'var(--red)';
        input.style.borderColor = 'var(--red)';
        invalidIcon.style.display = 'block';
        validIcon.style.display = 'none';
        buttonCpf.style.backgroundColor = 'var(--gray-bg-inactive)';
        buttonCpf.style.color = 'var(--gray-text-inactive)';
        buttonCpf.style.cursor = 'not-allowed';
        buttonCpf.disabled = true;  
    }
}

function validateCPF(cpf) {
    // Remove caracteres como pontos e traços
    // Removes characters such as dots and dashes
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida (tipo "111.111.111-11").
    // Checks if the CPF has 11 digits or is a repeated sequence (such as "111.111.111-11").
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito verificador.
    // Validation of the first verifier digit.
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let rest = sum % 11;
    let firstVerifierDigit = rest < 2 ? 0 : 11 - rest;

    if (parseInt(cpf.charAt(9)) !== firstVerifierDigit) {
        return false;
    }

    // Validação do segundo dígito verificador.
    // Validation of the second verifier digit.
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rest = sum % 11;
    let secondVerifierDigit = rest < 2 ? 0 : 11 - rest;

    if (parseInt(cpf.charAt(10)) !== secondVerifierDigit) {
        return false;
    }

    return true;  
}

input.addEventListener('input', formatCpf);

// move placeholder above the input.
input.addEventListener('focus', () => {
    placeholder.style.fontSize = '0.75rem';
    placeholder.style.top = '7.5rem';
    placeholder.style.transition = '0.2s';

});

input.addEventListener('blur', () => {
    
    // reposition placeholder when input text is empty.
    if(!input.value){
        placeholder.style.fontSize = '0.875rem';
        placeholder.style.top = '9rem';
        placeholder.style.transition = '0.2s';
    }
    // check that the cpf is valid.
    approveCpf();
});
