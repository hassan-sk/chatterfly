import React from 'react';
import {connect} from 'react-redux';
import {menuChangeFilter} from '../../../actions';

import {FaStar, FaUsers, FaClock} from 'react-icons/fa';

const Filter = (props) => {
    return (
        <div className="filterbar">
            <button
                disabled={props.filterLoading}
                onClick={props.filter === 'recent'?()=>{}:()=>props.menuChangeFilter('recent')}
                className={props.filter === 'recent'?'active': null}>
                <div>
                    <FaClock/>
                </div>
                <span>
                    Recent
                </span>
            </button>
            <button
                disabled={props.filterLoading}
                onClick={props.filter === 'favorite'?()=>{}:()=>props.menuChangeFilter('favorite')}
                className={props.filter === 'favorite'?'active': null}>
                <div>
                    <FaStar/>
                </div>
                <span>
                    Favorite
                </span>
            </button>
            <button
                disabled={props.filterLoading}
                onClick={props.filter === 'all'?()=>{}:()=>props.menuChangeFilter('all')}
                className={props.filter === 'all'?'active': null}>
                <div>
                    <FaUsers/>
                </div>
                <span>
                    Search all
                </span>
            </button>
        </div>
    );

}

const mstp = (state) => {
    return {
        filter: state.menu.filter,
        filterLoading: state.menu.filterLoading
    }
}

export default connect(mstp,{menuChangeFilter})(Filter); 