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

// Event listeners for arrow carousel buttons
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));

// Inicializa o carousel
updateCarousel();

// Header    
const header = document.querySelector('.header-menu');
const buttonHeader = document.querySelector('#header-button');

window.addEventListener('scroll', () => {
    const headerPosition = header.offsetTop + window.scrollY;

    /* add a button to the header when you get past the Hero section. */
    if(headerPosition >= 672){
        buttonHeader.style.display = 'block'; /* display button. */
        /* add link to button. */
        buttonHeader.addEventListener('click', () => {
            window.open("https://nubank.com.br/conta", "_blank");
        });
    }
    /* remove button. */
    else{
        document.querySelector('#header-button').style.display = 'none';
    }
});

//SubMenu Drop-Down script
const containerDropDown = document.querySelector('.menu-dropdown');
const subMenu1 = document.getElementById('submenu-1');
const subMenu2 = document.getElementById('submenu-2');
const subMenu3 = document.getElementById('submenu-3');
const arrowHeader = document.getElementsByClassName('arrow-header');

function showSubMenu(index) {
    setTimeout(() => {
        containerDropDown.classList.add('open');
        arrowHeader[index].style.transform = 'rotate(180deg)';
        arrowHeader[index].style.transition = '0.2s';

        switch (index) {
            
            case 0:
                subMenu2.style.display = 'none';
                subMenu3.style.display = 'none';
                subMenu1.style.display = 'flex';
                break;
                
            case 1:
                subMenu1.style.display = 'none';
                subMenu3.style.display = 'none';
                subMenu2.style.display = 'flex';
                break;

            case 2:
                subMenu1.style.display = 'none';
                subMenu2.style.display = 'none';
                subMenu3.style.display = 'flex';
                break;
        
            default:
                break;
        }
    }, 250);
}

function keepSubmenu(index) {
    containerDropDown.classList.add('open');
    arrowHeader[index].style.transform = 'rotate(180deg)';
}

function hideSubmenu(index) {
    containerDropDown.classList.remove('open'); 
    arrowHeader[index].style.transform = 'rotate(360deg)';
    arrowHeader[index].style.transition = '0.2s';
}

document.getElementById('switch-submenu-1').addEventListener('mouseenter', () => showSubMenu(0));
document.getElementById('switch-submenu-2').addEventListener('mouseenter', () => showSubMenu(1));
document.getElementById('switch-submenu-3').addEventListener('mouseenter', () => showSubMenu(2));

document.getElementById('switch-submenu-1').addEventListener('mouseleave', () => hideSubmenu(0));
document.getElementById('switch-submenu-2').addEventListener('mouseleave', () => hideSubmenu(1));
document.getElementById('switch-submenu-3').addEventListener('mouseleave', () => hideSubmenu(2));

subMenu1.addEventListener('mouseenter', () => keepSubmenu(0));
subMenu2.addEventListener('mouseenter', () => keepSubmenu(1));
subMenu3.addEventListener('mouseenter', () => keepSubmenu(2));

subMenu1.addEventListener('mouseleave', () => hideSubmenu(0));
subMenu2.addEventListener('mouseleave', () => hideSubmenu(1));
subMenu3.addEventListener('mouseleave', () => hideSubmenu(2));

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
        console.log('cpf valido');
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
        console.log('cpf invalido');
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

    console.log("cpf: " + cpf);
    
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

input.addEventListener('input', () => formatCpf());

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
