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
    $(this).toggleClass('burger-open');
    $('body').toggleClass("body-open");
    $('.header__col').toggleClass("open");    
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
    adaptiveHeight: true
  });

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

  $('.accordion-header').toggleClass('inactive-header');
  $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
  $('.accordion-content').first().slideDown().toggleClass('open-content');
  $('.accordioon-content').first().slideDown().toggleClass('open-content');
  $('.accordion-header').click(function () {
    if($(this).is('.inactive-header')) {
      $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
      $(this).toggleClass('active-header').toggleClass('inactive-header');
      $(this).next().slideToggle().toggleClass('open-content');
    }

    else {
      $(this).toggleClass('active-header').toggleClass('inactive-header');
      $(this).next().slideToggle().toggleClass('open-content');
    }
  });

  return false;

}); //ready

