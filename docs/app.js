$(document).ready(function(){
    // --------------- סוג מערכת ---------------
    $("#radio_1").change(radio_1_func);
    $("#radio_2").change(radio_2_func);
    
    // --------------- פאנלים ---------------
    $("#panelsNumber").change(panelsNumberFunc);
    $("#linesNumber").change(linesNumberFunc);

    // --------------- טכנולוגיית טיפול במים ---------------
    $(document).on('change', '.waterTreatRadio', waterTreatRadioFunc);
    $(document).on('change', '.waterTreatPrice', waterTreatPriceFunc);
    $(document).on('click', 'button[name^="btn waterTreat"]', waterTreatBtnFunc)

    // ---------------  ברזים וארונות  ---------------
    $(document).on('change', '.faucetsType', faucetsTypeFunc);
    $(document).on('change', '.faucetsSize', faucetsSizeFunc);
    $(document).on('change', '.faucetsAmount', faucetsAmountFunc);
    $(document).on('change', '.faucetsPrice', faucetsPriceFunc);
    $(document).on('click', 'button[name^="btn faucets"]', faucetsBtnFunc);

    // --------------- מחשב ---------------
    $(document).on('change', '.sysHeadType', sysHeadTypeFunc);
    $(document).on('change', '.sysHeadAmount', sysHeadAmountFunc);
    $(document).on('change', '.sysHeadPrice', sysHeadPriceFunc);
    $(document).on('click', 'button[name^="btn sysHead"]', sysHeadBtnFunc);

    // --------------- צינורות ---------------
    // ------ צינור ראשי ------
    $(document).on('change', '.mainPipeDiam', mainPipeDiamFunc);
    $(document).on('change', '.mainPipeGrade', mainPipeGradeFunc);
    $(document).on('change', '.mainPipeMeter', mainPipeMeterFunc);
    $(document).on('change', '.mainPipePrice', mainPipePriceFunc);
    $(document).on('click', 'button[name^="btn mainPipe"]', mainPipeBtnFunc);

    // ------ צינור לפאנל ------
    $(document).on('change', '.regPipeDiam', regPipeDiamFunc);
    $(document).on('change', '.regPipeGrade', regPipeGradeFunc);
    $(document).on('change', '.regPipeMeter', regPipeMeterFunc);
    $(document).on('change', '.regPipePrice', regPipePriceFunc);
    $(document).on('click', 'button[name^="btn regPipe"]', regPipeBtnFunc);
    
    // --------------- מחברים ---------------
    // ------ מחבר רגיל  ------
    $(document).on('change', '.regConnectorShape', regConnectorShapeFunc);
    $(document).on('change', '.regConnectorExitType', regConnectorExitTypeFunc);
    $(document).on('change', '.regConnectorDiamOrSize', regConnectorDiamOrSizeFunc);
    $(document).on('change', '.regConnectorAmount', regConnectorAmountFunc);
    $(document).on('change', '.regConnectorPrice', regConnectorPriceFunc);

    // ------ מחבר סוף  ------
    $(document).on('change', '.endConnectorType', endConnectorTypeFunc);
    $(document).on('change', '.endConnectorExitType', endConnectorExitTypeFunc);
    $(document).on('change', '.endConnectorDiamOrSize', endConnectorDiamOrSizeFunc);

    // --------------- מתזים ---------------
    $("#sprayPanelRatio").change(sprayPanelRatioFunc);

    // --------------- חישוב ---------------
    $(".btn-block").click(btnBlockFunc);

});


// --------------- סוג מערכת ---------------
function radio_1_func(){
    $(".hydraulic").remove();
}

function radio_2_func(){
    // add hydraulic design
    var designItem = $('<div>').addClass("item");
    designItem.append($("<label>").text("עלות תכנון"));
    var designInput = $('<input>').attr('type', 'number').attr('min',0);
    designItem.append(designInput);

    var engItem = $('<div>').addClass("item");
    engItem.append($("<label>").text("עלות פיקוח מהנדס"));
    var engInput = $('<input>').attr('type', 'number').attr('min',0);
    engItem.append(engInput);

    var hydPriceItem = $('<div>').addClass("name-item");
    hydPriceItem.append(designItem);
    hydPriceItem.append(engItem);

    var hydItem = $('<div>').addClass("hydraulic");
    hydItem.append($("<label>").text("תכנון הידראולי"));
    hydItem.append(hydPriceItem);

    $($(this).parent()).after(hydItem);
};

// --------------- פאנלים ---------------
function panelsNumberFunc(){ // מספר פאנלים
    /*
    Update things when panels num changes
    */
    // update num of panels per line
    var panelsNumber = Number($("#panelsNumber").val());
    var num = panelsNumber;
    if($("#linesNumber").val() != '') num = num / Number($("#linesNumber").val());
    $("#panelsNumberInLine").text(Math.round(num));
    // // update num of Faucets
    // var amountOfFaucets = Math.floor(panelsNumber / 50);
    // if (Number($("#panelsNumber").val()) % 50 > 0) amountOfFaucets++;
    // $("#faucetsNumber").val(amountOfFaucets)
    // faucets = $("#faucetsNumber").val() * faucetPrice
    // update num of sprayers
    ratio = 1.5
    if($("#SprayPanelRatio").val() != '') ratio = $("#SprayPanelRatio").val()
    $("#sprayersNumber").val(panelsNumber * ratio)
    calculate()
}

function linesNumberFunc(){ // מספר שורות בפאנלים
    var panelsNumber = Number($("#panelsNumber").val());
    if($("#linesNumber").val() != '') panelsNumber = panelsNumber / Number($("#linesNumber").val());
    $("#panelsNumberInLine").text(Math.round(panelsNumber));
}

// --------------- טכנולוגיית טיפול במים ---------------
function waterTreatRadioFunc(){ // בחירת טכנולוגיה
    input = $(this).children('.item').children('input[id$="0"]');
    index = Number(input.prop('name').substr(10));
    if(input.is(':checked')) waterClass.changeType(index, 'conditioner');
    else waterClass.changeType(index, 'silipus');
    waterClass.changeToDefaultPrice(index);
    $(this).parent().children('.waterTreatPrice').children('input').val(waterClass.vars[index][1]);
    calculate();
};

function waterTreatPriceFunc(){ // שינוי מחיר טכנ' טיפול במים
    index = Number($(this).parent().children('.waterTreatRadio').children('.item').children('input').prop('name').substr(10));
    var val = $(this).children('input').val();
    if(Number(val) < 0) return; // not allow negative price
    else waterClass.changePrice(index, Number(val));
    calculate();
};

function waterTreatBtnFunc() { // הוספת ומחיקת טכנ' טיפול במים
    if($(this).attr('name') == 'btn waterTreat plus'){ 
        // create new item
        var parent = $(this).parent();
        var newItem = $(parent).clone();
        // change the btn to remove  btn
        var newBtn = newItem.children('.btn');
        newBtn.attr('name', 'btn waterTreat close').attr('style', 'background:crimson');
        newBtn.children().attr('class', 'fa fa-close')
        // init values
        newItem.children('.waterTreatRadio').children().each(function(){
            if($(this).attr('class') === 'item question radio-c'){
                $(this).children('input').attr('name', waterClass.addName());
                newId = waterClass.addId();
                $(this).children('input').attr('id', newId);
                $(this).children('label').attr('for', newId);
                $(this).children('input[value="conditioner"]').prop('checked', false); 
                $(this).children('input[value="silipus"]').prop('checked', false);
            }
        })
        newItem.children('.waterTreatPrice').children('input').val('');
        // add the new item
        newItem.insertAfter(parent);
        waterClass.addVar();
    }
    else { // btn-close waterTreat
        index = Number($(this).parent().children('.waterTreatRadio').children('.item').children('input').prop('name').substr(10));
        $(this).parent().remove(); 
        waterClass.removeVar(index);
        calculate();
    }
};

// ---------------  ברזים וארונות  ---------------
function faucetsTypeFunc(){ // סוג ברז
    index = Number($(this).parent().attr('id').substr(7));
    faucetsClass.changeType(index, $(this).children('select').val());
    $(this).parent().children('.faucetsAmount').trigger('change');
};
function faucetsSizeFunc(){ // גודל ברז
    index = Number($(this).parent().attr('id').substr(7));
    faucetsClass.changeSize(index, Number($(this).children('select').val()));
};
function faucetsAmountFunc(){ // כמות ברזים
    index = Number($(this).parent().attr('id').substr(7));
    val = $(this).children('input').val();
    if(val == '') {val = 1; $(this).children('input').val(1);}
    faucetsClass.changeAmount(index, Number(val));
    faucetsClass.changeToDefaultPrice(index);
    $(this).parent().children('.faucetsPrice').children('input').val(faucetsClass.vars[index][3]);
    calculate();
};
function faucetsPriceFunc(){ // מחיר ברז
    index = Number($(this).parent().attr('id').substr(7));
    faucetsClass.changePrice(index, Number($(this).children('input').val()));
    calculate();
};
function faucetsBtnFunc() { // הוספת ומחיקת ברזים
    if($(this).attr('name') == 'btn faucets plus'){ 
        // create new item
        var parent = $(this).parent();
        var newItem = $(parent).clone();
        // change the btn to remove  btn
        var newBtn = newItem.children('.btn');
        newBtn.attr('name', 'btn faucets close').attr('style', 'background:crimson');
        newBtn.children().attr('class', 'fa fa-close')
        // change id of class faucets
        newItem.attr('id', faucetsClass.addId());
        // init values
        newItem.children('.faucetsAmount').children('input').val('');
        newItem.children('.faucetsPrice').children('input').val('');
        // add the itm to faucets class
        faucetsClass.addVar();
        newItem.insertAfter(parent);
    }
    else { // btn faucets close
        index = Number($(this).parent().attr('id').substr(7));
        $(this).parent().remove(); 
        faucetsClass.removeVar(index);
        calculate();
    }
};

// --------------- מחשב ---------------
function sysHeadTypeFunc(){ // סוג מחשב
    index = Number($(this).parent().parent().attr('id').substr(7));
    sysHeadClass.changeType(index, $(this).val());
    amount = $(this).parent().parent().children().children('.sysHeadAmount')
    if(amount.val() == '') {amount.val(1);sysHeadClass.changeAmount(index, 1);}
    sysHeadClass.changeToDefaultPrice(index);
    $(this).parent().parent().children().children('.sysHeadPrice').val(sysHeadClass.vars[index][2]);
    calculate();
};
function sysHeadAmountFunc(){ // כמות מחשבים
    index = Number($(this).parent().parent().attr('id').substr(7));
    sysHeadClass.changeAmount(index, Number($(this).val()));
    calculate();
};
function sysHeadPriceFunc(){ // מחיר מחשב
    index = Number($(this).parent().parent().attr('id').substr(7));
    var val = $(this).val();
    if(Number(val) < 0) return; // not allow negative price
    sysHeadClass.changePrice(index, Number(val));
    calculate();
};
function sysHeadBtnFunc() { // הוספת ומחיקת מחשבים
    if($(this).attr('name') == 'btn sysHead plus'){ 
        // create new item
        var parent = $(this).parent();
        var newItem = $(parent).clone();
        // change the btn to remove  btn
        var newBtn = newItem.children('.btn');
        newBtn.attr('name', 'btn sysHead close').attr('style', 'background:crimson');
        newBtn.children().attr('class', 'fa fa-close')
        // change id of class sysHead
        newItem.attr('id', sysHeadClass.addId());
        // init values
        newItem.children().children('.sysHeadAmount').val('');
        newItem.children().children('.sysHeadPrice').val('');
        // add the itm to faucets class
        sysHeadClass.addVar();
        newItem.insertAfter(parent);
    }
    else { // btn sysHead close
        index = Number($(this).parent().attr('id').substr(7));
        $(this).parent().remove(); 
        sysHeadClass.removeVar(index);
        calculate();
    }
};

// --------------- צינורות ---------------
// ------ צינור ראשי ------
function mainPipeDiamFunc(){ // קוטר צינור
    index = Number($(this).parent().parent().attr('id').substr(8));
    mainPipeClass.changeDiam(index, $(this).val());
    $(this).parent().parent().children().children('.mainPipePrice').val(mainPipeClass.vars[index][3])
    calculate();
};
function mainPipeGradeFunc(){ // דרג צינור
    index = Number($(this).parent().parent().attr('id').substr(8));
    mainPipeClass.changeGrade(index, Number($(this).val()));
    $(this).parent().parent().children().children('.mainPipePrice').val(mainPipeClass.vars[index][3])
    calculate();
};
function mainPipeMeterFunc(){ // מטרים 
    index = Number($(this).parent().parent().attr('id').substr(8));
    val = $(this).val();
    mainPipeClass.changeMeter(index, Number(val));
    calculate();
};
function mainPipePriceFunc(){ // מחיר צינור
    index = Number($(this).parent().parent().attr('id').substr(8));
    mainPipeClass.changePrice(index, Number($(this).val()));
    calculate();
};

function mainPipeBtnFunc() { // הוספת ומחיקת מחשבים
    if($(this).attr('name') == 'btn mainPipe plus'){ 
        // create new item
        var parent = $(this).parent();
        var newItem = $(parent).clone();
        // change the btn to remove  btn
        var newBtn = newItem.children('.btn');
        newBtn.attr('name', 'btn mainPipe close').attr('style', 'background:crimson');
        newBtn.children().attr('class', 'fa fa-close')
        // change id of class sysHead
        newItem.attr('id', mainPipeClass.addIdForMain());
        // init values
        newItem.children().children('.mainPipeMeter').val('');
        newItem.children().children('.mainPipePrice').val('');
        // add the itm to faucets class
        mainPipeClass.addVar();
        newItem.insertAfter(parent);
    }
    else { // btn sysHead close
        index = Number($(this).parent().attr('id').substr(8));
        $(this).parent().remove(); 
        mainPipeClass.removeVar(index);
        calculate();
    }
};

// ------ צינור לפאנל ------
function regPipeDiamFunc(){ // קוטר צינור
    index = Number($(this).parent().parent().attr('id').substr(7));
    regPipeClass.changeDiam(index, $(this).val());
    $(this).parent().parent().children().children('.regPipePrice').val(regPipeClass.vars[index][3]);
    calculate();
};
function regPipeGradeFunc(){ // דרג צינור
    index = Number($(this).parent().parent().attr('id').substr(7));
    regPipeClass.changeGrade(index, Number($(this).val()));
    $(this).parent().parent().children().children('.regPipePrice').val(regPipeClass.vars[index][3]);
    calculate();
};
function regPipeMeterFunc(){ // מטרים 
    index = Number($(this).parent().parent().attr('id').substr(7));
    val = $(this).val();
    regPipeClass.changeMeter(index, Number(val));
    calculate();
};
function regPipePriceFunc(){ // מחיר צינור
    index = Number($(this).parent().parent().attr('id').substr(7));
    regPipeClass.changePrice(index, Number($(this).val()));
    calculate();
};
function regPipeBtnFunc() { // הוספת ומחיקת מחשבים
    if($(this).attr('name') == 'btn regPipe plus'){ 
        // create new item
        var parent = $(this).parent();
        var newItem = $(parent).clone();
        // change the btn to remove  btn
        var newBtn = newItem.children('.btn');
        newBtn.attr('name', 'btn regPipe close').attr('style', 'background:crimson');
        newBtn.children().attr('class', 'fa fa-close')
        // change id of class sysHead
        newItem.attr('id', regPipeClass.addIdForReg());
        // init values
        newItem.children().children('.regPipeMeter').val('');
        newItem.children().children('.regPipePrice').val('');
        // add the itm to faucets class
        regPipeClass.addVar();
        newItem.insertAfter(parent);
    }
    else { // btn sysHead close
        index = Number($(this).parent().attr('id').substr(7));
        $(this).parent().remove(); 
        regPipeClass.removeVar(index);
        calculate();
    }
};

// --------------- מחברים ---------------
// ------ מחבר רגיל  ------
function regConnectorShapeFunc(){  // צורת מחבר
   // cleanup
   $('.regConnectorExitType').parent().remove();
   $('.regConnectorDiamOrSize').parent().remove();
   // add items
   var shape = Number($(this).val())
   num = shape == 1 ? 2 : shape;
   for(i= num-1; i >= 0; i--){
        var id = ("regConnectorExitType"+(i+1))
        var options = connectorType;
        var newItem = $('<div>').addClass("item");
        newItem.append($("<label>").attr('id', "label"+i).text('סוגי חיבורים ליציאה ' + (i+1)));
        $($(this).parent()).after(newItem);
        afterValue = '#label'+i;
        classValue = 'regConnectorExitType';
        appendSelection(id, options, afterValue, classValue);
   }
   // add the var to class
   index = Number($(this).parent().parent().attr('id').substr(12));
   regConnector.changeShape(index, shape);
};
function regConnectorExitTypeFunc() { // סוג יציאה מחבר (צינור או ברז)
    /* 
    when new selection create during the run chnage.
    when you choose the type you can choose the diameter. therefore is create new selection to choose it.
    */
    // make the option of the type
    var idNum = $(this).attr('id').substr($(this).attr('id').length-1);
    $("#regConnectorDiamOrSize"+ idNum).parent().remove(); // remove the current selection to create the new
    var value = []
    var type = $(this).val();
    if(type == ''){
        return;
    }
    if(type == 'pipe'){
        value = diamOfPipeForSelection
        var newItem = $('<div>').addClass("item");
        newItem.append($("<label>").attr('id', 'label'+idNum).text('קוטר ליציאה ' + idNum));
        $($(this).parent()).after(newItem);
    }
    else { // faucet
        value = sizeOfFaucetForSelection
        var newItem = $('<div>').addClass("item");
        newItem.append($("<label>").attr('id', 'label'+idNum).text('גודל ליציאה ' + idNum));
        $($(this).parent()).after(newItem);
    }
    appendSelection("regConnectorDiamOrSize"+ idNum, value, "#label" + idNum, 'regConnectorDiamOrSize');
    // add the type to the class
    index = Number($(this).parent().parent().attr('id').substr(12));
    console.log(idNum)
    regConnector.changeType(index, idNum, type);

};
function regConnectorDiamOrSizeFunc() { // גודל או קוטר יציאה מחבר
    // add the type to the class
    index = Number($(this).parent().parent().attr('id').substr(12));
    var idNum = $(this).attr('id').substr($(this).attr('id').length-1);
    regConnector.changeSize(index, Number(idNum), Number($(this).val()));
};
function regConnectorAmountFunc(){
};
function regConnectorPriceFunc(){
};

// ------ מחבר סוף  ------
function endConnectorTypeFunc(){
};
function endConnectorExitTypeFunc(){
};
function endConnectorDiamOrSizeFunc(){
};

// --------------- מתזים ---------------
function sprayPanelRatioFunc(){ // יחס פאנל מתז
    ratio = 1.5
    if($("#SprayPanelRatio").val() != '') ratio = $("#SprayPanelRatio").val()
    $("#sprayersNumber").val(Number($("#panelsNumber").val()) * ratio)
}

// --------------- חישוב ---------------
function btnBlockFunc(){
    client_details = [$("#clientName").val(), $("#clientAddress").val(), $("Date").val()]
}

// helpers
function calculate(){
    $("#finalAmount").text(waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers)
}