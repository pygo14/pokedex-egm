class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.weight = data.weight;
    this.height = data.height;
    this.moves = data.moves;
  }

createCard() {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';

  const card = document.createElement('div');
  card.className = 'card pokemon-card shadow-sm text-center';
  card.dataset.id = this.id;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;

  card.innerHTML = `
    <img src="${imageUrl}" class="card-img-top mx-auto mt-3" style="width:100px;" alt="${this.name}">
    <div class="card-body">
      <h5 class="card-title text-capitalize">${this.name}</h5>
      <p class="card-text"><strong>Tipo:</strong> ${this.type.join(', ')}</p>
    </div>
  `;

  card.addEventListener('click', () => this.showDetails());

  col.appendChild(card);
  return col;
}

  showDetails() {
  const modalTitle = document.getElementById('pokemonModalLabel');
  const modalBody = document.getElementById('modalBody');

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;

  modalTitle.textContent = this.name;
  modalBody.innerHTML = `
    <div class="text-center mb-3">
      <img src="${imageUrl}" alt="${this.name}" style="width: 150px;">
    </div>
    <p><strong>Tipo:</strong> ${this.type.join(', ')}</p>
    <p><strong>Peso:</strong> ${this.weight}</p>
    <p><strong>Altura:</strong> ${this.height}</p>
    <p><strong>Movimientos:</strong> ${this.moves.join(', ')}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
  modal.show();
}

}

const API_URL = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json';

const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
let pokemons = [];

async function loadPokemons() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    pokemons = data.map(pokeData => new Pokemon(pokeData));
    displayPokemons(pokemons);
  } catch (error) {
    console.error('Error al cargar los pokemones:', error);
  }
}

function displayPokemons(list) {
  pokemonContainer.innerHTML = '';
  list.forEach(pokemon => {
    pokemonContainer.appendChild(pokemon.createCard());
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = pokemons.filter(p => p.name.toLowerCase().includes(query));
  displayPokemons(filtered);
});

loadPokemons();
