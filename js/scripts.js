const Tinyone = {
    i: 0,
    allowScroll: true,
    container: document.querySelector('.container'),
    topValue: 0,
    downArrow: document.querySelector('.downArrow'),
    totalPage: document.querySelectorAll('.page'),

    topNavBtn: document.querySelector('#topNavBtn'),
    menuPage:  document.querySelector('#menuPage'),
    changePage: function(e) {
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
                    Tinyone.container.style.top = `${Tinyone.topValue}px`; 
                }
            }
            if (e.deltaY > 0) {            
                if(Tinyone.topValue != -`${(Tinyone.totalPage.length-1)*vh}`) {
                    Tinyone.topValue += -vh;
                    Tinyone.container.style.top = `${Tinyone.topValue}px`;
                }
            }
        }
    },
    fullScreenMenu: function(e) {
        // Tinyone.topNavBtn.classList.toggle('showFullScreenMenu');
        Tinyone.menuPage.classList.toggle('showFullScreenMenu');
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