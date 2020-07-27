import React from 'react';

const ParkCardBack = props => {
    let { id, name, notes, img_url } = props;

    return (
        <div className="park-card">
            <img src={img_url} alt={name} />
            <h3>{name}</h3>
            {/* <h4>{team}</h4>
            <p>{city}, {state}</p> */}
            <p>{notes}</p>
            <button onClick={() => props.unVisited(id, props.userId)}>Edit</button>
        </div>
    )
}

export default ParkCardBack;