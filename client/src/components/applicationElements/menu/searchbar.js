import React from 'react';
import {connect} from 'react-redux';

import {menuChangeSearchTerm} from '../../../actions';

import {FaSearch} from 'react-icons/fa';

const SearchBar = (props) => {
    return ( 
        <div className="searchbar">
            <input
                value={props.searchTerm}
                onChange={(e) => props.menuChangeSearchTerm(e.target.value)}
                placeholder="Search here..."
            />
            <div className="searchIconHolder"><FaSearch/></div>
        </div>
    );
}

const mstp = (state) => {
    return {
        searchTerm: state.menu.searchTerm
    }
}

export default connect(mstp,{menuChangeSearchTerm})(SearchBar);