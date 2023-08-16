import { createStore } from 'vuex'
import api from '../api.mjs';

export default createStore({
  state: {
    characters: [
    ],
    charactersTotal: 11,
    favorites: [
    ],
    currentTypeFilter: 'All',
    currentNameFilter: '',
    loading: true,
    currentCharacter: null,
  },
  getters: {
    charactersTotal: (state) => state.charactersTotal,
    loading: (state) => state.loading,
    characters: (state) => () => state.characters,
    currentCharacter: (state) => state.currentCharacter,
    favorites: (state) => state.favorites,
    favoritesTotal: (state) => state.favorites.length,
    isFavorite: (state) => (id) => state.favorites.find(char => char.id === id),
  },
  mutations: {
    addFavorite(state, char) {
      state.favorites = state.favorites.filter(c => c.id !== char.id).concat([char]);
    },
    setFavorites(state, chars) {
      state.favorites = chars;
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
    setCharacters(state, chars) {
      state.characters = chars;
    },
    setCharactersTotal(state, charactersTotal) {
      state.charactersTotal = charactersTotal;
    },
    setCurrentCharacter(state, character) {
      state.currentCharacter = character;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    addFavorite({commit, dispatch}, char) {
      commit('addFavorite', char);
      dispatch('saveFavorites');
    },
    removeFavorite({commit, dispatch}, char) {
      commit('removeFavorite', char);
      dispatch('saveFavorites');
    },
    setTypeFilter(context, typeName) {
      context.commit('setTypeFilter', typeName);
    },
    setNameFilter(context, search) {
      context.commit('setNameFilter', search);
    },
    loadCharacters: ({state, commit}, page = 1) => {
      commit('setLoading', true);
      api.getCharacters(page, state.currentNameFilter, state.currentTypeFilter === 'All' ? '' : state.currentTypeFilter)
        .then( ({ characters, count }) => {
          commit('setCharacters', characters);
          commit('setCharactersTotal', count);
        }).finally(() => commit('setLoading', false));
    },
    loadCurrentCharacter: ({commit}, id) => {
      commit('setLoading', true);
      api.getCharacter(id)
        .then(character => {
          commit('setCurrentCharacter', character);
        }).finally(() => commit('setLoading', false));
    },
    loadFavorites: ({commit}) => {
      commit('setFavorites', JSON.parse(localStorage.getItem('favorites')) || []);
    },
    saveFavorites: ({state}) => {
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
})
