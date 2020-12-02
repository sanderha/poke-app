import { useState, useEffect } from 'react';
import SearchForm from './Search/SearchForm';
import './App.css';
import Card from './Cards/Card';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import useSearchSuggestions from './hooks/useSearchSuggestions';
import useSearch from './hooks/useSearch';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';

import '@rmwc/snackbar/dist/styles';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchResult, searchError } = useSearch(searchTerm);
    const [snackBarNotice, setSnackBarNotice] = useState({ active: false, message: '', type: 'error' });
    // TODO handle errors
    const { searchSuggestions } = useSearchSuggestions();

    useEffect(() => {
        if (searchError) setSnackBarNotice({ active: true, message: searchError, type: 'error' });

        return () => setSnackBarNotice({ active: false, message: '', type: 'error' });
    }, [searchError]);

    return (
        <div className="App">
            <Typography use="headline2" tag="h1">Poké-App</Typography>
            <SearchForm searchSuggestions={searchSuggestions} searchMethod={(searchTerm) => setSearchTerm(searchTerm)} />
            {searchResult && searchResult.id ? <Card pokeData={searchResult} /> : null}
            <Snackbar
                open={snackBarNotice.active}
                onClose={e => setSnackBarNotice({ ...snackBarNotice, active: false, message: '' })}
                message={snackBarNotice.message}
                dismissesOnAction
                action={
                    <SnackbarAction
                        label="Close"
                        onClick={() => setSnackBarNotice({ ...snackBarNotice, active: false, message: '' })}
                    />
                }
            />
        </div>
    );
}