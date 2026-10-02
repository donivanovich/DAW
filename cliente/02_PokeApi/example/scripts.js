window.addEventListener("load", function(){
    
    let input1 = document.getElementsByClassName("input1");
    input1 = input1[0];

    input1.addEventListener("change", function(){
        console.log(this.value);
    })

    let input2 = document.querySelectorAll("#form1 .form-input-container");
    //console.log(input2[0].children);
    fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => {
        response.text().then((value) => {
            console.log(value);
        });

        /*response.json().then((value) => {
            console.log(value);
        })*/
    });

   
});


let pruebaEvento = function(){

    alert("hols");
}