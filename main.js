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
    // 各WrapperElement
    static sliderBox = document.getElementById("slider-box");
    static selectedBox = document.getElementById("selected-box");
    static selectBtn = document.getElementById("select-btn");
    static submitBtn = document.getElementById("submit-btn");

    constructor(sliderShow, main, extra, items){
        this.sliderShow = sliderShow;
        this.main = main;
        this.extra = extra;
        this.items = items;
        this.sliderItems = this.createSliderElement(items);
    }

    // スライダーのElementにクラス追加
    addClass(){
        this.sliderShow.classList.add("d-flex", "flex-nowrap", "overflow-hidden");
        this.main.classList.add("mx-auto");
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

    // 選択された商品部分作成
    createSelectedElement(){
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        div1.classList.add("col-3");
        div2.classList.add("col-3");

        let h2 = document.createElement("h2");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");
        h2.classList.add("rounded", "py-4", "bg-dark");

        // 初期値設定
        h2.innerHTML = 1;
        h4.innerHTML = this.items[0].price;
        p.innerHTML = this.items[0].name.toUpperCase();

        div1.append(h2);
        div2.append(p, h4);
        Slider.selectedBox.append(div1, div2);
    }

    // スライダーのボタン作成
    createButtonElement(){
        for(let i = 1; i <= this.sliderItems.length; i++){
            let button = document.createElement("button");
            button.classList.add("btn", "btn-outline-light", "col-3", "m-1");
            button.innerHTML = i;
            document.getElementById("select-btn").append(button);
        }
    }

    // 選択したボタンによって動きを変える
    slideJump(start, end){
        if(start != end){
            let currentItem = this.sliderItems[start-1];
            let nextItem = this.sliderItems[end-1];
    
            let point = Math.floor(this.sliderItems.length / 2);
            let distance = end - start;
    
            let animationType = "left";
            if( distance >= 0 && distance <= point || 
                distance < 0 && Math.abs(distance) > point){
                    animationType = "right";
            }
    
            this.animationMain(currentItem, nextItem, animationType);
        }
    }

    // スライダーアニメーション
    animationMain(currentItem, nextItem, animationType){
        this.main.innerHTML = "";
        this.main.append(nextItem);

        this.extra.innerHTML = "";
        this.extra.append(currentItem);

        this.main.classList.add("expand-animation");
        this.extra.classList.add("deplete-animation");

        if(animationType === "right"){
            this.sliderShow.innerHTML = "";
            this.sliderShow.append(this.extra);
            this.sliderShow.append(this.main);
        }
        else if(animationType === "left"){
            this.sliderShow.innerHTML = "";
            this.sliderShow.append(this.main);
            this.sliderShow.append(this.extra);
        }
    }
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
        Show.addEventListenerForSubmit(slider);
    }

    // スライダー要素を追加し、表示する
    static appendElement(slider){
        slider.addClass();

        // スライダー画像の初期値設定
        slider.main.append(slider.sliderItems[0]);
        slider.sliderShow.append(slider.main);
        Slider.sliderBox.append(slider.sliderShow);

        // 選択商品追加
        slider.createSelectedElement();
        // ボタンを追加
        slider.createButtonElement();
    }

    // スライダー用ボタンにevent設定
    static addEventListner(slider){
        const buttons = document.querySelectorAll("#select-btn button");

        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", function(){
                let currentNum = parseInt(Slider.selectedBox.getElementsByTagName("h2")[0].innerHTML);
                let nextNum = parseInt(buttons[i].innerHTML);
                // 選択された商品を表示
                Slider.selectedBox.getElementsByTagName("h2")[0].innerHTML = nextNum;
                Slider.selectedBox.getElementsByTagName("p")[0].innerHTML = slider.items[i].name.toUpperCase();
                Slider.selectedBox.getElementsByTagName("h4")[0].innerHTML = `$${slider.items[i].price}`;

                // スライダー実行
                slider.slideJump(currentNum, nextNum);
            });
        }
    }

    // submitボタンにevent設定
    static addEventListenerForSubmit(){
        Slider.submitBtn.addEventListener("click", function(){
            alert(
                `
                【${Slider.selectedBox.getElementsByTagName("p")[0].innerHTML}】を購入しました。
                只今、ラテアート作成中です。しばらくお待ちください。
                `
                );
        });
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

