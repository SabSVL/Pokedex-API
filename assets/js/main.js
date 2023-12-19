const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detalhes = document.getElementById('detalhes')

var listPokemon = []

const limit = 5
let offset = 0
const maxRecords = 151



function loadPokemonItens(offset, limit) {


    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        AdicionarPokemonList(pokemons, listPokemon)
        console.log(listPokemon)


        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" id="${pokemon.type}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        
                <div class="detail">
            
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
                        
                    </ol>
            
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
            
                </div>
            </li>`).join('')
        pokemonList.innerHTML += newHtml;

        const pokemonElements = document.getElementsByClassName('pokemon');
        for (const pokemonElement of pokemonElements) {
            pokemonElement.addEventListener('click', () => {
                MostrarDetalhes(pokemonElement.children[1].textContent);
            });
        }
    });
}

function MostrarDetalhes(name) {
    detalhes.style.display = 'block'
    const pokemon = filterPokemonByName(listPokemon, name);
    console.log(pokemon)
    const newHtml = `    
    <div>
            <div class="perfil  ${pokemon[0].type}">
            <button onclick="CloseDetalhes()">❌</button>    
            <h3>${pokemon[0].name}</h3>
                <div>
                    <ol class="types">
                       ${pokemon[0].types.map((type) => `<li class="type" >${type}</li>`).join('')} 
                       </ol>
                       <img src="${pokemon[0].photo}" alt="">
                </div>
            <nav>
                <h4 onclick="Base_Stats()" >About</h4>
                <h4 onclick="CloseAbout()">Base Stats</h4>
            </nav>
            </div>
         
            <div id="about" class="about">
                <div>
                    <p>Height:</p>
                    <p class="${pokemon[0].type}">${pokemon[0].height}</p>

                </div>
                <div>
                    <p>Weight:</p>
                    <p class="${pokemon[0].type}">${pokemon[0].weight}</p>
                </div>
                <div>
                    <p>Abilities:</p>
                    <article>
                    ${pokemon[0].abilities.map((hab) => `<p class="${pokemon[0].type}">${hab}</p>`).join('')}
                    </article>
                </div>

            </div>
            
            <div id="base_stats" class="detalhe">
                <div>
                    <p>HP:</p>
                    <p  class="${pokemon[0].type}">${pokemon[0].hp}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].hp}%"></div>
                    </div>
                </div>

                <div>
                    <p>Attack:</p>
                    <p class="${pokemon[0].type}">${pokemon[0].attack}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].attack}%"></div>
                    </div>
                </div>

                <div>
                    <p>Defense:</p>
                    <p class="${pokemon[0].type}">${pokemon[0].defense}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].defense}%"></div>
                    </div>
                </div>

                <div>
                    <p>Sp.Atk:</p>
                    <p class="${pokemon[0].type}" >${pokemon[0].special_attack}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].special_attack}%"></div>
                    </div>
                </div>

                <div>
                    <p>Sp.Def:</p>
                    <p class="${pokemon[0].type}" >${pokemon[0].special_defense}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].special_defense}%"></div>
                    </div>
                </div>

                <div>
                    <p>Speed:</p>
                    <p class="${pokemon[0].type}" >${pokemon[0].speed}</p>
                    <div class="progress-container">
                        <div class="progress-bar ${pokemon[0].type}" id="myProgressBar" style="width: ${pokemon[0].speed}%";
                        ></div>
                    </div>
                </div>
                
                <div>
                    <p>Total:</p>
                    <p class="${pokemon[0].type}" >${pokemon[0].total}</p>
                </div>
                

            </div>

            
    </div>
    `
    detalhes.innerHTML = newHtml;
    
}

function Verbarra(){
    var progressBar = document.getElementById('myProgressBar');
    var hpValueElement = document.getElementById('hpValue');
    var fixedHpValue = 75; // Valor fixo definido no JavaScript

    // Atualiza a largura da barra de progresso com o valor fixo
    if (progressBar)
        progressBar.style.width = fixedHpValue + '%';

    // Atualiza o valor exibido
    if (fixedHpValue && hpValueElement)
        hpValueElement.textContent = fixedHpValue;
}
function filterPokemonByName(array, name) {

    const result = array.map((pokemons) => pokemons.filter(pokemon => pokemon.name === name));
    const filteredResult = result.filter(pokemonArray => pokemonArray.length > 0);
    return [].concat(...filteredResult);

}

function AdicionarPokemonList(pokemons, listPokemon) {
    // Verificar se listPokemon está vazia
    if (listPokemon.length === 0) {
        listPokemon.push(pokemons);
    } else {
        const newName = pokemons[0].name;

        // Verificar se o nome do primeiro Pokémon no novo array já existe em listPokemon
        const nameExists = listPokemon.some(existingSet => existingSet.length > 0 && existingSet[0].name === newName);

        if (!nameExists) {
            // Adicionar o novo array apenas se o nome não existir em listPokemon
            listPokemon.push(pokemons);
        }
    }
}


function CloseDetalhes() {
    detalhes.style.display = 'none'

}

function CloseAbout() {
    document.getElementById('about').style.display = 'none'
    document.getElementById('base_stats').style.display = 'block'

}
function Base_Stats() {
    document.getElementById('base_stats').style.display = 'none'
    document.getElementById('about').style.display = 'block'

}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)

    }

})