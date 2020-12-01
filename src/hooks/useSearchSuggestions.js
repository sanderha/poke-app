import { useState, useEffect } from 'react';
import Client from '../Client/Client';

export default function useSearchSuggestions() {
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [failed, setFailed] = useState(false);

    /**
     * Make API request for search suggestions
     */
    useEffect(() => {
        const client = new Client();
        client.getPokemons(150).then(response => {
            if (response.ok !== true) {
                console.log('FAILED GETTING SUGGESTIONS');
                setFailed(true);
                return;
            }

            return response.json();
        }).then(json => setSearchSuggestions(json.results.map(pokemon => pokemon.name))).catch(error => {
            console.log(error);
            // TODO HANDLE ERROR
            setFailed(true);
            setError(error);
        });
    }, []); // TODO set dependency

    return { searchSuggestions: searchSuggestions, error: error, failed: failed };
}