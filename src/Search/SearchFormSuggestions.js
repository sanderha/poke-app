import { List, ListItem } from '@rmwc/list';

import '@rmwc/list/styles';

export default function SearchFormSuggestions({ suggestions, submitMethod }) {

    const handleClick = e => {
        submitMethod(e.target.innerText);
    }

    return (
        <div className="searchform-suggestions">
            <List>
                {suggestions.map((name, key) => {
                    return <ListItem key={key} onClick={handleClick}>{name}</ListItem>
                })}
            </List>
        </div>
    );
}