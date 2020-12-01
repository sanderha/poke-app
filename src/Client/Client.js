class Client {

    getBaseUrl(){
        return 'https://pokeapi.co/api/v2';
    }

    getPokemon(pokemon){
        return this.request(`pokemon/${pokemon.toLowerCase()}`);
    }

    getPokemons(limit = 20, offset = 0){
        return this.request(`pokemon?limit=${limit}&offset=${offset}`);
    }

    request(endpoint){
        return fetch(this.getBaseUrl() + '/' + endpoint);
    }
}

export default Client;