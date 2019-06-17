import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import { addFilm } from "../../../actions/films_actions";

export class SingleFilmInterface extends PureComponent {
    static propTypes = {
        addFilm: PropTypes.func,
        waiting: PropTypes.bool,
        response: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.debounce = {};

        this.state = {
            title: "",
            release: "",
            format: "",
            stars: "",

            ready: true,
            showMessage: false,
            innerMessage: ""
        };
    }

    inputChange = e => {
        if (this.state.ready) {
            this.setState({
                ready: false
            });
        }

        return this.debouncedEvents(e.target.name, e.target.value);
    };

    debouncedEvents = (name, value) => {
        if (!this.debounce[name]) {
            this.debounce[name] = debounce((name, value) => {
                this.setState(() => ({
                    [name]: value,
                    ready: true
                }));
            }, 300);
        }

        return this.debounce[name](name, value);
    };

    componentWillUnmount() {
        ["title", "release", "format", "stars"].forEach(d => this.debounce[d] && this.debounce[d].cancel());
    }

    onSubmit = () => {
        const values = [this.state.title, this.state.release, this.state.format, this.state.stars];

        const hasEmpty = values.some(el => el === "");

        if (hasEmpty) {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "All fields are required"
            }));

            return;
        }

        if (Number.isNaN(+this.state.release)) {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "Release year must to be a number"
            }));

            return;
        }

        const film = {
            title: this.state.title,
            release: +this.state.release,
            format: this.state.format,
            stars: this.state.stars.split(",")
        };

        this.setState(() => ({
            innerMessage: "",
            showMessage: true
        }));

        this.props.addFilm(film, "single");
    };

    render() {
        return (
            <div id="single-film-container">
                <div className="inputs" onChange={this.inputChange}>
                    <label htmlFor="title">
                        Title:
                        <input type="text" name="title" id="title" autoFocus />
                    </label>
                    <label htmlFor="release">
                        Release year:
                        <input type="text" name="release" id="release" />
                    </label>
                    <label htmlFor="format">
                        Format:
                        <input type="text" name="format" id="format" />
                    </label>
                    <label htmlFor="stars">
                        Stars:<span className="hint">?</span>
                        <input type="text" name="stars" id="stars" />
                    </label>
                </div>

                <div className="message">
                    {this.state.showMessage && (this.state.innerMessage || this.props.response.message)}
                </div>

                <footer>
                    <button
                        className="submit-button"
                        disabled={!this.state.ready || this.props.waiting}
                        onClick={this.onSubmit}
                    >
                        {this.props.waiting ? "Wait..." : "Submit"}
                    </button>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    waiting: store.films.addFilmWaiting,
    response: store.films.addFilmResponse
});

const mapDispatchToProps = {
    addFilm
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFilmInterface);
