import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [
      {id: 1, name: 'Tanya', species: 'Human', status: 'Alive', location: 'Earth', episode: '1'},
      {id: 2, name: 'Dima', species: 'Human', status: 'Dead', location: 'Mars', episode: '2'},
      {id: 3, name: 'Iva', species: 'Alien', status: 'Alive', location: 'Venus', episode: '3'},
      {id: 4, name: 'Kirill', species: 'Human', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 5, name: 'Sasha', species: 'Alien', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 6, name: 'Vasya', species: 'Human', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 7, name: 'Petya', species: 'Alien', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 8, name: 'Kolya', species: 'Human', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 9, name: 'Katya', species: 'Alien', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 10, name: 'Denver', species: 'Animal', status: 'Alive', location: 'Earth', episode: '4'},
      {id: 11, name: 'Moscow', species: 'Alien', status: 'Alive', location: 'Earth', episode: '4'},
    ],
    charactersTotal: 11,
    favorites: [
      {id: 3, name: 'Iva', species: 'Alien', status: 'Alive', location: 'Venus', episode: '3'},
      {id: 9, name: 'Katya', species: 'Alien', status: 'Alive', location: 'Earth', episode: '4'},
    ],
    currentTypeFilter: 'All',
    currentNameFilter: '',
  },
  getters: {
    charactersTotal: (state) => {
      const total = state.currentNameFilter
        ? state.characters.filter(c => c.name.toLowerCase().includes(state.currentNameFilter)).length
        : (state.currentTypeFilter === 'All') 
        ? state.characters.length 
        : state.characters.filter(c => c.species === state.currentTypeFilter).length;

        return total;
    },
    characters: (state) => (page, pageSize = 3) => {
      const start = (page - 1) * pageSize;
      let chars = state.characters;
      if (state.currentNameFilter) {
        chars = chars.filter(c => c.name.toLowerCase().includes(state.currentNameFilter));
      }
      else if (state.currentTypeFilter !== 'All') {
        chars = chars.filter(c => c.species === state.currentTypeFilter);
      }
      return chars.slice(start, start + pageSize );
    },
    characterById: (state) => (id) => {
      console.log('characterById', id);
      return state.characters.find(char => char.id === Number(id) );
    },
    favorites: (state) => state.favorites,
    favoritesTotal: (state) => state.favorites.length,
    isFavorite: (state) => (id) => state.favorites.find(char => char.id === id),
  },
  mutations: {
    addFavorite(state, char) {
      state.favorites = state.favorites.filter(c => c.id !== char.id).concat([char]);
    },
    removeFavorite(state, char) {
      state.favorites = state.favorites.filter(c => c.id !== char.id);
    },
    setTypeFilter(state, typeName) {
      state.currentTypeFilter = typeName;
    },
    setNameFilter(state, search) {
      state.currentNameFilter = search.toLowerCase();
    },
  },
  actions: {
    addFavorite(context, char) {
      context.commit('addFavorite', char);
    },
    removeFavorite(context, char) {
      context.commit('removeFavorite', char);
    },
    setTypeFilter(context, typeName) {
      context.commit('setTypeFilter', typeName);
    },
    setNameFilter(context, search) {
      context.commit('setNameFilter', search);
    },
  },
})
