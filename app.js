waterTreat = 0 // חומר טיפול במים: מרכך או סיליפוס
faucets = 0 // ברזים
systemHead = 0 // מחשב
headPipe = 0 //צינור ראשי
pipes = 0 //צינורות
connects = 0 //מחברים
sprayers = 0 //מתזים
counterForId = 0
countForName = 0

$(document).ready(function(){
    
    $("#panelsNumber").change(function(){
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

    $(document).on('change', 'input:radio', function(){
        if($('#radio_1').is(':checked')) {
            waterTreat = conditioner
            calculate()
        }
        
        if($('#radio_2').is(':checked')) {
            waterTreat = silipus
            calculate()
        }
        
    });

    $("#faucetsNumber").change(function(){
        faucets = Number($("#faucetsNumber").val()) * faucetPrice
        changeSystemHead()
        // calculate()
    });

    $("#systemHead").change(function(){
        changeSystemHead()
    });

    $("#linesNumber").change(function(){
        var panelsNumber = parseInt($("#panelsNumber").val(), 10);
        if($("#linesNumber").val() != '') panelsNumber = panelsNumber / parseInt($("#linesNumber").val(), 10);
        $("#panelsNumberInLine").text(Math.round(panelsNumber));
    });

    $("#SprayPanelRatio").change(function(){
        ratio = 1.5
        if($("#SprayPanelRatio").val() != '') ratio = $("#SprayPanelRatio").val()
        $("#sprayersNumber").val(parseInt($("#panelsNumber").val(), 10) * ratio)
    });

    $("#connectsShape").change(function(){
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
    $(document).on('click', '.btn', function() {
        if($(this).attr('name') == 'btn-plus'){ // create new item
            var parent = $(this).parent();
            var newItem = $(parent).clone();
            var newBtn = newItem.children('.btn');
            newBtn.attr('name', 'btn-close').attr('style', 'background:crimson');
            newBtn.children().attr('class', 'fa fa-close')

            // change the id of the childs so we wont have prob. :)
            countForName++;
            $(newItem).children().each(function () {
                var id = $(this).attr('id');
                var _for = $(this).attr('for');
                if(typeof id !== 'undefined' && id !== false) {
                    $(this).attr('id', id + (++counterForId));
                    var name = $(this).attr('name');
                    if($(this).attr('type') === 'radio') $(this).attr('name', name + countForName);
                }
                if(typeof _for !== 'undefined' && _for !== false) {
                    $(this).attr('for', _for + counterForId);
                }
            });
            newItem.insertAfter(parent);
        }
        if($(this).attr('name') == 'btn-close'){ // delete item
            $(this).parent().remove();
        }
    })

    // helper functions
    function changeSystemHead(){
        numOfFaucents = Number($("#faucetsNumber").val())
        if($("#systemHead").val() == 1) {
            systemHead = ac[numOfFaucents]
        }
        else {
            systemHead = dc[numOfFaucents]
        }
        calculate()
    }

    function calculate(){
        $("#finalAmount").text(waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers)
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

});

class Amount{
    constructor(){
        alert("cons")
        waterTreat = 0 // חומר טיפול במים: מרכך או סיליפוס
        faucets = 0 // ברזים
        systemHead = 0 // מחשב
        headPipe = 0 //צינור ראשי
        pipes = 0 //צינורות
        connects = 0 //מחברים
        sprayers = 0 //מתזים
    }

    calculate(){
        alert("cal")
        amount(waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers)
    }
}


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
