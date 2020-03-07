import React from 'react'

import {FaAngleLeft} from 'react-icons/fa';

export default (props) => {
    return (
        <div className="header">
            <div className="title">
                {props.title}
            </div>
            <div className="back"
            onClick={props.onBackClick}>
                <button>
                    <FaAngleLeft/>
                </button>
            </div>
        </div>
    )
}
