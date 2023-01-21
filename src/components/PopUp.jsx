import React from 'react';
import './style/popUp.css'

const PopUp = ({ message }) => {
    return (
        <div className="overlay_popUp">
            <div className="popUp_content">
                <h2>Usuario { message } correctamente</h2>
                <figure className="figure_container">
                    <img
                        src="https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif"
                        alt="icon_Checked"
                        className="check_icon"
                    />
                </figure>
            </div>
        </div>
    );
};

export default PopUp;