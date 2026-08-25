// theme switching
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const sunDarkThemeSwitchEl = document.querySelector('.sun-fill-dark');
const sunLightThemeSwitchEl = document.querySelector('.sun-fill-light');

function switchTheme(e) {
    console.log('switch theme');
    if (e.target.checked) {
        console.log('checked');
        document.documentElement.setAttribute('data-theme', 'dark');
        sunDarkThemeSwitchEl.styles.display = 'none';
        sunLightThemeSwitchEl.styles.display = 'block';
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        sunDarkThemeSwitchEl.styles.display = 'block';
        sunLightThemeSwitchEl.styles.display = 'none';
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

const topNavbar = document.querySelector('#topNavigationBar');
window.addEventListener('scroll', function () {
    // style navbar on scroll
    // console.log('Scrolled!', window.scrollY);
    if(window.scrollY > 0) {
        topNavbar.classList.add('shadow-sm');
    }
    else {
        topNavbar.classList.remove('shadow-sm');
    }
  });

//   document.addEventListener("DOMContentLoaded", function () {
//     console.log('theme switch checkbox', document.querySelector('.theme-switch input[type="checkbox"]'));
//     document.querySelector('.theme-switch input[type="checkbox"]').checked = true;
//     document.documentElement.setAttribute('data-theme', 'dark');
//     sunDarkThemeSwitchEl.styles.display = 'none';
//     sunLightThemeSwitchEl.styles.display = 'block';
//   });