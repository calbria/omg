document.addEventListener('DOMContentLoaded', () => {
  const fullScreen = new Swiper('.fullscreen-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  
  
  const cardsSlider = new Swiper('.cards-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    breakpoints: {
      // when window width is >= 1140px
      1140: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 107,
      }
    },

    slidesPerView: 1,
    centeredSlides: true,
    // spaceBetween: 107,
  
  })
// ------------------ Smoth scroll -----------------------------------
const menu = document.querySelectorAll('.nav-menu');
const overlay = document.querySelector('.layout__overlay');
const mobileBtn = document.querySelector('.nav-btn');
const menuMobile = document.querySelector('.nav-menu--mobile');
const menuWrapper = document.querySelector('.nav-menu__wrapper')
const body = document.querySelector('body');

menu.forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    
    if(event.target.dataset.goto) {
      let link = event.target.dataset.goto;
      let screen = document.querySelector(`${link}`);
      let screenTop;
      if (link === '.fullscreen-slider') {
        screenTop = 0;
      } else {
        screenTop = screen.getBoundingClientRect().top + scrollY - document.querySelector('.nav').offsetHeight;
      }
     if (mobileBtn.classList.contains('nav-btn--close')){
      menuWrapper.classList.remove('nav-menu__wrapper--active');
      mobileBtn.classList.remove('nav-btn--close');
      overlay.classList.add('hidden');
      document.querySelector('body').classList.remove('lock');
     }
      

      window.scrollTo({
        top: screenTop,
        behavior: 'smooth',
      })
    }
   
  })
})


  // --------------------- Hamburger Menu -------------------------------
  mobileBtn.addEventListener('click', () => {
    menuWrapper.classList.toggle('nav-menu__wrapper--active');
    // menuMobile.classList.toggle('nav-menu--mobile--active');
    mobileBtn.classList.toggle('nav-btn--close');
    overlay.classList.toggle('hidden');
    body.classList.toggle('lock');
  })




  // const submit = document.querySelector('.btn_submit');
  
  const close = document.querySelector('.popup__close')
  const popup = document.querySelector('.popup');

  
// Form validation
const form = document.getElementById('contact-form');
const reqElements = form.querySelectorAll('._required');


form.addEventListener('submit', formSend);

function formSend(event) {
  event.preventDefault();
  let error = validate(form);
  if (error > 0) {
    console.log('form is not sent');
  } else {
    console.log('success');
    
    popup.classList.add('open');
    body.classList.add('lock');
    
 close.addEventListener('click', (event) => {
  event.preventDefault();
  popup.classList.remove('open');
  body.classList.remove('lock');

  form.submit();
})

  }
  
}

function validate(form) {
  let error = 0
  reqElements.forEach(item => {
    removeErrorStyle(item);
   if(item.value == '') {
   addErrorStyle(item);
    error++;}  
    else if(item.type != 'email' || validMail(item)) {
        item.classList.add('_valid');
        removeErrorStyle(item);
    } else {
      addErrorStyle(item);

      item.previousElementSibling.innerHTML = 'Wrong email format';
      error++
    }
  
  })
  return error;
}

function addErrorStyle(item) {
  if (!item.classList.contains('_invalid')){
    item.classList.add('_invalid');
    item.previousElementSibling.classList.remove('_hidden');
  }
  
}
function removeErrorStyle(item) {
  if (item.classList.contains('_invalid')) {
    item.classList.remove('_invalid');
    item.previousElementSibling.classList.add('_hidden');
  }
  
}

function validMail(item) {
  const regMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regMail.test(item.value);
}


})


