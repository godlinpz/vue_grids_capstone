const baseUrl = 'https://rickandmortyapi.com/api/';
const charactersUrl = `${baseUrl}character`;
const episodesUrl = `${baseUrl}episode`;
const episodeNames = new Map();

const normalizeCharacter = ({id, name, status, species, location, image, episode: [firstEpisode], url}) => {
    const episodeData = episodeNames.get(firstEpisode);
    const episodeName = `${episodeData.name} (${episodeData.episode})`;
    return ({id, name, status, species, location, image, episodeName, url});
}

// call before other actions
const init = () => {
    return new Promise(resolve => {
        if (episodeNames.size)
            resolve(episodeNames);
        else {
            getEpisodes().then(resolve);
        }
    });
};

// loads all episodes
const getEpisodes = (url = `${episodesUrl}?page=1`) => {
    return new Promise(resolve => {
        fetch(url).then(response => {
            response.json().then(data => {
                data.results.map(({id, name, episode, url}) => episodeNames.set(url, {id, name, episode, url}));
                const nextPromise = data.info.next ? getEpisodes(data.info.next) : Promise.resolve(episodeNames);
                nextPromise.then( episodeNames => resolve(episodeNames));
            });
        });
    })
};

const api = {
    // load characters
    getCharacters(page = 1, name = '', species = '') {
        return new Promise(resolve => {
            init().then(episodeNames => {
                // console.log(episodeNames);
                fetch(`${charactersUrl}?page=${page}&name=${name}&species=${species}`).then(response => {
                    response.json().then(({ results: characters, info, error }) => {
                        console.log(error);
                        resolve(error || {characters: characters.map(normalizeCharacter), count: info.count});
                    })
                });
            })
        })
    },

    getCharacter(id) {
        return new Promise(resolve => {
            init().then(episodeNames => {
                fetch(`${charactersUrl}/${id}`).then(response => {
                    response.json().then((data) => {
                        // console.log(data);
                        resolve(normalizeCharacter(data));
                    })
                });
            })
        })
    },

}

export default api;