import { useState, useEffect } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import SearchFormSuggestions from './SearchFormSuggestions';
import { traverseFlatList, DOWN, UP } from '../functions/lists';

import './SearchForm.css';
import '@rmwc/textfield/dist/styles';
import '@rmwc/button/dist/styles';

function SearchForm({ searchMethod, searchSuggestions }) {
    const [inputValue, setInputValue] = useState('');
    const [searchedValue, setSearchedValue] = useState('');
    const [feedBack, setFeedBack] = useState('');
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestions, setActiveSuggestions] = useState([]);

    // filter visible search suggestions on input change
    useEffect(() => {
        if (inputValue) {
            const alteredSuggestions = searchSuggestions.filter(pokemon => pokemon.includes(inputValue.toLowerCase()));
            setActiveSuggestions(alteredSuggestions);
        }

        return () => setActiveSuggestions([]);
    }, [inputValue, searchSuggestions]);

    // reset selected search suggestion
    useEffect(() => {
        setSelectedSuggestion(null);
        return () => setSelectedSuggestion(null);
    }, [searchedValue, inputValue]);

    // Figure out whether to show search suggestions dropdown or not
    useEffect(() => {
        if (inputValue === searchedValue || !inputValue || inputValue.length < 2 || !activeSuggestions.length) {
            setShowSuggestions(false)
        } else {
            setShowSuggestions(true);
        }

        return () => setShowSuggestions(false);
    }, [inputValue, searchedValue, activeSuggestions]);

    const handleInputChange = (e) => setInputValue(e.target.value);

    const makeFeedBackMessage = (value) => `You searched for: ${value}`;

    const handleSearch = () => {
        if(inputValue) setFeedBack(makeFeedBackMessage(inputValue));
        searchMethod(inputValue);
        setSearchedValue(inputValue);
    }

    const handleSearchSuggestionClick = (value) => {
        searchMethod(value);
        setSearchedValue(value.toLowerCase());
        setInputValue(value);
        setShowSuggestions(false);
        setFeedBack(makeFeedBackMessage(value));
    }

    const handleSelectedSuggestion = (keyCode) => {
        if (keyCode === 40) setSelectedSuggestion(traverseFlatList(activeSuggestions, selectedSuggestion, DOWN));
        if (keyCode === 38) setSelectedSuggestion(traverseFlatList(activeSuggestions, selectedSuggestion, UP));
    }

    const handleKeyPress = (e) => {
        // "Enter"
        if (e.keyCode === 13) {
            (showSuggestions && selectedSuggestion) ? handleSearchSuggestionClick(selectedSuggestion) : handleSearch();
        }
        // arrows up and down
        if (e.keyCode === 40 || e.keyCode === 38) handleSelectedSuggestion(e.keyCode);
    }

    return (
        <div className="searchform">
            <div className="searchform__inner">
                <div className="searchform__input-wrap">
                    <TextField value={inputValue} onKeyDown={handleKeyPress} onChange={handleInputChange} placeholder="Enter pokemon name" />
                    {showSuggestions ? <SearchFormSuggestions submitMethod={handleSearchSuggestionClick} suggestions={activeSuggestions} selectedSuggestion={selectedSuggestion} /> : null}
                </div>
                <Button className='searchform__button' raised onClick={handleSearch}>Search</Button>
            </div>

            {feedBack ? <div className="searchform__feedback">{feedBack}</div> : null}
        </div>
    );
}

export default SearchForm;