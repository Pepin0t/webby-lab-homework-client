import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import { showNewFlimModal } from "../actions/modal_actions";
import { sortListOfFilms, searchInListOfFilms } from "../actions/films_actions";

export class UserInterface extends PureComponent {
    static propTypes = {
        show: PropTypes.func,
        sort: PropTypes.func,
        search: PropTypes.func
    };

    showNewFilmModal = () => {
        this.props.show();
    };

    sortListOfFilms = () => {
        this.props.sort();
    };

    inputChange = e => {
        return this.debouncedEvent(e.target.value);
    };

    debouncedEvent = debounce(value => {
        this.props.search(value);
    }, 300);

    render() {
        return (
            <div id="user-interface">
                <button id="show-modal" onClick={this.showNewFilmModal}>
                    Add new film
                </button>
                <button id="sort-list" onClick={this.sortListOfFilms}>
                    Sort list
                </button>
                <label htmlFor="text-input">
                    Search
                    <input id="text-input" type="text" name="search" onChange={this.inputChange} />
                </label>
            </div>
        );
    }
}

const mapDispatchToProps = {
    show: showNewFlimModal,
    sort: sortListOfFilms,
    search: searchInListOfFilms
};

export default connect(
    null,
    mapDispatchToProps
)(UserInterface);
