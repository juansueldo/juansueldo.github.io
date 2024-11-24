$(document).ready(function () {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let currentModal = null;

    const $icons = $('.icon');
    const $modals = $('.modal');
    const $closeButtons = $('.close');
    const $desktop = $('.desktop');
    const $maximizeButtons = $('.maximized');
    const $iconColor = $('#img-color');
    const $consoletext = $('#text-console');
    const $startButton = $('#start-button');
    const $startMenu = $('#start-menu');
    const $slider = $('#slider');
    const $rangeInput = $('#range28');
  
    $icons.on('click', function () {
        const windowId = $(this).data('window');
        const $modal = $('#' + windowId);
      
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const modalWidth = $modal.outerWidth();
        const modalHeight = $modal.outerHeight();
      
        const topPosition = (windowHeight - modalHeight) / 2;
        const leftPosition = (windowWidth - modalWidth) / 2;
      
        $modal.css({
          display: 'block',
          zIndex: 1000,
          top: `${topPosition}px`,
          left: `${leftPosition}px`
        });
      
        if (windowId === "my-computer") {
          $consoletext.empty();
          const texts = [
            "> Hola, bienvenido a Mi PC, mi nombre es Juan Sueldo",
            "> ¿En qué puedo ayudarte hoy?",
            "> Te puedo ayudar con algunas configuraciones",
            "> También puedo mostrarte información sobre el sistema",
            "> Si necesitas algo más, solo dímelo"
          ];
          typeAllText(texts, $consoletext);
        }
      });
      
  
    function typeAllText(texts, container) {
      let index = 0;
      function typeNextText() {
        if (index < texts.length) {
          typeText(texts[index], container, function () {
            index++;
            typeNextText();
          });
        }
      }
      typeNextText();
    }
  
    function typeText(text, container, nextTextCallback) {
      const $p = $('<p></p>');
      container.append($p);
      let i = 0;
      const velocity = 100;
  
      function typeNextLetter() {
        if (i < text.length) {
          $p.text($p.text() + text.charAt(i));
          i++;
          setTimeout(typeNextLetter, velocity);
        } else {
          if (nextTextCallback) {
            setTimeout(nextTextCallback, velocity);
          }
        }
      }
      typeNextLetter();
    }
  
    $closeButtons.on('click', function () {
      const $modal = $(this).closest('.modal');
      $modal.css('display', 'none');
    });
  
    $maximizeButtons.on('click', function () {
      const $modal = $(this).closest('.modal');
      const $window = $(this).closest('.window');
  
      const isMaximized = $modal.data('maximized') === true;
  
      if (isMaximized) {
        $modal.removeClass('modal-maximized').data('maximized', false);
        $window.removeClass('window-maximized');
      } else {
        $modal.addClass('modal-maximized').data('maximized', true);
        $window.addClass('window-maximized');
      }
    });
  
    $modals.each(function () {
      const $modal = $(this);
      const $header = $modal.find('.title-bar');
  
      $header.on('mousedown', function (e) {
        isDragging = true;
        currentModal = $modal;
        offsetX = e.clientX - $modal.offset().left;
        offsetY = e.clientY - $modal.offset().top;
        $modal.css('z-index', 1000);
      });
    });
  
    $(document).on('mousemove', function (e) {
      if (isDragging && currentModal) {
        currentModal.css({
          left: e.clientX - offsetX + 'px',
          top: e.clientY - offsetY + 'px'
        });
      }
    });
  
    $(document).on('mouseup', function () {
      isDragging = false;
      currentModal = null;
    });
  
    $startButton.on('click', function () {
      $startMenu.toggleClass('hidden');
    });
  
    
    $(document).on('click', function (e) {
      if (!$startButton.is(e.target) && !$startMenu.is(e.target)) {
        $startMenu.addClass('hidden');
      }
      if (!$slider.is(e.target) && !$iconColor.is(e.target)) {
        $slider.addClass('hidden');
      }
    });
  
    $iconColor.on('click', function () {
      $slider.toggleClass('hidden');
    });
  
    
    $rangeInput.on('input', function () {
      let colorValue;
      switch (parseInt($rangeInput.val())) {
        case 1:
          colorValue = "#008080";
          break;
        case 2:
          colorValue = "#ff6347";
          break;
        case 3:
          colorValue = "#4682b4";
          break;
        default:
          colorValue = "#008080";
          break;
      }
      $(':root').css('--background-desktop', colorValue);
    });

    $('.url-open').click(function() {
        var url = $(this).val();
        if (url) {
            window.open(url, '_blank');
        }
    });
    $("#shutdown").click(function(){
      window.location.href = '/index.html';
    })
    // Configuración del sprite
    const $sprite = $("#sprite"); // Selección del elemento
    const frameWidth = 100; // Ancho de cada cuadro en el sprite sheet
    const frameCount = 8; // Número total de cuadros en el sprite sheet
    let currentFrame = 0; // Cuadro inicial
  
    // Animar el sprite
    function animateSprite() {
      // Calcular la posición del cuadro actual en el eje X
      const position = -currentFrame * frameWidth;
      $sprite.css("background-position", `${position}px 0`);
  
      // Mover al siguiente cuadro
      currentFrame = (currentFrame + 1) % frameCount;
    }
  
    // Reproducir la animación cada 100ms
    setInterval(animateSprite, 100);

});
  
