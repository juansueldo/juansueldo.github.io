$(document).ready(function () {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let currentModal = null;
    let stopTyping=false;
    
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
          stopTyping=false;
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
        if(stopTyping) return;
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
        if(stopTyping) return;
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
      if($modal.find('.consoletext').length > 0){
        stopTyping= true;
        $consoletext.empty();
      }
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
      let windowColor;
      let fontColor;
      let light;
      let dark;
      switch (parseInt($rangeInput.val())) {
        case 1:
          colorValue = "#008080";
          windowColor = "#c0c0c0";
          fontColor = "#222";
          light ="#fff";
          dark = "#000";
          break;
        case 2:
          colorValue = "#242222";
          windowColor = "#000";
          fontColor = "#fff";
          light ="#000";
          dark = "#fff";
          break;
        case 3:
          colorValue = "#c0c0c0";
          windowColor = "#fff";
          fontColor = "#222";
          light ="#fff";
          dark = "#000";
          break;
        default:
          colorValue = "#008080";
          break;
      }
      $(':root').css('--background-desktop', colorValue);
      $(':root').css('--background-window', windowColor);
      $(':root').css('--font-color', fontColor);
      $(':root').css('--light-color', light);
      $(':root').css('--dark-color', dark);
    });

    $('.url-open').click(function() {
        var url = $(this).val();
        if (url) {
            window.open(url, '_blank');
        }
    });
    $("#shutdown").click(function(){
      window.location.href = '/index.html';
    });

    const $sprite = $("#sprite");
    const frameWidth = 100;
    const frameCount = 8;
    let currentFrame = 0;
  
    function animateSprite() {
      const position = -currentFrame * frameWidth;
      $sprite.css("background-position", `${position}px 0`);
      currentFrame = (currentFrame + 1) % frameCount;
    }
    setInterval(animateSprite, 100);

});
  
