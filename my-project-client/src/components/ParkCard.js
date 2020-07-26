import React from 'react';

const ParkCard = props => {
    let { name, city, state, team, img_url, notes} = props;

    return (
        <div className="park-card">
            <img src={img_url} alt={name} />
            <h3>{name}</h3>
            <h4>{team}</h4>
            <p>{city}, {state}</p>
            <p>{notes}</p>
            <button>Been Here</button>
        </div>
    )
}

export default ParkCard;