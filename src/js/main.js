$(function() {



  $('.product-tabs__top-item').on('click', function(e) {
    e.preventDefault(); //отмена стандарной обработки события при клике

    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  });

  $('.product-slide__thumb').slick({        
    asNavFor: '.product-slide__big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,    
    draggable: false,
    arrows: false
  });
  $('.product-slide__big').slick({
    asNavFor: '.product-slide__thumb',    
    draggable: false,
    arrows: false,
    fade: true
  });

$('.shop-content__filter-btn').on('click', function() {  
  $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
  $(this).addClass('shop-content__filter-btn--active');
});

$('.button-list').on('click', function() {
  $('.product-item').addClass('product-item--list');
});

$('.button-grid').on('click', function() {
  $('.product-item').removeClass('product-item--list');
});

$('.select-style, .product-one__item-num').styler();

$(".filter-price__input").ionRangeSlider({
  type: "double",
  prefix: "$",
  onStart: function (data) {
    $('.filter-price__from').text(data.from);
    $('.filter-price__to').text(data.to);
  },
  onChange: function (data) {
    $('.filter-price__from').text(data.from);
    $('.filter-price__to').text(data.to);
  }
});

$('.menu__btn').on('click', function() {
  $('.menu__list').toggleClass('menu__list--active');
});

$('.footer-top__title').on('click', function() {
  // $('.footer-top__list').slideToggle();
  // $('.footer-top__list').toggleClass('footer-top__title--active');

  $(this).siblings().slideToggle();
  // или через  next()
  $(this).next().slideToggle();
  $(this).toggleClass('footer-top__title--active');

});

//$(function() {
  $('.top-slider__inner').slick({
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $(".star").rateYo({
    // rating: 3.6,  // использовать data-rateyo-rating
    starWidth: "17px",
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true
  });

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  
  function initializeClock(id, endtime) {
    const clock = document.querySelector('.promo__clock');
    const daysSpan = clock.querySelector('.promo__days');
    const hoursSpan = clock.querySelector('.promo__hours');
    const minutesSpan = clock.querySelector('.promo__minutes');
    const secondsSpan = clock.querySelector('.promo__seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  
  // вариант 1 используется если нужно чтобы при каждом обновлении страницы было одинаковое время до окончания действия таймера
  // const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

  // вариант 2 используется если нужно чтобы одно время(конкретная дата) окончания действия таймера
  //const deadline = '2021-05-25';

  // то же что и вариант 2, но нужная дата устанавливается в файле html для ее установки на стороне бэкэнда через  дата-атрибут
  const deadline = $('.promo__clock').attr('data-time');  

  initializeClock('promo__clock', deadline);

});