class MenuHamburger {
    constructor(elementMenu, elementHamburger) {
        this.menu = document.querySelector(elementMenu);
        this.iconHamburger = document.querySelector(elementHamburger);
        this.menuElements = [...document.querySelectorAll(`${elementMenu} li a`)];

        this.iconHamburger.addEventListener('click', this.showMenu.bind(this));
        console.log(this.menu);
    }

    showMenu() {
        this.menu.style.display = 'block';
        console.log(this.menuElements);
        this.menuElements.forEach(liElement => {
            liElement.classList.remove('active');
        });
    }
}

const menuHamburger = new MenuHamburger('.menu-items', '.fas.fa-bars.mobile');

class ArrowTop {
    constructor(elementArrow) {
        this.arrow = document.querySelector(elementArrow);
        this.arrowVisible = false;

        window.addEventListener('scroll', this.countScroll.bind(this));
        this.arrow.addEventListener('click', this.toTheTop.bind(this));
    }

    countScroll() {
        const scrollValue = window.scrollY;
        if (scrollValue > (window.innerHeight / 2)) {
            this.arrowVisible = true;
            this.showArrow();
        } else {
            this.arrowVisible = false;
            this.hideArrow();
        }
    }

    showArrow() {
        if (this.arrowVisible) {
            this.arrow.style.display = 'block';
        }
    }

    hideArrow() {
        if (!this.arrowVisible) {
            this.arrow.style.display = 'none';
        }
    }

    toTheTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

const arrowTop = new ArrowTop('div.arrow');


class Slider {
    constructor(elementSelector) {
        this.currentSlide = 0;
        this.sliderSelector = elementSelector;
        this.elem = null;
        this.slider = null;
        this.slides = null;
        this.prev = null;
        this.next = null;
        this.dots = [];
        this.generateDots = true;
        this.generatePrevNext = true;

        this.generateSlider();
        this.changeSlide(this.currentSlide);
    }

    generateSlider() {
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add('slider');
        const slidesCnt = document.createElement('div');
        slidesCnt.classList.add('slider-ctn');
        this.slides = this.slider.children;
        while (this.slides.length) {
            this.slides[0].classList.add('main-quote');
            slidesCnt.appendChild(this.slides[0]);
        }
        this.slides = slidesCnt.querySelectorAll('.main-quote');
        this.slider.appendChild(slidesCnt);
        this.createPreviousAndNext();
        this.createDots();
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currentSlide);
    }

    slideNext() {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.changeSlide(this.currentSlide);
    }

    changeSlide(index) {
        [].forEach.call(this.slides, function (slide) {
            slide.classList.remove('active-opinion');
        });

        this.slides[index].classList.add('active-opinion');

        if (this.generateDots) {
            this.dots.forEach(function (dot) {
                dot.classList.remove('slider-dots-element-active');
            })
            this.dots[index].classList.add('slider-dots-element-active');
        }
        this.currentSlide = index;
    }

    createPreviousAndNext() {
        this.prev = document.createElement('button');
        this.prev.type = 'button';
        this.prev.classList.add('slider-button');
        this.prev.classList.add('slider-prev-button');
        this.prev.textContent = '<';
        this.prev.addEventListener('click', this.slidePrev.bind(this));

        this.next = document.createElement('button');
        this.next.type = 'button';
        this.next.classList.add('slider-button');
        this.next.classList.add('slider-next-button');
        this.next.textContent = '>';
        this.next.addEventListener('click', this.slideNext.bind(this));

        const nav = document.createElement('div');
        nav.classList.add('slider-nav');
        nav.appendChild(this.prev);
        nav.appendChild(this.next);
        this.slider.appendChild(nav);
    }

    createDots() {
        const ulDots = document.createElement('ul');
        ulDots.classList.add('slider-dots');

        for (let i = 0; i < this.slides.length; i++) {
            const li = document.createElement('li');
            li.classList.add('slider-dots-element');
            const btn = document.createElement('button');
            btn.classList.add('slider-dot');
            btn.type = 'button';
            btn.innerText = i + 1;
            btn.addEventListener('click', function () {
                this.changeSlide(i);
            }.bind(this));
            li.appendChild(btn);
            ulDots.appendChild(li);
            this.dots.push(li);
        }

        this.slider.appendChild(ulDots);
    }
}

const slide = new Slider('.slides');