jQuery(document).ready(function( $ ) {



  $('body').click(function () {
    if( $(".toggle-mnu").hasClass("on") ){
      $(".toggle-mnu").removeClass("on");
      $(".top-mnu").fadeOut();
    }
  });


  $(".top-mnu").click(function (e) {
    e.stopPropagation();
  });


  $('.burger').click(function () {
    $(this).closest('.head__row').toggleClass('header-open');
    $(this).toggleClass('burger-open');
    $('body').toggleClass("body-open");
    $('.header__col').toggleClass("open");    
  });

  $('.head__city').click(function (e) {
    e.preventDefault();
    $('.search-modal').slideToggle();
  });

  $('.search-modal__close').click(function () {
    $('.search-modal').slideUp();
  });
  

    // Функция для управления cookie-уведомлением
  const $cookieBanner = $('.cookies');
  const $acceptButton = $('.cookies__btn');
  const STORAGE_KEY = 'cookie_consent_accepted_smart_1';

  if (!localStorage.getItem(STORAGE_KEY)) {
    setTimeout(() => {
      $cookieBanner.addClass('show');
    }, 500);
  }

  $acceptButton.on('click', function() {
    $cookieBanner.removeClass('show');
    localStorage.setItem(STORAGE_KEY, 'true');
  });

  $('.accept__close').click(function () {
    $('.cookies').removeClass('show');
  });

  $('[data-fancybox="gallery-1"]').fancybox({
    arrows: true,
    infobar: false,
    smallBtn: true,
    toolbar: true,
    iframe : {
      css : {
        width : '950px'
      }
    },    
    slideClass: "myClass",
    baseClass: "myclass"
  });

  
  $('.pagination-more__w .btn').on('click', function(e) {
    var $btn = $(this);
    if ($btn.hasClass('open')) {      
      $btn.attr('href', '#pag');
    }
    else {
      $btn.attr('href', '#news-cards');
    }


    $btn.toggleClass('open');
    $btn.closest('.s-news').find('.news-cards').toggleClass('open');
    $btn.text($btn.hasClass('open') ? 'Скрыть' : 'Показать ещё');

  });


//levels menu
  let isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows())}}

  let body = document.querySelector('body');


  if ( isMobile.any() ) {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.menu-arrow');
    arrow.forEach(function (item) {
      let thisLink = item.previousElementSibling;
      let subMenu = item.nextElementSibling;
      let thisArrow = item;

      thisLink.classList.add('parent');
      item.addEventListener('click', function () {      
        subMenu.classList.toggle('open');
        thisArrow.classList.toggle('active');
      });
    });
  }
  else {
    body.classList.add('mouse')
  }


  $(function () {
    const $slider = $('.projects__slider');

  // Инициализация слайдера
    $slider.slick({
    arrows: false,          // отключаем встроенные стрелки
    dots: false,            // отключаем точки
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [

      {
        breakpoint: 991,
        settings: {
          dots: true,
        }
      },
    ]
  });

    (function () {
      const selector = '.licenses__grid';
      let isSlick = false;

      function initSlick() {
        const $el = $(selector);
        if (isSlick || !$el.length) return;
        $el.slick({
          arrows: false,
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        });
        isSlick = true;
      }

      function destroySlick() {
        const $el = $(selector);
        if (!isSlick || !$el.length) return;
        $el.slick('unslick');
        isSlick = false;
      }

      function handleResize() {
        if (window.innerWidth < 768) {
          initSlick();
        } else {
          destroySlick();
        }
      }

      $(document).ready(function () {
        handleResize();
      });

      let resizeTimer;
      $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 200);
      });
    })();

  // Кнопки навигации
    $('.projects__ctrl-prev').on('click', function () {
      $slider.slick('slickPrev');
    });

    $('.projects__ctrl-next').on('click', function () {
      $slider.slick('slickNext');
    });

  // Обновление счётчика
    function updateCounter() {
    const current = $slider.slick('slickCurrentSlide') + 1; // с 1, а не с 0
    const total = $slider.slick('getSlick').slideCount;

    $('.projects__current').text(current);
    $('.projects__total').text(total);
  }

  // Первичная инициализация счётчика
  updateCounter();

  // Обновляем при смене слайда
  $slider.on('afterChange', function () {
    updateCounter();
  });

  // На случай переинициализации / изменения размера
  $slider.on('init reInit', function () {
    updateCounter();
  });
});
  
  $(function () {
    const $projectSlider = $('.project__slider');

    if ($projectSlider.length && typeof $.fn.slick === 'function') {
      $projectSlider.slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,      
      });
    }
  });


/************************************/

/*  $('.wrapper').prepend('<span class="eye-3"></span>');
  const url = window.location.href;
  const match = url.match(/(\d+-?\d*)\.html$/);
  const pg = match[1];
  $('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");

  $('.eye-3').click(function (e) {
    e.preventDefault();  
    $('body').toggleClass('active');    
    $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
    $('body:not(.active)').css('background-image', "unset");
  });*/

/************************************/

  function popup(openLink, windowEl, closeEl) {  
    $(openLink).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeIn();
      $('body').addClass('ohi');
    });
    $(closeEl).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-overlay').click(function () {
      $(this).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-form__block').click(function (e) {
      e.stopPropagation();  
    });
    
  }

  popup('.link2', '.modal-overlay_2', '.modal-close_2');
  popup('.link', '.modal-overlay_1', '.modal-close_1');


  $('a[href*=\\#]:not([href=\\#])').click(function () {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 85}, 1100);
    return false;
  });


  $(window).scroll(function(){
    var wt = $(window).scrollTop();  
    var wh = $(window).height();    
    if (wt > 600) {
      $('.serv-arr-up').show(400);
    }
    else {
     $('.serv-arr-up').hide();
   }
 });

  if($('select').length) {
    $('select').each(function () {
      $(this).select2({
        minimumResultsForSearch: -1,
        dropdownParent: $(this).parent()
      });
    });
  }

  $(".tel").mask("+ 7 (999)-999-99-99");

  $(function () {
    const $buttons = $('.geo__actions button');
    const $dots = $('.geo__dot');

    function setActive(index) {
      $buttons.removeClass('active');
      $dots.removeClass('active');
      if (index >= 0) {
        $buttons.eq(index).addClass('active');
        $dots.eq(index).addClass('active');
      }
    }

  // Десктоп: наведение / уход
    $buttons.on('mouseenter', function () {
      setActive($buttons.index(this));
    });

    $buttons.on('mouseleave', function () {
      setActive(-1);
    });

  // Мобильные: тап (на тач-устройствах mouseenter/mouseleave обычно не мешают)
    $buttons.on('click touchstart', function (e) {
      e.preventDefault();
      setActive($buttons.index(this));
    });
  });

  $(function () {
    const svgCache = {};

    $('.geo__dot img').each(function () {
      const $img = $(this);
      const src = $img.attr('src');
      if (!src) return;

      const replaceImg = function (svgText) {
      // Приводим к строке на случай XML Document
        const text = typeof svgText === 'string' ? svgText : new XMLSerializer().serializeToString(svgText);
        const $svg = $(text.trim()).filter('svg');
        if (!$svg.length) return;

        if ($img.attr('class')) $svg.attr('class', $img.attr('class'));
        $svg.attr('aria-hidden', 'true');

        $img.replaceWith($svg);
      };

      if (svgCache[src]) {
        replaceImg(svgCache[src]);
      } else {
        $.ajax({
          url: src,
        dataType: 'text',      // ← ключевой момент
        cache: true
      })
        .done(function (data) {
          svgCache[src] = data;
          replaceImg(data);
        })
        .fail(function () {
          console.warn('Не удалось загрузить SVG:', src);
        });
      }
    });
  });

  let inputFile = document.querySelector('#fileMulti');
  let imgWrapper = document.querySelector('.img_wrapper');


  function download2(input) {
    let file = input.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
/*  reader.onload = function () {    
imgWrapper.innerHTML = file.name;
}*/
    reader.onload = ev => {
      const src = ev.target.result
      imgWrapper.innerHTML = `${file.name}`
    }
  }


  if ($('#fileMulti').length) {
    inputFile.addEventListener("change", function () {
      download2(this);
    });
  }





  $(function () {
    var $header = $('.header');
    var lastScrollTop = 0;
    var delta = 160;

    $(window).on('scroll', function () {
      var scrollTop = $(this).scrollTop();

        if (Math.abs(lastScrollTop - scrollTop) <= 5) return; // игнорим мелкие дрожания

        if (scrollTop > lastScrollTop && scrollTop > delta) {
            // Скролл ВНИЗ и прошли 40px — прячем
          $header.css('transform', 'translateY(-100%)');
        } else if (scrollTop < lastScrollTop) {
            // Скролл ВВЕРХ — показываем
          $header.css('transform', 'translateY(0)');
        }

        lastScrollTop = scrollTop;
      });
  });



  const $heroCounts = $('.hero__conuts');

  if ($heroCounts.length === 0) return;

  // --- 1. Отслеживание появления в области видимости ---
  function checkVisibility() {
    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();
    const elemTop = $heroCounts.offset().top;
    const elemBottom = elemTop + $heroCounts.outerHeight();

    if (elemBottom >= windowTop && elemTop <= windowBottom) {
      // Запускаем анимацию именно у этого родителя
      $heroCounts.each(function() {
        const $parent = $(this);

        // Защита от повторного запуска
        if ($parent.hasClass('show')) return;

        $parent.addClass('show');
        startCounters($parent);
      });

      $(window).off('scroll resize', checkVisibility);
    }
  }

  // --- 2. Анимация счётчиков внутри конкретного родителя ---
  function startCounters($parent) {
    // Небольшая задержка как в оригинале (можно убрать)
    setTimeout(function() {
      $parent.find('.counter').each(function() {
        const $this = $(this);
        const target = parseInt($this.data('target'), 10) || 0;
        const formatted = $this.data('formatted') === true;
        const duration = 3000;
        let startTime = null;

        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);

          // easeOutQuad
          const eased = 1 - Math.pow(1 - progress, 2);
          const current = Math.floor(eased * target);

          if (formatted) {
            $this.text(current.toLocaleString('ru-RU').replace(/,/g, ' '));
          } else {
            $this.text(current);
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            $this.text(
              formatted
                ? target.toLocaleString('ru-RU').replace(/,/g, ' ')
                : target
            );
          }
        }

        requestAnimationFrame(animate);
      });
    }, 500);
  }

  // --- 3. Проверка при загрузке и подписка на события ---
  checkVisibility();
  $(window).on('scroll resize', checkVisibility);








}); //ready

