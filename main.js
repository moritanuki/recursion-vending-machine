class Item{
    constructor(index, name, price){
        this.index = index;
        this.name = name;
        this.price = price;
    }
}

class Slider{
    static box = document.getElementById("slider-box");

    constructor(sliderShow, main, extra, items){
        this.sliderShow = sliderShow;
        this.main = main;
        this.extra = extra;
        this.sliderItems = this.createSliderItems(items);
    }

    createSliderItems(items){
        let itemsElement = [];
        for(let i = 0; i < items.length; i++){

            let div = document.createElement("div");
            div.classList.add("py-4", "slider-item");

            let img = document.createElement("img");
            img.classList.add("d-block", "mx-auto", "rounded");
            img.src = `images/${items[i].name}.png`;
            img.alt = `Latte art ${items[i].name}`;

            div.append(img);
            itemsElement.push(div);
        }
        return itemsElement;
    }

    appendElement(){
        this.sliderShow.classList.add("d-flex", "flex-nowrap", "overflow-hidden");
        this.main.classList.add("w-100");
        this.extra.classList.add("w-100");

        this.main.append(this.sliderItems[0]);
        this.sliderShow.append(this.main);
        Slider.box.append(this.sliderShow);
    }

    slideJump(){
        
    }

    animationMain(currentItem, nextItem){

    }
}

class Show{

    static startSlider(items){
        let slider = new Slider(
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div"),
            items
        );

        slider.appendElement();
    }
}

const lattes = {
    "heart1": 4.10,
    "heart2": 4.10,
    "dragon": 4.50,
    "friends": 4.60,
    "leaf1": 4.20,
    "leaf2": 4.20,
    "marble": 4.00,
    "pegasus": 4.40,
    "swan": 4.30,
};

let items = [];
let latteKeys = Object.keys(lattes);
for(let i = 0; i < latteKeys.length; i++){
    let item = new Item(i, latteKeys[i], lattes[latteKeys[i]]);
    items.push(item);
}

Show.startSlider(items);
