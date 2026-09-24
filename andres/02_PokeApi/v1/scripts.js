const formulario = document.getElementById("form1");
const inputNumber = document.getElementById("inputNumber");
const inputName = document.getElementById("inputName");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const numero = inputNumber.value;

    if (numero === "") {
        alert("Introduce un numero de pokedex");
        return;
    }

    try {

        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + numero
        );

        if (!respuesta.ok) {
            throw new Error("Pokemon no encontrado");
        }

        const pokemon = await respuesta.json();

        inputName.value = pokemon.name;

    } catch (error) {

        inputName.value = "";

        alert("No se ha encontrado el pokemon");

    }
});