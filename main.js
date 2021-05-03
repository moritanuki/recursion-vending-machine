class Item{
    constructor(index, name, price){
        this.index = index;
        this.name = name;
        this.price = price;
    }

    // Itemクラスのインスタンスリスト生成
    static generateItems(hashmap){
        let items = [];
        let keys = Object.keys(hashmap);
        for(let i = 0; i < keys.length; i++){
            let item = new Item(i, keys[i], hashmap[keys[i]]);
            items.push(item);
        }
        return items;
    }
}

class Slider{
    // スライダー用のWrapperElement
    static box = document.getElementById("slider-box");

    constructor(sliderShow, main, extra, items){
        this.sliderShow = sliderShow;
        this.main = main;
        this.extra = extra;
        this.items = items;
        this.sliderItems = this.createSliderElement(items);
    }

    // スライダーのWrapperElementにクラス追加
    addClass(){
        this.sliderShow.classList.add("d-flex", "flex-nowrap", "overflow-hidden");
        this.main.classList.add("w-100");
        this.extra.classList.add("w-100");
    }

    // スライダーの画像部分作成
    createSliderElement(items){
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

    slideJump(){
        
    }

    animationMain(currentItem, nextItem){

    }
}

class Selected{
    // 選択された商品を表示するWrapperElement
    static box = document.getElementById("selected-box");
}

class Show{

    static startSlider(lattes){
        // Sliderクラスのインスタンス生成
        let slider = new Slider(
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div"),
            Item.generateItems(lattes)
        );

        Show.appendElement(slider);
        Show.addEventListner(slider);
    }

    // スライダー要素を追加し、表示する
    static appendElement(slider){
        slider.addClass();

        // スライダー画像の初期値設定
        slider.main.append(slider.sliderItems[0]);
        slider.sliderShow.append(slider.main);
        Slider.box.append(slider.sliderShow);

        // ボタンを追加
        Show.createButtonElement(slider);
    }

    // スライダーのボタン作成
    static createButtonElement(slider){
        for(let i = 1; i <= slider.sliderItems.length; i++){
            let button = document.createElement("button");
            button.classList.add("btn", "btn-outline-light", "col-3", "m-1");
            button.innerHTML = i;
            document.getElementById("btn-data").append(button);
        }
    }

    // スライダー用ボタンにeventListner設定
    static addEventListner(slider){
        const buttons = document.querySelectorAll("#btn-data button");
        const box = document.getElementById("selected-box");
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", function(){
                const num = buttons[i].innerHTML;
                // 選択された商品を表示
                box.getElementsByTagName("h2")[0].innerHTML = num;
                box.getElementsByTagName("p")[0].innerHTML = slider.items[i].name.toUpperCase();
                box.getElementsByTagName("h4")[0].innerHTML = `$${slider.items[i].price}`;
            });
        }
    }
}


// 画像の名前と値段
const lattes = {
    "heart1": "4,10",
    "heart2": "4,10",
    "dragon": "4,50",
    "friends": "4,60",
    "leaf1": "4,20",
    "leaf2": "4,20",
    "marble": "4,00",
    "pegasus": "4,40",
    "swan": "4,30",
};

// ここから実行
Show.startSlider(lattes);

