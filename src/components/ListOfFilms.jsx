import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Film from "./Film";

import { getListOfFilms } from "../actions/films_actions";

export class ListOfFilms extends PureComponent {
    static propTypes = {
        getListOfFilms: PropTypes.func,
        list: PropTypes.array,
        loading: PropTypes.bool,
        response: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    };

    componentDidMount() {
        this.props.getListOfFilms();
    }

    tryAgain = () => {
        this.props.getListOfFilms();
    };

    render() {
        const { ok } = this.props.response;

        return (
            <div id="list-of-films-container">
                <div className="message">
                    {this.props.loading ? (
                        <div className="simple-message">Loading...</div>
                    ) : ok === false ? (
                        <div id="get-list-error">
                            <p>Something wrong...</p>
                            <button id="try-again-button" onClick={this.tryAgain}>
                                Try again.
                            </button>
                        </div>
                    ) : (
                        !this.props.list.length && <div className="simple-message">The list is empty</div>
                    )}
                </div>

                <div id="list-of-films">
                    {this.props.list.map(film => {
                        return <Film key={film.ID} film={film} />;
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    list: store.films.list,
    loading: store.films.getListOfFilmsLoading,
    response: store.films.getListOfFilmsResponse
});

const mapDispatchToProps = {
    getListOfFilms
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfFilms);
