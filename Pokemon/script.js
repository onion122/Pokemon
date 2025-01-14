const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-name');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function fetchPokemonData(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        if(!response.ok){
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json()
        displayPokemonInfo(data);
    } catch(error){
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
        pokemonInfoDiv.style.display = 'block';
    }

    function displayPokemonInfo(pokemon){
        const{ name, sprites, types, abilities} = pokemon;

        pokemonInfoDiv.innerHTML = `<img src="${sprites.front_default}" alt="${name}"><h3>${name.charAt(0).toUpperCase() + name.slice()}</h3>
        <p><strong>Tipo:${types.map(type >= type.type.name).join(',')}</strong></p>
        <p><strong>Habilidades:${abilities.map(ability => ability.ability.name).join(',')}</strong></p>`;

        pokemonInfoDiv.style.display = 'block';
    }
}
    form.addEventListener('submit', function(event){
        event.preventDefault();
        const pokemonName = input.ariaValueMax.trim();
        if(pokemonName){
            fetchPokemonData(pokemonName);
        }
    });