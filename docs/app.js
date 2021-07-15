// const amount = new Amount();
waterTreat = 0 // חומר טיפול במים: מרכך או סיליפוס
faucets = 0 // ברזים
systemHead = 0 // מחשב
headPipe = 0 //צינור ראשי
pipes = 0 //צינורות
connects = 0 //מחברים
sprayers = 0 //מתזים

$(document).ready(function(){

    $("#panelsNumber").change(function(){
        var amountOfFaucets = Math.floor(parseInt($("#panelsNumber").val(),10) / 50);
        if (parseInt($("#panelsNumber").val(),10) % 50 > 0) amountOfFaucets++;
        $("#faucetsNumber").val(amountOfFaucets)
        faucets = $("#faucetsNumber").val() * 200
        calculate()
    });

    $("input:radio").change(function(){
        if($('#radio_1').is(':checked')) {
            // alert('a')
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

    function amount(value){
        $("#finalAmount").text(value)
    }
    function calculate(){
        // alert("cal")
        amount(waterTreat + faucets + systemHead + headPipe + pipes + connects + sprayers)
        // $("#inPrice").val("כלול במחיר: "+)
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