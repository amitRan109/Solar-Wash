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
    removeVar(index){
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
    changeAmount(index, amount){this.vars[index][2] = amount;}
    changePrice(index, price){ 
        if(price == undefined) price = 0 // if the num of faucts bigger then 9
        faucets -= this.vars[index][3]; 
        this.vars[index][3] = price;
        faucets += this.vars[index][3];
    }
    changeToDefaultPrice(index){ // price by default type price
        this.changePrice(index, faucetsPrice[this.vars[index][2]]);
    }
    addId(){ return "faucets" + this.counter;}
    removeVar(index){
        faucets -= this.vars[index][3];
        this.vars.splice(index, 1);
    }
}

class SystemHead {
    constructor(){
        this.vars = []; // array of all the waterTreats - [type][amount][price]
        this.counter = 0;
        this.counterForId = 0;
        this.addVar();
    }
    addVar(){ // init type=null, amount=0 price=0
        this.vars[this.counter] = [null, 0, 0];
        this.counter++;
    }
    changeType(index, type){ this.vars[index][0] = type;}
    changeAmount(index, amount){
        systemHead -= this.vars[index][1] * this.vars[index][2]; // price * amount
        this.vars[index][1] = amount;
        systemHead += this.vars[index][1] * this.vars[index][2];
    }
    changePrice(index, price){ 
        systemHead -= this.vars[index][1] * this.vars[index][2]; // price * amount
        this.vars[index][2] = price;
        systemHead += this.vars[index][1] * this.vars[index][2];
    }
    changeToDefaultPrice(index){ // price by default type price
        this.changePrice(index, ACPrice[1]);
    }
    addId(){ return "sysHead" + this.counter;}
    removeVar(index){
        systemHead -= this.vars[index][1] * this.vars[index][2];
        this.vars.splice(index, 1);
    }
}

class Pipe {
    constructor(){
        this.vars = []; // array of all the waterTreats - [diam][grade][metrer][price]
        this.counter = 0;
        this.counterForId = 0;
        this.addVar();
    }
    addVar(){ // init diam=0, grade=0, amount=0, price=0
        this.vars[this.counter] = [0, 0, 0, 0];
        this.counter++;
    }
    changeDiam(index, diam){ 
        pipes -= this.vars[index][2] * this.vars[index][3]; // price * meter
        this.vars[index][0] = diam;
        this.vars[index][3] = pipePrice[this.vars[index][1]][diam]; // init price
        pipes += this.vars[index][2] * this.vars[index][3];
    }
    changeGrade(index, grade){ 
        pipes -= this.vars[index][2] * this.vars[index][3]; // price * meter
        this.vars[index][1] = grade;
        this.vars[index][3] = pipePrice[grade][this.vars[index][0]]; // init price
        pipes += this.vars[index][2] * this.vars[index][3];
    }
    changeMeter(index, meter){
        pipes -= this.vars[index][2] * this.vars[index][3]; // price * meter
        this.vars[index][2] = meter;
        pipes += this.vars[index][2] * this.vars[index][3];
    }
    changePrice(index, price){ 
        pipes -= this.vars[index][2] * this.vars[index][3]; // price * meter
        this.vars[index][3] = price;
        pipes += this.vars[index][2] * this.vars[index][3];
    }
    changeToDefaultPrice(index){ // price by default type price
        this.changePrice(index, ACPrice[1]);
    }
    addIdForMain(){ return "mainPipe" + this.counter;}
    addIdForReg(){return "regPipe" + this.counter;}
    removeVar(index){
        pipes -= this.vars[index][2] * this.vars[index][3];
        this.vars.splice(index, 1);
    }
}

class RegConnector {
    constructor(){
        this.vars = []; // array of all the waterTreats - [type1][size1][type2][size2][type3][size3][shape][amount][price]
        this.counter = 0;
        this.counterForId = 0;
        this.addVar();
    }
    addVar(){ // init type1=null, size1=0, type2=null, size2=0, type3=null, size3=0, shape=null, amount=0, price=0
        this.vars[this.counter] = [null, 0, null, 0, null, 0, null, 0, 0];
        this.counter++;
    }
    changeShape(index, shape){
        this.vars[index][0] = shape;
    }
    changeType(index, typeNum, type){
        this.vars[index][typeNum+1] = type;
    }
    changeSize(index, sizeNum, size){
        var sizeidx = 0;
        switch(sizeNum){
            case 1: 
                sizeidx = 1;
                break;
            case 2: 
                sizeidx = 3;
                break;
            case 3: 
                sizeidx = 5;
                break;
        }
        this.vars[index][sizeidx] = size;
        console.log(this.vars[index])
    }
    changeAmount(index, amount){
        this.vars[index][7] = amount;
    }
    changePrice(index, price){
        this.vars[index][8] = price;
    }
}

class Amount {
    constructor(){

    }
    calculate(){
        amount = waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers
        changeAmount(amount);
    }
}

