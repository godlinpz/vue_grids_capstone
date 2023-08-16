import api from './api.mjs';

api.getCharacter(1).then(data => {
    console.log(data);
})