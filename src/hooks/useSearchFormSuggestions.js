import { useState, useEffect } from 'react';

export default function useSearchFormSuggestions(searchSuggestions) {
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestions, setActiveSuggestions] = useState([]);

    return { selectedSuggestion, setSelectedSuggestion, showSuggestions, setShowSuggestions, activeSuggestions, setActiveSuggestions };
}