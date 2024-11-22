// toggle

const toggleBtn = document.querySelector(".header__navbar__toggle-btn");
const menu = document.getElementById('menu');
const links = document.querySelectorAll('.header__navbar__menu__link');
const buttonColor = document.querySelector('.box-container');
const cube = document.querySelector('.home__container__right__cube');
let count = 0;
const colors = ['#e80af0', '#f0190a', '#f09f0a', '#B4F00A'];
const highlights = ['#00ccff', '#e80af0', '#f0190a',"#00ccff"];
const properties = ['--main-color','--shadow',];


cube.addEventListener("click", () => {
  const color = colors[count]; 
  const highlight = highlights[count];
  properties.forEach(property => {
    document.documentElement.style.setProperty(property, color);
    document.documentElement.style.setProperty('--highlight-color', highlight);
  });
  count = (count + 1) % colors.length; 
  if (count === 0) {  // Cuando count vuelva a 0 (después de 4 clics si tienes 4 colores)
    window.location.href = 'w98/index.html';  // Redirige a la nueva URL
  }
});

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('visibility');

  if (linkContainer.classList.contains("visibility")) {
    toggleBtn.setAttribute("aria-label", "Cerrar menú");
  } else {
    toggleBtn.setAttribute("aria-label", "Abrir menú");
  }
});


toggleBtn.addEventListener('click', function(){
  this.classList.toggle('is-active');
});


// links


links.forEach(link =>{
    link.addEventListener('click',() =>{
        links.forEach(ele => ele.classList.remove('is-active'));
        link.classList.add('is-active');
        menu.classList.remove('visibility');
        toggleBtn.classList.remove('is-active');
    })
})
const filters = document.querySelectorAll('.project-button');

filters.forEach(filterBtn =>{
    filterBtn.addEventListener('click', ()=>{
        let id = filterBtn.getAttribute('id');
        let projectCards = document.querySelectorAll('.box-project');
        projectCards.forEach(card=>{
            if(card.getAttribute('data-tags').includes(id)){
                card.classList.remove('hide');
            }
            else{
                card.classList.add('hide');
            }
        })

        filters.forEach(btn => btn.classList.remove('is-active-button'));
        filterBtn.classList.add('is-active-button');
    })
});


const form = document.querySelector('.contact-form');
const name = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const message = document.querySelector('.message');
const sr = ScrollReveal({
    distance: '40px',
    duration: 2600,
    reset: true
})

sr.reveal('.home',{delay:300, origin:'left'})
sr.reveal('.about, .projects, .contact',{delay:300,origin:'top'});

window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
}

const track = document.querySelector('.slider__track');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;
let initial = 0;
let additional=0;
// Función para mover el track
const moveToSlide = (index) => {
  const offset = -index * slideWidth;
  track.style.transform = `translateX(${offset}px)`;
};

// Botón Siguiente
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // Cicla al principio
  moveToSlide(currentIndex);
});

// Botón Anterior
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Cicla al final
  moveToSlide(currentIndex);
});

// Asegúrate de ajustar el tamaño dinámicamente si la ventana cambia
window.addEventListener('resize', () => {
  const newWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${currentIndex * -newWidth}px)`;
});
