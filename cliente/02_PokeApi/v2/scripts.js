const formulario = document.getElementById("form1");
const inputNumber = document.getElementById("inputNumber");
const inputName = document.getElementById("inputName");

async function getPokemonById(id) {
    try {
        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + id
        );

        if (!respuesta.ok) {
            throw new Error("Pokemon no encontrado");
        }

        const pokemon = await respuesta.json();

        return pokemon;

    } catch (error) {
        throw error;
    }
}

async function getAllPokemons() {
    try {
        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=10"
        );

        if (!respuesta.ok) {
            throw new Error("No se han podido obtener los Pokemon");
        }

        const datos = await respuesta.json();

        return datos.results;

    } catch (error) {
        throw error;
    }
}

async function getPokemonsAbility(abilityName) {
    try {
        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/ability/" + abilityName.toLowerCase()
        );

        if (!respuesta.ok) {
            throw new Error("Habilidad no encontrada");
        }

        const habilidad = await respuesta.json();

        return habilidad.pokemon.slice(0, 10);

    } catch (error) {
        throw error;
    }
}

async function getPokemonType(typeName) {
    try {
        const respuesta = await fetch(
            "https://pokeapi.co/api/v2/type/" + typeName.toLowerCase()
        );

        if (!respuesta.ok) {
            throw new Error("Tipo no encontrado");
        }

        const tipo = await respuesta.json();

        return tipo.pokemon.slice(0, 10);

    } catch (error) {
        throw error;
    }
}

async function getPokemonAbility(id, abilityName) {
    try {
        const pokemon = await getPokemonById(id);

        const habilidadEncontrada = pokemon.abilities.find(
            habilidad =>
                habilidad.ability.name.toLowerCase() ===
                abilityName.toLowerCase()
        );

        if (!habilidadEncontrada) {
            throw new Error("El Pokemon no tiene esa habilidad");
        }

        return pokemon.name;

    } catch (error) {
        throw error;
    }
}

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const numero = inputNumber.value;

    if (numero === "") {
        alert("Introduce un numero de pokedex");
        return;
    }

    try {
        const pokemon = await getPokemonById(numero);

        inputName.value = pokemon.name;

    } catch (error) {
        inputName.value = "";

        alert("No se ha encontrado el pokemon");
    }
});

const btnAllPokemons = document.getElementById("btnAllPokemons");

btnAllPokemons.addEventListener("click", async function() {

    try {
        const pokemons = await getAllPokemons();

        for (let i = 0; i < 10; i++) {
            document.getElementById("pokemon" + (i + 1)).value =
                pokemons[i].name;
        }

    } catch (error) {
        alert("No se han podido cargar los Pokemon");
    }
});

const btnAbility = document.getElementById("btnAbility");
const inputAbilityName = document.getElementById("inputAbilityName");

btnAbility.addEventListener("click", async function() {

    const abilityName = inputAbilityName.value;

    if (abilityName === "") {
        alert("Introduce una habilidad");
        return;
    }

    try {
        const pokemons = await getPokemonsAbility(abilityName);

        for (let i = 0; i < 10; i++) {

            const input = document.getElementById(
                "abilityPokemon" + (i + 1)
            );

            if (pokemons[i]) {
                input.value = pokemons[i].pokemon.name;
            } else {
                input.value = "";
            }
        }

    } catch (error) {
        alert("No se ha encontrado esa habilidad");
    }
});

const btnType = document.getElementById("btnType");
const inputTypeName = document.getElementById("inputTypeName");

btnType.addEventListener("click", async function() {

    const typeName = inputTypeName.value;

    if (typeName === "") {
        alert("Introduce un tipo");
        return;
    }

    try {
        const pokemons = await getPokemonType(typeName);

        for (let i = 0; i < 10; i++) {

            const input = document.getElementById(
                "typePokemon" + (i + 1)
            );

            if (pokemons[i]) {
                input.value = pokemons[i].pokemon.name;
            } else {
                input.value = "";
            }
        }

    } catch (error) {
        alert("No se ha encontrado ese tipo");
    }
});

const btnPokemonAbility =
    document.getElementById("btnPokemonAbility");

const inputAbilityPokemonId =
    document.getElementById("inputAbilityPokemonId");

const inputAbilityPokemonName =
    document.getElementById("inputAbilityPokemonName");

const pokemonAbilityResult =
    document.getElementById("pokemonAbilityResult");

btnPokemonAbility.addEventListener("click", async function() {

    const id = inputAbilityPokemonId.value;
    const abilityName = inputAbilityPokemonName.value;

    if (id === "" || abilityName === "") {
        alert("Introduce el ID y la habilidad");
        return;
    }

    try {
        const pokemonName = await getPokemonAbility(
            id,
            abilityName
        );

        pokemonAbilityResult.value = pokemonName;

    } catch (error) {
        pokemonAbilityResult.value = "";

        alert("El Pokemon no tiene esa habilidad");
    }
});