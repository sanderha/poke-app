import {useState, useEffect} from 'react';
import './Card.css';

function Card({pokeData}) {
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        // set some basic properties
        if(pokeData.sprites && pokeData.sprites.front_default){
            setMainImage(`https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`);
        }
    }, [pokeData]);

    return (
        <div className="poke-card">
            <div className="poke-card__name">{pokeData.name}</div>
            <div className="poke-card__hp">{pokeData.stats[0].base_stat} HP</div>
            <div className="poke-card__type">{pokeData.types[0].type.name}</div>
            <div className="poke-card__img">
                {mainImage ? <img src={mainImage} alt={pokeData.name}/> : null}
            </div>
        </div>
    );
}

export default Card;