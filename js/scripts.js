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
    changePage: function(e) {
        Tinyone.container.classList.add('pageScrollAnimation');
        e.preventDefault();
        // let totalPage = 6;
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
    },
    fullScreenMenu: function() {
        Tinyone.topNavBtn.classList.toggle('fullScreenBtnStyle');
        Tinyone.menuPage.classList.toggle('showFullScreenMenu');
        // Tinyone.container.classList.add('pageScrollAnimation');
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
        // console.log(e.target);
        
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
    Tinyone.topValue += -window.innerHeight;
    Tinyone.container.style.top = `${Tinyone.topValue}px`;
});

Tinyone.menuLinks.forEach((el) => {
    // el.classList.remove(Tinyone.activeClass);
    el.addEventListener('click',Tinyone.clickingLinks);
});