import React from 'react';

const ParkCardBack = props => {
    let { name, notes } = props;

    return (
        <div className="park-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/3077_take_me_out_to_the_ball_game_LOC.jpg" alt="Baseball Song" />
            <h3>{name}</h3>
            {/* <h4>{team}</h4>
            <p>{city}, {state}</p> */}
            <p>{notes}</p>
            <button>Edit</button>
        </div>
    )
}

export default ParkCardBack;