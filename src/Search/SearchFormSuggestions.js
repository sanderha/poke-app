import { List, ListItem } from '@rmwc/list';

import '@rmwc/list/styles';

export default function SearchFormSuggestions({ suggestions, submitMethod, selectedSuggestion }) {

    const handleClick = e => {
        submitMethod(e.target.innerText);
    }

    const isSelected = (value) => {
        const selected = selectedSuggestion || '';
        
        return value.toLowerCase() === selected.toLowerCase();
    }

    return (
        <div className="searchform-suggestions" onKeyDown={(e) => console.log(e)}>
            <List>
                {suggestions.map((name, key) => {
                    return <ListItem activated={isSelected(name)} key={key} onClick={handleClick}>{name}</ListItem>
                })}
            </List>
        </div>
    );
}