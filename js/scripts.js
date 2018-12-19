const Tinyone = {
    i: 0,
    allowScroll: true,
    container: document.querySelector('.container'),
    topValue: 0,
    downArrow: document.querySelector('.downArrow'),
    totalPage: document.querySelectorAll('.page'),
    topNavBtn: document.querySelector('#topNavBtn'),
    menuPage:  document.querySelector('#menuPage'),
    menuLinks: document.querySelectorAll('.fullScreenMenu__list__item__link'),
    activeClass: 'fullScreenMenu__list__item__link--active',
    container: document.querySelector('#container'),
    topNav: document.querySelector('#topNav'),
    logo: document.querySelector('.topNav__logo'),
    changePage: function(e) {
        Tinyone.container.classList.add('pageScrollAnimation');
        e.preventDefault();
        let vh = window.innerHeight;
        let top = Math.abs(Number(getComputedStyle(Tinyone.container).top.slice(0, -2)));

        if(Tinyone.allowScroll) {
            Tinyone.allowScroll = false;
            setTimeout(() => {Tinyone.allowScroll = true;},1000);
            if (e.deltaY < 0) {            
                if(Tinyone.topValue !== 0) {
                    Tinyone.topValue += vh;
                    Tinyone.i--;
                    Tinyone.container.style.top = `${Tinyone.topValue}px`; 
                }                
                
                Tinyone.menuLinks.forEach((el) => {
                    el.classList.remove(Tinyone.activeClass);
                });
                Tinyone.menuLinks[Tinyone.i].classList.add(Tinyone.activeClass);
            }
            if (e.deltaY > 0) {            
                if(Tinyone.topValue != -`${(Tinyone.totalPage.length-1)*vh}`) {
                    Tinyone.topValue += -vh;
                    Tinyone.i++;
                    Tinyone.container.style.top = `${Tinyone.topValue}px`;
                }

                Tinyone.menuLinks.forEach((el) => {
                    el.classList.remove(Tinyone.activeClass);
                });
                Tinyone.menuLinks[Tinyone.i].classList.add(Tinyone.activeClass);
            }
        }
        if(Tinyone.i > 0) {
            setTimeout(() => {
                Tinyone.logo.style.display = "none";
            },300);
            
        }else {
            setTimeout(() => {
                Tinyone.logo.style.display = "block";
            },1000);
        }
    },
    fullScreenMenu: function() {
        Tinyone.topNav.classList.toggle('hideElementsInTopNav');
        Tinyone.topNavBtn.classList.toggle('fullScreenBtnStyle');
        Tinyone.menuPage.classList.toggle('showFullScreenMenu');
        if(Tinyone.i > 0) {
            Tinyone.logo.style.display = "none";
        }else {
            Tinyone.logo.style.display = "block";
        }
    },
    clickingLinks: function(e) {        
        Tinyone.container.classList.remove('pageScrollAnimation');
        for(let i = 0; i < Tinyone.menuLinks.length; i++) {
            Tinyone.menuLinks[i].setAttribute('data-index',i);
            Tinyone.menuLinks[i].setAttribute('data-vh',-i*window.innerHeight);
        }
        e.preventDefault();
        Tinyone.menuLinks.forEach((el) => {
            el.classList.remove(Tinyone.activeClass);
        });
        e.target.classList.add(Tinyone.activeClass);

        Tinyone.i = Number(e.target.getAttribute('data-index'));
        Tinyone.topValue = Number(e.target.getAttribute('data-vh'));
        Tinyone.container.style.top = `${Tinyone.topValue}px`;
        Tinyone.fullScreenMenu();
    }
}


document.addEventListener('wheel',Tinyone.changePage);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('keydown',function(e){
    if(e.key == "-" || e.key == "+" || e.key == "=") {
        e.preventDefault();
    }
});


Tinyone.topNavBtn.addEventListener('click',Tinyone.fullScreenMenu);

Tinyone.downArrow.addEventListener('click',function(){
    Tinyone.container.classList.add('pageScrollAnimation'); 
    Tinyone.topValue += -window.innerHeight;
    Tinyone.i++;
    Tinyone.container.style.top = `${Tinyone.topValue}px`;
    if(Tinyone.i > 0) {
        setTimeout(() => {
            Tinyone.logo.style.display = "none";
        },300);
        
    }else {
        setTimeout(() => {
            Tinyone.logo.style.display = "block";
        },1000);
    }
});

Tinyone.menuLinks.forEach((el) => {
    el.addEventListener('click',Tinyone.clickingLinks);
});