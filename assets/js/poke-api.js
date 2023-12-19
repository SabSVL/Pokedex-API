const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((habilid) => habilid.ability.name)

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.special_attack = pokeDetail.stats[3].base_stat
    pokemon.special_defense = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat

    pokemon.total = pokemon.hp+ pokemon.attack + pokemon.defense + pokemon.special_attack + pokemon.special_defense + pokemon.speed

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) =>{
    return  fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon)
}


pokeApi.getPokemons = (offset = 0, limit =5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((PokemonDetails) =>PokemonDetails)
}