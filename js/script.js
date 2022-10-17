class Slider {
    constructor(props) {
        const { slider, sliderLine, nextBtn, prevBtn, sliderTransition, dir, autoPlay} = props;
        this.slider = document.querySelector(slider);
        this.sliderLine = document.querySelector(sliderLine);
        this.nextBtn = document.querySelector(nextBtn);
        this.prevBtn = document.querySelector(prevBtn);
        this.slides = this.sliderLine.children;

        this.height = this.slider.clientHeight;
        this.width = this.slider.clientWidth;
        this.activeSlide = 0;
        this.dir = dir ? dir : 'X';
        this.movieSize = this.dir == 'Y' ? this.height : this.width;
        this.sliderTransition = sliderTransition;

        this.sliderLine.style = `position: relative;
                                height: ${this.height}px;
                                overflow: hidden;
                                `;
        
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style = `position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    `;  
        
        if (i !== this.activeSlide) {
            this.slides[i].style.transform = `translate${this.dir}(${this.movieSize}px)`;
        }
        if (i === this.slides.length - 1) {
            this.slides[i].style.transform = `translate${this.dir}(${-this.movieSize}px)`;
        }
    }

    // autoPlay
    if (autoPlay) this.startInterval();
    this.slider.addEventListener('mouseenter', () => clearInterval(this.interval));
    this.slider.addEventListener('mouseleave', () => this.startInterval());

    // btns
    this.nextBtn.addEventListener('click', () => this.move(this.nextBtn));
    this.prevBtn.addEventListener('click', () => this.move(this.prevBtn));
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.move(this.nextBtn)
        }, this.sliderTransition * 2 * 2);
    }

    move(btn) {
        let movieSize = btn === this.nextBtn ? -this.movieSize : this.movieSize;

        btn.disabled = true;

        setTimeout(() => {
            btn.disabled = false;
        }, this.sliderTransition + 10);

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = '0ms';
            if (i !== this.activeSlide) {
                this.slides[i].style.transform = `translate${this.dir}(${-movieSize}px)`;
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${movieSize}px)`;
        this.slides[this.activeSlide].style.transition = `${this.sliderTransition}ms`;

        if (btn == this.nextBtn) {
            if (this.activeSlide < this.slides.length - 1) {
                this.activeSlide++;
            } else {
                this.activeSlide = 0;
            }
        } else {
            if (this.activeSlide == 0) {
                this.activeSlide = this.slides.length - 1;
            } else {
                this.activeSlide--;
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
        this.slides[this.activeSlide].style.transition = `${this.sliderTransition}ms`;
    }
}

new Slider ({
    slider: '.slider',
    sliderLine: '.slider__line',
    nextBtn: '.slider__next',
    prevBtn: '.slider__prev',
    sliderTransition: 500,
    dir: 'X',
    autoPlay: true,
})