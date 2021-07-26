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
        this.vars[0] = ['conditioner', conditioner];
        waterTreat += conditioner
        // calculate();
        this.counter = 1;
        this.counterForId = 0;
    }
    addVar(type, price){
        this.vars[this.counter] = new Array(2);
        this.vars[this.counter] = [type, price];
        waterTreat += price
        this.counter++;
    }
    addName(){ return "waterTreat" + this.counter;}
    addId(){ return "waterTreat" + this.counter + ((this.counterForId++) % 2);}
    changePrice(index, price, type=null){
        if(type != null) this.vars[index][0] = type;
        waterTreat -= this.vars[index][1]; // remove old price
        this.vars[index][1] = price;
        waterTreat += price; // add new price
    }
    changeToDefaultPrice(index){
        if(this.vars[index][0] == 'conditioner') this.changePrice(index, conditioner);
        else this.changePrice(index, silipus);
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
    addVar(){
        this.vars[this.counter] = [null, null, null, null];
        this.counter++;
    }
    changeType(index, type){ this.vars[index][0] = type;}
    changeSize(index, size){ this.vars[index][1] = size;}
    changeAmount(index, amount){ this.vars[index][2] = amount;}
    changePrice(index, price){ this.vars[index][3] = price;}
    addId(){ return "faucets" + this.counter;}
    remove(index){
        this.vars.splice(index, 1);
    }
}

