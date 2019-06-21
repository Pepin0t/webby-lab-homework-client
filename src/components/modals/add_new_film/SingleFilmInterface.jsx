import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import { addFilm } from "../../../actions/films_actions";

export class SingleFilmInterface extends PureComponent {
    static propTypes = {
        addFilm: PropTypes.func,
        waiting: PropTypes.bool,
        response: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    };

    constructor(props) {
        super(props);

        this.debounce = {};
        this.inputs = [];

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

    componentDidUpdate(prevProps) {
        if (this.props.response.ok === true && prevProps.response.ok === undefined) {
            this.setState(
                {
                    title: "",
                    release: "",
                    format: "",
                    stars: ""
                },
                () => {
                    this.inputs.forEach(input => (input.value = ""));
                }
            );
        }
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

        const release = +this.state.release;

        if (Number.isNaN(release)) {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "Release year must to be a number"
            }));

            return;
        }

        if (release < 1850 || release > 2020) {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "Release year must be between 1850 and 2020"
            }));

            return;
        }

        const film = {
            title: this.state.title,
            release,
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
                        <input ref={input => (this.inputs[0] = input)} type="text" name="title" id="title" autoFocus />
                    </label>
                    <label htmlFor="release">
                        Release year:
                        <input ref={input => (this.inputs[1] = input)} type="text" name="release" id="release" />
                    </label>
                    <label htmlFor="format">
                        Format:
                        <input ref={input => (this.inputs[2] = input)} type="text" name="format" id="format" />
                    </label>
                    <label htmlFor="stars">
                        Stars:<span className="hint">?</span>
                        <input ref={input => (this.inputs[3] = input)} type="text" name="stars" id="stars" />
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
