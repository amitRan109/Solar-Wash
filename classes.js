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

