class Slider{
    static box = document.getElementById("slider-box");
    static sliderItems = document.querySelectorAll(".slider-item");

    constructor(sliderShow, main, extra){
        this.sliderShow = sliderShow;
        this.main = main;
        this.extra = extra;
    }

    addClassList(){
        this.sliderShow.classList.add("d-flex", "flex-nowrap", "overflow-hidden");
        this.main.classList.add("w-100");
        this.extra.classList.add("w-100");
    }

    initialize(){
        this.main.append(Slider.sliderItems[0]);
        this.sliderShow.append(this.main);
        Slider.box.append(this.sliderShow);
        console.log(Slider.box);
    }
}

class Show{

    static startSlider(){
        let slider = new Slider(
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div")
        );

        slider.addClassList();
        slider.initialize();
    }
}

Show.startSlider();
