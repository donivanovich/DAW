const API_URL = "https://pokeapi.co/api/v2";
const KANTO_LIMIT = 151;

let currentPokemonId = 25;
let currentFilter = "all";
let allPokemon = [];

const pokemonForm = document.getElementById("pokemon-form");
const searchInput = document.getElementById("pokemon-search");
const resetButton = document.getElementById("reset-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const cryButton = document.getElementById("cry-button");
const voiceButton = document.getElementById("voice-button");
const pokemonCatalog = document.getElementById("pokemon-catalog");

const pokemonImage = document.getElementById("pokemon-image");
const pokemonNumber = document.getElementById("pokemon-number");
const pokemonName = document.getElementById("pokemon-name");
const pokemonType = document.getElementById("pokemon-type");
const pokemonSpecies = document.getElementById("pokemon-species");
const pokemonHeight = document.getElementById("pokemon-height");
const pokemonWeight = document.getElementById("pokemon-weight");
const pokemonDescription = document.getElementById("pokemon-description");
const screenId = document.getElementById("screen-id");

const statHp = document.getElementById("stat-hp");
const statAttack = document.getElementById("stat-attack");
const statDefense = document.getElementById("stat-defense");
const statSpeed = document.getElementById("stat-speed");

const typeNames = {
    normal: "NORMAL",
    fire: "FUEGO",
    water: "AGUA",
    electric: "ELEC",
    grass: "PLANTA",
    ice: "HIELO",
    fighting: "LUCHA",
    poison: "POISON",
    ground: "TIERRA",
    flying: "VOLADOR",
    psychic: "PSI",
    bug: "BICHO",
    rock: "ROCA",
    ghost: "FANTASMA",
    dragon: "DRAGÓN",
    dark: "SINI.",
    steel: "ACERO",
    fairy: "HADA"
};

const typeColors = {
    normal: "normal",
    fire: "fire",
    water: "water",
    electric: "electric",
    grass: "grass",
    ice: "water",
    fighting: "fire",
    poison: "poison",
    ground: "ground",
    flying: "flying",
    psychic: "psychic",
    bug: "bug",
    rock: "rock",
    ghost: "ghost",
    dragon: "dragon",
    dark: "dark",
    steel: "steel",
    fairy: "fairy"
};

function formatPokemonNumber(id) {
    return `#${String(id).padStart(3, "0")}`;
}

function formatPokemonName(name) {
    return name
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatSpanishText(text) {
    return text
        .replace(/\f/g, " ")
        .replace(/\n/g, " ")
        .replace(/\u00ad/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

async function fetchPokemon(identifier) {
    const response = await fetch(`${API_URL}/pokemon/${identifier}`);

    if (!response.ok) {
        throw new Error("Pokémon no encontrado");
    }

    return response.json();
}

async function fetchSpecies(id) {
    const response = await fetch(`${API_URL}/pokemon-species/${id}`);

    if (!response.ok) {
        return null;
    }

    return response.json();
}

function getStat(pokemon, statName) {
    const stat = pokemon.stats.find(item => item.stat.name === statName);
    return stat ? stat.base_stat : 0;
}

function setStatBar(statName, value) {
    const statRows = document.querySelectorAll(".stat-row");
    const row = [...statRows].find(item => {
        return item.querySelector("strong").id === `stat-${statName}`;
    });

    if (!row) {
        return;
    }

    const bars = row.querySelectorAll(".stat-bar i");
    const filledBars = Math.max(1, Math.round(Math.min(value, 150) / 15));

    bars.forEach((bar, index) => {
        bar.classList.toggle("filled", index < filledBars);
    });
}

function getSpanishDescription(species) {
    if (!species || !species.flavor_text_entries) {
        return "Registro oficial no disponible.";
    }

    const spanishEntry = species.flavor_text_entries.find(entry => {
        return entry.language.name === "es";
    });

    const englishEntry = species.flavor_text_entries.find(entry => {
        return entry.language.name === "en";
    });

    return formatSpanishText(
        spanishEntry?.flavor_text ||
        englishEntry?.flavor_text ||
        "Registro oficial no disponible."
    );
}

function getSpanishGenus(species) {
    if (!species || !species.genera) {
        return "Pokémon";
    }

    const spanishGenus = species.genera.find(item => {
        return item.language.name === "es";
    });

    const englishGenus = species.genera.find(item => {
        return item.language.name === "en";
    });

    return spanishGenus?.genus || englishGenus?.genus || "Pokémon";
}

function getPrimaryType(pokemon) {
    return pokemon.types[0]?.type.name || "normal";
}

function updateTypeBadge(type) {
    pokemonType.className = "type-badge";
    pokemonType.classList.add(typeColors[type] || "normal");
    pokemonType.textContent = typeNames[type] || type.toUpperCase();
}

function updateNavigation() {
    const previousId = currentPokemonId === 1 ? 151 : currentPokemonId - 1;
    const nextId = currentPokemonId === 151 ? 1 : currentPokemonId + 1;

    previousButton.textContent =
        `← ${formatPokemonNumber(previousId)} ${formatPokemonName(allPokemon[previousId - 1]?.name || "")}`;

    nextButton.textContent =
        `${formatPokemonNumber(nextId)} ${formatPokemonName(allPokemon[nextId - 1]?.name || "")} →`;
}

async function renderPokemon(pokemon) {
    const species = await fetchSpecies(pokemon.id);
    const type = getPrimaryType(pokemon);

    currentPokemonId = pokemon.id;

    pokemonImage.src =
        pokemon.sprites.other?.["official-artwork"]?.front_default ||
        pokemon.sprites.front_default;

    pokemonImage.alt = formatPokemonName(pokemon.name);

    pokemonNumber.textContent = formatPokemonNumber(pokemon.id);
    pokemonName.textContent = formatPokemonName(pokemon.name).toUpperCase();
    screenId.textContent =
        `ID: ${formatPokemonNumber(pokemon.id)} · ${formatPokemonName(pokemon.name).toUpperCase()}`;

    updateTypeBadge(type);

    pokemonSpecies.textContent = getSpanishGenus(species);
    pokemonHeight.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    pokemonWeight.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    pokemonDescription.textContent = `"${getSpanishDescription(species)}"`;

    const hp = getStat(pokemon, "hp");
    const attack = getStat(pokemon, "attack");
    const defense = getStat(pokemon, "defense");
    const speed = getStat(pokemon, "speed");

    statHp.textContent = hp;
    statAttack.textContent = attack;
    statDefense.textContent = defense;
    statSpeed.textContent = speed;

    setStatBar("hp", hp);
    setStatBar("attack", attack);
    setStatBar("defense", defense);
    setStatBar("speed", speed);

    updateNavigation();
    highlightCatalogItem(pokemon.id);
}

async function loadPokemon(identifier) {
    try {
        const pokemon = await fetchPokemon(identifier);
        await renderPokemon(pokemon);
    } catch (error) {
        alert("No se ha encontrado ese Pokémon.");
    }
}

function highlightCatalogItem(id) {
    document.querySelectorAll(".catalog-item").forEach(item => {
        item.classList.toggle("selected", Number(item.dataset.id) === id);
    });
}

function getCatalogItems() {
    if (currentFilter === "all") {
        return allPokemon;
    }

    return allPokemon.filter(pokemon => {
        return pokemon.types.includes(currentFilter);
    });
}

function renderCatalog() {
    const items = getCatalogItems();

    pokemonCatalog.innerHTML = "";

    if (!items.length) {
        pokemonCatalog.innerHTML = `
            <div class="error-message">
                No hay Pokémon de este tipo.
            </div>
        `;
        return;
    }

    items.forEach(pokemon => {
        const primaryType = pokemon.types[0];

        const item = document.createElement("button");
        item.className = "catalog-item";
        item.dataset.id = pokemon.id;

        item.innerHTML = `
            <img
                src="${pokemon.image}"
                alt="${formatPokemonName(pokemon.name)}">

            <span class="catalog-item-info">
                <span class="catalog-item-number">
                    ${formatPokemonNumber(pokemon.id)}
                </span>
                <span class="catalog-item-name">
                    ${formatPokemonName(pokemon.name)}
                </span>
            </span>

            <span class="catalog-item-type">
                ${typeNames[primaryType] || primaryType}
            </span>
        `;

        item.addEventListener("click", () => {
            loadPokemon(pokemon.id);
        });

        pokemonCatalog.appendChild(item);
    });

    highlightCatalogItem(currentPokemonId);
}

async function loadCatalog() {
    pokemonCatalog.innerHTML = `<div class="loading">CARGANDO CATÁLOGO...</div>`;

    const response = await fetch(
        `${API_URL}/pokemon?limit=${KANTO_LIMIT}&offset=0`
    );

    const data = await response.json();

    allPokemon = data.results.map((pokemon, index) => {
        const id = index + 1;

        return {
            id,
            name: pokemon.name,
            types: [],
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
    });

    const detailedPokemon = await Promise.all(
        allPokemon.map(async pokemon => {
            const data = await fetchPokemon(pokemon.id);

            return {
                ...pokemon,
                types: data.types.map(item => item.type.name)
            };
        })
    );

    allPokemon = detailedPokemon;
    renderCatalog();
}

pokemonForm.addEventListener("submit", event => {
    event.preventDefault();

    const value = searchInput.value.trim().toLowerCase();

    if (!value) {
        return;
    }

    loadPokemon(value);
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    currentFilter = "all";

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.toggle("active", button.dataset.type === "all");
    });

    renderCatalog();
    loadPokemon(25);
});

previousButton.addEventListener("click", () => {
    const previousId = currentPokemonId === 1 ? 151 : currentPokemonId - 1;
    loadPokemon(previousId);
});

nextButton.addEventListener("click", () => {
    const nextId = currentPokemonId === 151 ? 1 : currentPokemonId + 1;
    loadPokemon(nextId);
});

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.type;

        document.querySelectorAll(".filter").forEach(filter => {
            filter.classList.toggle("active", filter === button);
        });

        renderCatalog();
    });
});

document.querySelectorAll(".numeric-grid button").forEach(button => {
    button.addEventListener("click", () => {
        const number = button.dataset.number;

        if (number === "0") {
            searchInput.value = "";
            return;
        }

        searchInput.value += number;
    });
});

cryButton.addEventListener("click", async () => {
    try {
        const pokemon = await fetchPokemon(currentPokemonId);
        const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy;

        if (!cryUrl) {
            alert("Este Pokémon no tiene un sonido disponible.");
            return;
        }

        new Audio(cryUrl).play();
    } catch {
        alert("No se ha podido reproducir el sonido.");
    }
});

voiceButton.addEventListener("click", () => {
    const message =
        `Pokémon ${formatPokemonName(pokemonName.textContent.toLowerCase())}. ` +
        `Número ${currentPokemonId}.`;

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    }
});

window.addEventListener("load", async () => {
    await loadCatalog();
    await loadPokemon(25);
});