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
    topNavList: document.querySelector('#topNavList'),
    lowScreenSize: 1024,
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
        if(Tinyone.i === Tinyone.totalPage.length-1) {
            setTimeout(() => {
                Tinyone.topNavBtn.classList.add('white');
                Tinyone.topNavList.classList.add('whiteIcons');
            },800);
        }else {
            setTimeout(() => {
                Tinyone.topNavBtn.classList.remove('white');
            Tinyone.topNavList.classList.remove('whiteIcons');
            },200);
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
        if(Tinyone.i === Tinyone.totalPage.length-1) {
            Tinyone.topNavBtn.classList.add('white');
            Tinyone.topNavList.classList.add('whiteIcons');
        }else {
            Tinyone.topNavBtn.classList.remove('white');
            Tinyone.topNavList.classList.remove('whiteIcons');
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
    },
    clickingLinksNarrowWind: function(e){
        Tinyone.fullScreenMenu();
        Tinyone.menuLinks.forEach((el) => {
            el.classList.remove(Tinyone.activeClass);
        });
        e.target.classList.add(Tinyone.activeClass);
        // Tinyone.menuLinks[Tinyone.i].classList.add(Tinyone.activeClass);

        e.preventDefault();
        let clickedPage = e.target.getAttribute('data-page');
        window.scrollTo(0,0);
        let pageDistanceFromTop = document.querySelector(`.page--${clickedPage}`).getBoundingClientRect().top;
        window.scrollTo(0,pageDistanceFromTop);
    },
    downArrowBehaviour: function(){
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
    },
    lowResolutionStyle: function() {
        if(window.innerWidth < Tinyone.lowScreenSize) {
            Tinyone.container.style.top = '0px';
            Tinyone.topValue = 0;
            Tinyone.i = 0;
            document.removeEventListener('wheel',Tinyone.changePage);
            Tinyone.logo.style.display = "block";
            Tinyone.downArrow.removeEventListener('click',Tinyone.downArrowBehaviour);

            Tinyone.menuLinks.forEach((el) => {
                el.removeEventListener('click',Tinyone.clickingLinks);
                el.addEventListener('click',Tinyone.clickingLinksNarrowWind);
            });
        }else {
            window.scrollTo(0, 0);
            Tinyone.container.style.top = '0px';
            Tinyone.topValue = 0;
            Tinyone.i = 0;
            document.addEventListener('wheel',Tinyone.changePage);
            Tinyone.menuLinks.forEach((el) => {
                el.removeEventListener('click',Tinyone.clickingLinksNarrowWind);
            });
            Tinyone.downArrow.addEventListener('click',Tinyone.downArrowBehaviour);
            
            Tinyone.menuLinks.forEach((el) => {
                el.addEventListener('click',Tinyone.clickingLinks);
            });

            Tinyone.menuLinks.forEach((el) => {
                el.classList.remove(Tinyone.activeClass);
            });
            Tinyone.menuLinks[Tinyone.i].classList.add(Tinyone.activeClass);
        }
    }
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('keydown',function(e){
    if(e.key == "-" || e.key == "+" || e.key == "=") {
        e.preventDefault();
    }
});

Tinyone.topNavBtn.addEventListener('click',Tinyone.fullScreenMenu);

Tinyone.menuLinks.forEach((el) => {
    el.addEventListener('click',Tinyone.clickingLinks);
});

window.addEventListener('load',Tinyone.lowResolutionStyle);
window.addEventListener('resize',Tinyone.lowResolutionStyle);