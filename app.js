
$(document).ready(function(){
    
    waterTreat = 0 // חומר טיפול במים: מרכך או סיליפוס
    faucets = 0 // ברזים
    systemHead = 0 // מחשב
    headPipe = 0 //צינור ראשי
    pipes = 0 //צינורות
    connects = 0 //מחברים
    sprayers = 0 //מתזים

    waterClass = new WaterTreat();
    faucetsClass = new Faucets();

    // calculate();
    // --------------- סוג מערכת ---------------
    $("#systemTypes").change(function(){ 
    });
    
    // --------------- פאנלים ---------------
    $("#panelsNumber").change(function(){ // מספר פאנלים
        /*
        Update things when panels num changes
        */
        // update num of panels per line
        var panelsNumber = parseInt($("#panelsNumber").val(), 10);
        var num = panelsNumber;
        if($("#linesNumber").val() != '') num = num / parseInt($("#linesNumber").val(), 10);
        $("#panelsNumberInLine").text(Math.round(num));
        // // update num of Faucets
        // var amountOfFaucets = Math.floor(panelsNumber / 50);
        // if (parseInt($("#panelsNumber").val(),10) % 50 > 0) amountOfFaucets++;
        // $("#faucetsNumber").val(amountOfFaucets)
        // faucets = $("#faucetsNumber").val() * faucetPrice
        // update num of sprayers
        ratio = 1.5
        if($("#SprayPanelRatio").val() != '') ratio = $("#SprayPanelRatio").val()
        $("#sprayersNumber").val(panelsNumber * ratio)
        calculate()
    });

    $("#linesNumber").change(function(){ // מספר שורות בפאנלים
        var panelsNumber = parseInt($("#panelsNumber").val(), 10);
        if($("#linesNumber").val() != '') panelsNumber = panelsNumber / parseInt($("#linesNumber").val(), 10);
        $("#panelsNumberInLine").text(Math.round(panelsNumber));
    });

    // --------------- פאנלים ---------------
    $(document).on('change', '.waterTreatRadio', function(){ // טכנולוגיית טיפול במים
        index = parseInt($(this).children('.item').children('input').prop('name').substr(10), 10);
        
        if($(this).children(".item").children('input[id$="0"]').is(':checked')) {
            waterClass.changeType(index, 'conditioner')
            // waterClass.changePrice(index, conditioner, 'conditioner');
            // if($(this).parent().children('.waterTreatPrice') == '') changeToDefaultPrice(index);
            // calculate();
        }
        
        if($(this).children(".item").children('input[id$="1"]').is(':checked')) {
            waterClass.changeType(index, 'silipus')
            // waterClass.changePrice(index, silipus, 'silipus');
            // if($(this).parent().children('.waterTreatPrice') == '') changePrice(index, conditionerPrice)
            // calculate();
        }
        if($(this).parent().children('.waterTreatPrice').val() == '') waterClass.changeToDefaultPrice(index);
        calculate();

    });
    $(document).on('change', '.waterTreatPrice', function(){ // שינוי מחיר טכנ' טיפול במים
        index = parseInt($(this).parent().children('.waterTreatRadio').children('.item').children('input').prop('name').substr(10), 10);
        if($(this).children('input').val() == '') waterClass.changeToDefaultPrice(index)
        else waterClass.changePrice(index, parseInt($(this).children('input').val(), 10));
        calculate();
    });

    $(document).on('click', 'button[name^="btn waterTreat"]', function() { // הוספת ומחיקת טכנ' טיפול במים
        if($(this).attr('name') == 'btn waterTreat plus'){ 
            // create new item
            var parent = $(this).parent();
            var newItem = $(parent).clone();
            // change the btn to remove  btn
            var newBtn = newItem.children('.btn');
            newBtn.attr('name', 'btn waterTreat close').attr('style', 'background:crimson');
            newBtn.children().attr('class', 'fa fa-close')
            
            $(newItem).children('.waterTreatRadio').children().each(function(){
                if($(this).attr('class') === 'item question'){
                    $(this).children('input').attr('name', waterClass.addName());
                    newId = waterClass.addId();
                    $(this).children('input').attr('id', newId);
                    $(this).children('label').attr('for', newId);
                    $(this).children('input[value="conditioner"]').prop('checked', false); 
                    $(this).children('input[value="silipus"]').prop('checked', false);
                    
                }
            })

            newItem.insertAfter(parent);
            waterClass.addVar();
            calculate();
        }
        else { // btn-close waterTreat
            index = parseInt($(this).parent().children('.waterTreatRadio').children('.item').children('input').prop('name').substr(10), 10);
            $(this).parent().remove(); 
            waterClass.remove(index);
            calculate();
        }
    })

    // ---------------  ברזים וארונות  ---------------
    $(document).on('change', '.faucetsType', function(){ // סוג ברז
        // alert($(this).children('select').val())
        index = Number($(this).parent().attr('id').substr(7));
        faucetsClass.changeType(index, $(this).children('select').val());
    });
    $(document).on('change', '.faucetsSize', function(){ // גודל ברז
        alert($(this).children('select').val())
        index = Number($(this).parent().attr('id').substr(7));
        faucetsClass.changeSize(index, Number($(this).children('select').val()));
    });
    $(document).on('change', '.faucetsAmount', function(){ // כמות ברזים
        alert($(this).children('input').val())
        index = Number($(this).parent().attr('id').substr(7));
        faucetsClass.changeAmount(index, Number($(this).children('input').val()));
        calculate();
    });
    $(document).on('change', '.faucetsPrice', function(){ // מחיר ברז
        alert($(this).children('input').val())
        index = Number($(this).parent().attr('id').substr(7));
        faucetsClass.changePrice(index, Number($(this).children('input').val()));
        calculate();
    });

    $(document).on('click', 'button[name^="btn faucets"]', function() { // הוספת ומחיקת ברזים
        if($(this).attr('name') == 'btn faucets plus'){ 
            // create new item
            var parent = $(this).parent();
            var newItem = $(parent).clone();
            // change the btn to remove  btn
            var newBtn = newItem.children('.btn');
            newBtn.attr('name', 'btn faucets close').attr('style', 'background:crimson');
            newBtn.children().attr('class', 'fa fa-close')
            // change id of class faucets
            $(this).attr('id', faucetsClass.addId())
            newItem.insertAfter(parent);
            faucetsClass.addVar();
            // calculate();
        }
        else { // btn faucets close
            index = Number($(this).parent().attr('id').substr(7));
            $(this).parent().remove(); 
            faucetsClass.remove(index);
            calculate();
        }
    });

    // $("#faucetsNumber").change(function(){  // מספר ברזים
    //     faucets = Number($("#faucetsNumber").val()) * faucetPrice
    //     changeSystemHead()
    //     // calculate()
    // });

    // --------------- מחשב ---------------
    $(document).on('change', '.systemHead', function(){ // מחשב
        changeSystemHead()
    });

    // --------------- צינורות ---------------
    $(document).on('change', '.main-pipe', function(){ // צינור ראשי
    });

    $(document).on('change', '.regular-pipe', function(){ // צינור לפאנל
    });
    
    // --------------- מחברים ---------------
    $(document).on('change', '.regular-connect', function(){ // מחבר רגיל 
    });

    $(document).on('change', '.end-connect', function(){ // מחבר סוף
    });

    $(document).on('change', '#connectsShape', function(){  // צורת מחבר
        /*
        when the shape of the connect change. 
        open select options to select the type of all the opens מאפשר לבחור מאפיין לכל פיצול של המחבר
        */
       $(".newSelection").remove();
       var shape = parseInt($("#connectsShape").val(), 10)
       num = shape == 1 ? 2 : shape;
       for( i=0; i < num; i++){
        var id = ("exitSelect "+(i+1))
        var options = [
            {val : 0, text: ''},
            {val : 1, text: 'צינור'},
            {val : 2, text: 'ברז'},
        ];
        var newItem = $('<div>').addClass("item");
        newItem.append($("<label>").attr('id', "label0").text('סוגי חיבורים ליציאה' + (i+1)));
        $($(this).parent()).after(newItem);
        appendSelection(id, options, '#label0');
       }
    })

    $(document).on('change', '.sprayer', function(){ // מתזים
    });

    $("#SprayPanelRatio").change(function(){ // יחס פאנל מתז
        ratio = 1.5
        if($("#SprayPanelRatio").val() != '') ratio = $("#SprayPanelRatio").val()
        $("#sprayersNumber").val(parseInt($("#panelsNumber").val(), 10) * ratio)
    });

   
    $(document).on('change', '.newSelection', function() {
        /* 
        when new selection create during the run chnage.
        when you choose the type you can choose the diameter. therefore is create new selection to choose it.
        */
        if($(this).attr('id').includes('exitSelect')){ //צינור או ברז
            // make the option of the type
            var idNum = $(this).attr('id')[11];
            $("#diamORsizeSelect"+ idNum).remove(); // remove the current selection to create the new
            var value = []
            if( $(this).children('select').val() == "1"){ // צינור
                value = diamOfPipeForSelection
                value[0] = {val: 0, text: ''+ idNum}
                var newItem = $('<div>').addClass("item");
                newItem.append($("<label>").attr('id', 'label'+idNum).text('קוטר ליציאה ' + idNum));
                $($(this).parent()).after(newItem);
            }
            else { // ברז
                value = sizeOfFaucetForSelection
                value[0] = {val: 0, text: 'גודל ליציאה '+ idNum}
                var newItem = $('<div>').addClass("item");
                newItem.append($("<label>").attr('id', 'label'+idNum).text('גודל ליציאה ' + idNum));
                $($(this).parent()).after(newItem);
            }
            appendSelection("diamORsizeSelect"+ idNum, value, "#label" + idNum)
            
       }
    })

    // $(document).on('click', '.btn', function() {
    //     if($(this).attr('name') == 'btn-plus'){ // create new item
    //         var parent = $(this).parent();
    //         var newItem = $(parent).clone();
    //         var newBtn = newItem.children('.btn');
    //         newBtn.attr('name', 'btn-close').attr('style', 'background:crimson');
    //         newBtn.children().attr('class', 'fa fa-close')

    //         // change the id of the childs so we wont have prob. :)
    //         countForName++;
    //         $(newItem).children().each(function () {
    //             var id = $(this).attr('id');
    //             var _for = $(this).attr('for');
    //             if(typeof id !== 'undefined' && id !== false) {
    //                 $(this).attr('id', id + (++counterForId));
    //                 var name = $(this).attr('name');
    //                 if($(this).attr('type') === 'radio') $(this).attr('name', name + countForName);
    //             }
    //             if(typeof _for !== 'undefined' && _for !== false) {
    //                 $(this).attr('for', _for + counterForId);
    //             }
    //             $(this).children().each(function () { // if the item has childrens that also have id
    //                 var id = $(this).attr('id');
    //                 var _for = $(this).attr('for');
    //                 if(typeof id !== 'undefined' && id !== false) {
    //                     $(this).attr('id', id + (++counterForId));
    //                     var name = $(this).attr('name');
    //                     if($(this).attr('type') === 'radio') $(this).attr('name', name + countForName);
    //                 }
    //                 if(typeof _for !== 'undefined' && _for !== false) {
    //                     $(this).attr('for', _for + counterForId);
    //                 }
    //             })
    //         });
    //         newItem.insertAfter(parent);
    //     }
    //     if($(this).attr('name') == 'btn-close'){ // delete item
    //         $(this).parent().remove();
    //     }
    // })

    $(".btn-block").click(function(){
        client_details = [$("#clientName").val(), $("#clientAddress").val(), $("Date").val()]
    })

    // helper functions
    function changeSystemHead(){
        numOfFaucents = Number($("#faucetsNumber").val())
        if($("#systemHead").val() == 1) {
            systemHead = acPrice[numOfFaucents]
        }
        else {
            systemHead = dcPrice[numOfFaucents]
        }
        calculate()
    }

    

    function appendSelection(id, options, afterValue){
        /*
        make selection after the "afterValue" 
        */
        var sel = $('<select>').addClass("newSelection").attr('id', id).attr('style',"width:150px; margin-left: 2px; margin-right:2px")
        $(afterValue).after(sel)
        $(options).each(function() {
        sel.append($("<option>").attr('value',this.val).text(this.text));
        });

    }
    function calculate(){
        $("#finalAmount").text(waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers)
    }
    
    function changeAmount(amount){
        $("#finalAmount").text(amount);
    }

});



 // function addToFinalAmount(value){
    //     var currentAmount = parseInt($("#finalAmount").text());
    //     $("#finalAmount").text(currentAmount + value);
    // }
    
    
    // function waterTreatAmount(value){
    //     if(waterTreatAmount == 0) waterTreatAmount = value
    //     else if(value == 7200) addToFinalAmount(-5)
    //     else addToFinalAmount(-7200)
    
    //     addToFinalAmount(value)
    // }

    // function amount(value){
    //     $("#finalAmount").text(value)
    // }
