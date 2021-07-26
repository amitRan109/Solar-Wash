class Amount {
    constructor(){

    }
    calculate(){
        amount = waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers
        changeAmount(amount);
    }
}

class WaterTreat {
    constructor(){
        this.vars = []; // array of all the waterTreats - [type][price]
        this.vars[0] = [null, 0];
        this.counter = 1;
        this.counterForId = 0;
    }
    addVar(){ // init type=null, price=0
        this.vars[this.counter] = [null, 0];
        this.counter++;
    }
    addName(){ return "waterTreat" + this.counter;}
    addId(){ return "waterTreat" + this.counter + ((this.counterForId++) % 2);}
    changePrice(index, price){
        waterTreat -= this.vars[index][1]; // remove old price
        this.vars[index][1] = price;
        waterTreat += price; // add new price
    }
    changeToDefaultPrice(index){ // price by default type price
        if(this.vars[index][0] == 'conditioner') this.changePrice(index, conditionerPrice);
        else this.changePrice(index, silipusPrice);
    }
    changeType(index, type){
        this.vars[index][0] = type;
    }
    remove(index){
        waterTreat -= this.vars[index][1]; // remove old price
        this.vars.splice(index, 1);
    }
    
}

class Faucets {
    constructor(){
        this.vars = []; // array of all the waterTreats - [type][size][amount][price]
        this.counter = 0;
        this.counterForId = 0;
        this.addVar();
    }
    addVar(){ // init type=null, size=0, amount=0, price=0
        this.vars[this.counter] = [null, 0, 0, 0];
        this.counter++;
    }
    changeType(index, type){ this.vars[index][0] = type;}
    changeSize(index, size){ this.vars[index][1] = size;}
    changeAmount(index, amount){ 
        faucets -= this.vars[index][3] * this.vars[index][2]; // price * amount
        this.vars[index][2] = amount;
        faucets += this.vars[index][3] * this.vars[index][2]; 
    }
    changePrice(index, price){ 
        faucets -= this.vars[index][3] * this.vars[index][2]; // price * amount
        this.vars[index][3] = price;
        faucets += this.vars[index][3] * this.vars[index][2];
    }
    changeToDefaultPrice(index){ // price by default type price
        this.vars[index][3] = faucetsPrice[this.vars[index][2]]; // the price is by the anoumt of faucets
    }
    addId(){ return "faucets" + this.counter;}
    remove(index){
        this.vars.splice(index, 1);
    }
}

