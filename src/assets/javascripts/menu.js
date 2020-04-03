const openerMenu = document.querySelector('.c-nav__toggle-input');
const menu = document.querySelector('.c-nav__menu');

openerMenu.addEventListener('click', function(){
  if(this.checked === true) {
    menu.classList.add('c-nav__menu--open');
  } else {
    menu.classList.remove('c-nav__menu--open');
  }
});