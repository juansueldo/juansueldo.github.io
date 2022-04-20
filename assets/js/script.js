// toggle

const toggleBtn = document.querySelector(".toggle-btn");
const linkConainer = document.querySelector(".links-container");

toggleBtn.addEventListener("click", () => {
    linkConainer.classList.toggle("show");

  if (linkConainer.classList.contains("show")) {
    toggleBtn.setAttribute("aria-label", "Cerrar menú");
  } else {
    toggleBtn.setAttribute("aria-label", "Abrir menú");
  }
});


toggleBtn.addEventListener('click', function(){
  this.classList.toggle('is-active');
});

// links

const links = document.querySelectorAll('.link');

links.forEach(link =>{
    link.addEventListener('click',() =>{
        links.forEach(ele => ele.classList.remove('active'));
        link.classList.add('active');
    })
})

// creating dynamic project card



// filters

const filters = document.querySelectorAll('.filter-btn');

filters.forEach(filterBtn =>{
    filterBtn.addEventListener('click', ()=>{
        let id = filterBtn.getAttribute('id');
        let projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card=>{
            if(card.getAttribute('data-tags').includes(id)){
                card.classList.remove('hide');
            }
            else{
                card.classList.add('hide');
            }
        })

        filters.forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');
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
sr.reveal('.about, .project, .contact',{delay:300,origin:'top'});

window.onload = function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
}
