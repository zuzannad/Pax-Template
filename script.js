// const windowHeight = window.innerHeight;

// console.log(windowHeight);

// const returnScrollValue = function () {
//     const scrollValue = window.scrollY;
//     console.log(scrollValue);
// }

// document.addEventListener('scroll', returnScrollValue);

class Slider {
    constructor(elementSelector) {
        this.currentSlide = 0; //aktualny slide
        this.sliderSelector = elementSelector; //selektor elementu który zamienimy na slider
        this.elem = null; //tutaj pobierzemy element który zamienimy na slider
        this.slider = null; //tutaj wygenerujemy slider
        this.slides = null; //tutaj pobierzemy slajdy
        this.prev = null; //przycisk prev
        this.next = null; //przycisk next
        this.dots = []; //przyciski kropek

        this.generateSlider();
    }

    generateSlider() {
        //pobieramy element, który zamienimy na slider
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add('slider');
        //tworzymy kontener dla slajdów
        const slidesCnt = document.createElement('div');
        slidesCnt.classList.add('slider-ctn');
        //pobieramy element slajdów
        this.slides = this.slider.children;
        console.log(this.slides);
        //to jest żywa kolekcja, więc przy przeniesieniu każdego slajda
        //jej długość maleje
        while (this.slides.length) {
            this.slides[0].classList.add('main-quote');
            slidesCnt.appendChild(this.slides[0]);
        }

        //musimy na nowo pobrać slajdy, bo powyższa kolekcja jest już pusta
        this.slides = slidesCnt.querySelectorAll('.main-quote');
        //wygenerowaliśmy kontener ze slajdami, wstawiamy go więc do slidera
        this.slider.appendChild(slidesCnt);

        this.createPreviousAndNext();
        this.createDots();
    }

    createPreviousAndNext() {
        this.prev = document.createElement('div');
        this.prev.classList.add('slider-button');
        this.prev.classList.add('slider-prev-button');
        this.prev.textContent = '&lsaquo;';
        this.prev.addEventListener('click', this.slidePrev.bind(this));

        this.next = document.createElement('div');
        this.next.classList.add('slider-button');
        this.next.classList.add('slider-next-button');
        this.next.textContent = '&rsaquo;';
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

    changeSlide() {
        [].forEach.call(this.slides, function (slide) {
            slide.classList.remove('main-quote.active-opinion');
        });

        this.slides[index].classList.add('main-quote.active-opinion');

        this.dots.forEach(dot, function (dot) {
            dot.classList.remove('slider-dots-element-active');
        })

        this.dots[index].classList.add('slider-dots-element-active');
        this.currentSlide = index;
    }
}

const slide = new Slider('.opinion');