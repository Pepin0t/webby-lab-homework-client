import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import classNames from "classnames";

import { showNewFlimModal } from "../actions/modal_actions";
import { sortListOfFilms, searchInListOfFilms } from "../actions/films_actions";

export class UserInterface extends PureComponent {
    static propTypes = {
        show: PropTypes.func,
        sort: PropTypes.func,
        search: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.input = createRef();

        this.state = {
            currentSearchCategory: "movies",
            showSearchCategoriesMenu: false
        };
    }

    showNewFilmModal = () => {
        this.props.show();
    };

    sortListOfFilms = () => {
        this.props.sort();
    };

    inputChange = (e, value) => {
        const inputValue = value || e.target.value;

        return this.debouncedEvent(inputValue);
    };

    debouncedEvent = debounce(value => {
        this.props.search(value, this.state.currentSearchCategory);
    }, 300);

    searchCategoriesMenuToggle = () => {
        this.setState(
            {
                showSearchCategoriesMenu: !this.state.showSearchCategoriesMenu
            },
            () => {
                if (!this.state.showSearchCategoriesMenu) {
                    this.input.current.focus();
                }
            }
        );
    };

    chooseSearchCategory = e => {
        e.persist();

        this.setState(
            {
                currentSearchCategory: e.target.name
            },
            () => {
                const inputValue = this.input.current.value;

                if (inputValue) {
                    this.inputChange(null, inputValue);
                }
            }
        );
    };

    render() {
        const ifSearchMenuClass = classNames({
            "on-front": this.state.showSearchCategoriesMenu
        });

        return (
            <div id="user-interface">
                <button id="show-modal-button" onClick={this.showNewFilmModal}>
                    Add new film
                </button>
                <button id="sort-list-button" onClick={this.sortListOfFilms}>
                    Sort list
                </button>
                <div id="search-wrapper">
                    <label htmlFor="text-input">
                        Search
                        <input
                            ref={this.input}
                            id="text-input"
                            className={ifSearchMenuClass}
                            type="text"
                            name="search"
                            placeholder={this.state.currentSearchCategory}
                            onChange={this.inputChange}
                            disabled={this.state.showSearchCategoriesMenu}
                            autoFocus
                        />
                    </label>
                    <button
                        id="change-search-category-button"
                        className={ifSearchMenuClass}
                        onClick={this.searchCategoriesMenuToggle}
                    >
                        {this.state.showSearchCategoriesMenu ? <>&times;</> : <>&#x25bc;</>}
                    </button>

                    {this.state.showSearchCategoriesMenu && (
                        <>
                            <div id="behind-categories-menu" />
                            <div id="search-categories">
                                <button
                                    className="category"
                                    name="movies"
                                    disabled={this.state.currentSearchCategory === "movies"}
                                    onClick={this.chooseSearchCategory}
                                >
                                    Movies
                                </button>
                                <button
                                    className="category"
                                    name="stars"
                                    disabled={this.state.currentSearchCategory === "stars"}
                                    onClick={this.chooseSearchCategory}
                                >
                                    Stars
                                </button>
                            </div>
                        </>
                    )}
                </div>
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
