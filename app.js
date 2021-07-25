
$(document).ready(function(){
    waterTreat = conditioner // חומר טיפול במים: מרכך או סיליפוס
    faucets = 0 // ברזים
    systemHead = 0 // מחשב
    headPipe = 0 //צינור ראשי
    pipes = 0 //צינורות
    connects = 0 //מחברים
    sprayers = 0 //מתזים
    counterForId = 0
    countForName = 0

    waterClass = new WaterTreat();

    calculate()
    $("#systemTypes").change(function(){ // סוג מערכת

    });
    
    $("#panelsNumber").change(function(){ // מספר פאנלים
        /*
        Update things when panels num changes
        */
        // update num of panels per line
        var panelsNumber = parseInt($("#panelsNumber").val(), 10);
        var num = panelsNumber;
        if($("#linesNumber").val() != '') num = num / parseInt($("#linesNumber").val(), 10);
        $("#panelsNumberInLine").text(Math.round(num));
        // update num of Faucets
        var amountOfFaucets = Math.floor(panelsNumber / 50);
        if (parseInt($("#panelsNumber").val(),10) % 50 > 0) amountOfFaucets++;
        $("#faucetsNumber").val(amountOfFaucets)
        faucets = $("#faucetsNumber").val() * faucetPrice
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

    $(document).on('change', '.waterTreat', function(){ // טכנולוגיית טיפול במים
        // $(this).children().each(function () {alert($(this).attr('class'))})
        if($(this).children(".item").children('input[id$="0"]').is(':checked')) {
            waterTreat += conditioner
            waterTreat -= silipus
            calculate()
        }
        
        if($(this).children(".item").children('input[id$="1"]').is(':checked')) {
            waterTreat += silipus
            waterTreat -= conditioner
            calculate()
        }

        // else
        //     waterClass.changePrice(parseInt($(this).children(".item").children('.price').val(),10))
        
        
    });

    $(document).on('click', 'button[name^="btn waterTreat"]', function() {
        if($(this).attr('name') == 'btn waterTreat plus'){ 
            // create new item
            var parent = $(this).parent();
            var newItem = $(parent).clone();
            // change the btn to remove  btn
            var newBtn = newItem.children('.btn');
            newBtn.attr('name', 'btn waterTreat close').attr('style', 'background:crimson');
            newBtn.children().attr('class', 'fa fa-close')
            
            $(newItem).children().each(function(){
                if($(this).attr('class') === 'item question'){
                    $(this).children('input').attr('name', waterClass.addName());
                    newId = waterClass.addId();
                    $(this).children('input').attr('id', newId);
                    $(this).children('label').attr('for', newId);
                    $(this).children('input[value="conditioner"]').prop('checked', true); 
                    $(this).children('input[value="silipus"]').prop('checked', false);
                    
                }
            })

            // waterTreat += conditioner;
            // calculate();
            
            newItem.insertAfter(parent);
            //
            waterClass.addVar('conditioner', conditioner);
        }
        else { // btn-close waterTreat
            index = parseInt($(this).parent().children('.item').children('input').prop('name').substr(10), 10);
            alert(index)
            $(this).parent().remove(); 
            waterClass.remove(index)
        }
    })

    $('input[type="radio"]').on('deselect', function(){
        alert("deselect");
    });

    $(document).on('change', '.faucets', function(){ // ברזים
    });

    $("#faucetsNumber").change(function(){  // מספר ברזים
        faucets = Number($("#faucetsNumber").val()) * faucetPrice
        changeSystemHead()
        // calculate()
    });

    $(document).on('change', '.systemHead', function(){ // מחשב
        changeSystemHead()
    });

    $(document).on('change', '.main-pipe', function(){ // צינור ראשי
    });

    $(document).on('change', '.regular-pipe', function(){ // צינור לפאנל
    });

    $(document).on('change', '.regular-connect', function(){ // מחבר רגיל 
    });

    $(document).on('change', '.end-connect', function(){ // מחבר סוף
    });

    $(document).on('change', '#connectsShape', function(){  // צורת מחבר
        /*
        when the shape of the connect change. 
        open select options to select the type of all the opens מאפשר לבחור מאפיין לכל פיצול של המחבר
        */
       $(".newSelection").remove()
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
            if( $(this).val() == "1"){ // צינור
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
    
    class WaterTreat {
        constructor(){
            this.vars = []; // array of all the waterTreats - [type][price]
            this.addVar('conditioner', conditioner)
            this.counter = 1;
            this.counterForId = 0;
            // this.countForName = 0;
        }
        addVar(type, price){
            this.vars[this.counter] = new Array(2);
            this.vars[this.counter++] = [type, price];
    
            waterTreat += price
            calculate();
        }
        addName(){
            return "waterTreat" + this.counter;
        }
        addId(){
            return "waterTreat" + this.counter + ((this.counterForId++) % 2);
            
        }
        remove(index){
            waterTreat -= vars[index][1]; // the price
            calculate();
            array.splice(index, 1);
        }
        
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
