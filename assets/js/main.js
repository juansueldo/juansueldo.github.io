
import { TextAnimation } from '../libs/textAnimation.js';
import { Navigation } from '../libs/navigation.js';
import { ScrollController } from '../libs/scrollController.js';
import { DecryptAnimation } from '../libs/decryptAnimation.js';



document.addEventListener('DOMContentLoaded', () => {

    const heroText = document.querySelector('.gradient-text');
    if (heroText) {
        new TextAnimation(heroText);
    }


    new Navigation();


    new ScrollController();


    const bubbleContainer = document.getElementById("bubbleContainer");
    if (bubbleContainer) {
        new SkillsBubbles(bubbleContainer);
    }


   const sliderContainer = document.querySelector('.splide__list');

    const itemsData = [
        {
            img: 'https://placehold.co/600x400/222222/FFFFFF?text=Proyecto+1',
            name: 'Shift manager',
            description: 'Comprehensive platform for clinics and hospitals. This solution allows you to schedule appointments and sync them with your Google Calendar.',
            skills: `
                <img class="svg-icon" src="../assets/svg/laravel.svg"/>
                <img class="svg-icon" width="24" height="24" src="../assets/svg/php.svg"/>
                <img class="svg-icon" width="24" height="24" src="../assets/svg/javascript.svg"/>
                <img class="svg-icon" width="24" height="24" src="../assets/svg/mysql.svg"/>
                <img class="svg-icon" width="24" height="24" src="../assets/svg/html5.svg"/>
                <img class="svg-icon" width="24" height="24" src="../assets/svg/css.svg"/>
            `,
            link: 'https://github.com/juansueldo',
            code: 'https://github.com/juansueldo/shiftmanager',
        },
        {
            img: 'https://placehold.co/600x400/333333/FFFFFF?text=Proyecto+2',
            name: 'E-commerce Platform',
            description: 'Complete e-commerce solution with inventory management, payment processing, and customer management system.',
            skills: 'react, node.js, mongodb, stripe',
            link: 'https://github.com/juansueldo',
            code: 'https://github.com/juansueldo/ecommerce',
        },
    ];

    const allListItemsHTML = itemsData.map(item => createLi(item.img, item.name, item.description, item.skills, item.link, item.code)).join('');
    sliderContainer.innerHTML = allListItemsHTML;
    var splide = new Splide( '.splide' );
    var bar    = splide.root.querySelector( '.my-slider-progress-bar' );
  
    splide.on( 'mounted move', function () {
        var end  = splide.Components.Controller.getEnd() + 1;
        var rate = Math.min( ( splide.index + 1 ) / end, 1 );
        bar.style.width = String( 100 * rate ) + '%';
    } );
  
    splide.mount();

    const homeSection = document.getElementById("home");
    if (homeSection) {
        new DecryptAnimation(homeSection);
    }
});

function createLi(img, name, description, skills, link, code) {
    return `<li class="splide__slide">
        <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src="${img}" class="card-img-top" loading="lazy" alt="${name}">
            </div>
            <div class="card-body p-3 p-xl-5">
                <h3 class="card-title h5">${name}</h3>
                <p class="card-text">${description}</p>
                <p class="card-text"><strong>Skills:</strong></p><div class="skills-container">${skills}</div>
                <div class="container-links">
                    <a href="${link}" target="_blank" class="code-i">
                        <i class="bx bx-globe icon"></i>
                    </a>
                    <a href="${code}" target="_blank" class="code-i">
                        <i class="bx bxl-github icon"></i>
                    </a>
                </div>
            </div>
        </div>
    </li>`;
}

const downloadBtn = document.getElementById('download');

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const link = document.createElement('a');
    link.href = 'https://docs.google.com/document/d/e/2PACX-1vRSmH24qMgYBskmEO1-dXXQ2mP2ZnU4azAHWtiaJkbeocWage8i1Nk7N0-RxOQUuQ/pub';
    link.setAttribute('target', '_blank'); // ← Esta es la forma correcta
    link.setAttribute('download', 'juan-sueldo.docx');

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
