import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { deleteFilm } from "../actions/films_actions";
import { deleteFilm as del } from "../services/db";

export class Film extends PureComponent {
    static propTypes = {
        film: PropTypes.object,
        deleteFilm: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.deleteFilm = this.deleteFilm.bind(this);
    }

    state = {
        expanded: false,
        showDeleteConfirm: false,
        waiting: false,
        response: {}
    };

    prepareToDelete = e => {
        e.stopPropagation();

        this.setState(state => ({
            showDeleteConfirm: !state.showDeleteConfirm
        }));
    };

    onExpand = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };

    async deleteFilm(e) {
        e.stopPropagation();

        this.setState(() => ({
            waiting: true
        }));

        let ID = this.props.film.ID;

        try {
            const { data } = await del(ID);

            this.setState(
                {
                    waiting: false,
                    response: data
                },
                () => {
                    this.props.deleteFilm(ID);
                }
            );
        } catch (error) {
            this.setState(() => ({
                waiting: false,
                response: error.response.data
            }));
        }
    }

    render() {
        const filmContainerClass = classNames({
            "film-container": true,
            expanded: this.state.expanded
        });

        const { ok } = this.state.response;

        return (
            <div className={filmContainerClass} onClick={this.onExpand}>
                <div className="info">
                    {!this.state.expanded ? (
                        <div className="preview">{this.props.film.title}</div>
                    ) : (
                        <>
                            <div className="film-id film-data">ID: {this.props.film.ID.toUpperCase()}</div>
                            <div className="film-data">Title: {this.props.film.title}</div>
                            <div className="film-data">Release year: {this.props.film.release}</div>
                            <div className="film-data">Format: {this.props.film.format}</div>
                            <div className="film-data">Stars: {this.props.film.stars.join(", ")}</div>
                        </>
                    )}
                </div>
                <div className="delete">
                    {this.state.showDeleteConfirm && (
                        <>
                            <div className="question">
                                {this.state.waiting ? "Wait..." : ok === false ? "Error" : "Delete?"}
                            </div>
                            <button disabled={this.state.waiting} className="confirm-button" onClick={this.deleteFilm}>
                                &#x2713;
                            </button>
                        </>
                    )}
                    <button
                        disabled={this.state.waiting}
                        className="prepare-to-delete-button"
                        onClick={this.prepareToDelete}
                    >
                        &times;
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    deleteFilm
};

export default connect(
    null,
    mapDispatchToProps
)(Film);
