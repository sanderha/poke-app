import { useState, useEffect } from 'react';
import Client from '../Client/Client';

export default function useSearch(searchTerm) {
    const [result, setResult] = useState({});
    const [error, setError] = useState(null);

    /**
     * Make API request for poke data
     */
    useEffect(() => {
        if (searchTerm) {
            const client = new Client();
            client.getPokemon(searchTerm).then(response => {
                if (response.ok !== true) {
                    console.log(response);
                    setError('Error for ' + searchTerm + ': ' + response.statusText);
                    return;
                }

                return response.json();
            }).then(json => setResult(json)).catch(error => {
                error.text().then( errorMessage => {
                    setError('Error for ' + searchTerm + ': ' + errorMessage)
                });
            });
        } 
        // TODO cleanup
    }, [searchTerm]);

    return {searchResult: result, searchError: error};
}