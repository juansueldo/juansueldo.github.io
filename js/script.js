// toggle

const toggleBtn = document.querySelector(".toggle-btn");
const menu = document.getElementById('menu');
const links = document.querySelectorAll('.link');
const button = document.querySelector('.project-button');
const buttonColor = document.querySelector('.box-container');


button.addEventListener("click", function(){
  button.classList.toggle('is-active-button');
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