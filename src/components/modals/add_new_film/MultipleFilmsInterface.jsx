import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addFilm } from "../../../actions/films_actions";

export class MultipleFilmsInterface extends PureComponent {
    static propTypes = {
        addFilm: PropTypes.func,
        waiting: PropTypes.bool,
        response: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    };

    constructor(props) {
        super(props);

        this.form = createRef();
        this.fileInput = createRef();

        this.state = {
            fileName: "",
            showMessage: false,
            innerMessage: "",

            ready: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.response.ok === true && prevProps.response.ok === undefined) {
            this.setState(
                {
                    innerMessage: "",
                    fileName: "",
                    ready: false
                },
                () => {
                    this.form.current.reset();
                }
            );
        }
    }

    onSubmit = () => {
        const file = this.fileInput.current.files[0];

        this.setState(
            {
                showMessage: true
            },
            () => {
                this.props.addFilm(file, "multiple");
            }
        );
    };

    inputChange = () => {
        if (!this.fileInput.current.files[0]) {
            this.setState(() => ({
                fileName: "",
                showMessage: false,
                innerMessage: "",
                ready: false
            }));

            return;
        }

        const fileError = message => {
            this.setState(
                {
                    fileName: "",
                    showMessage: true,
                    innerMessage: message,
                    ready: false
                },
                () => {
                    this.form.current.reset();
                }
            );
        };

        if (this.fileInput.current.files[0].type !== "text/plain") {
            fileError("Unsupported file's format");

            return;
        }

        if (this.fileInput.current.files[0].size > 50000) {
            fileError("Maximum file's size exceeded");

            return;
        }

        this.setState(() => ({
            fileName: this.fileInput.current.files[0].name,
            showMessage: false,
            innerMessage: "",
            ready: true
        }));
    };

    render() {
        return (
            <div id="multiple-films-container">
                <form ref={this.form} id="file-container">
                    <label htmlFor="file">
                        <input
                            ref={this.fileInput}
                            type="file"
                            name=""
                            id="file"
                            accept=".txt"
                            onChange={this.inputChange}
                        />
                    </label>
                    <div> {this.state.fileName ? "File's name: " + this.state.fileName : "Choose your file"}</div>
                </form>

                <div id="file-rules">Supported formats: txt; Max-size: 50Kb</div>

                <div id="file-example">
                    <div id="example-title">File example</div>
                    <div id="example-body">
                        <p>Title: Charade</p>
                        <p>Release Year: 1953</p>
                        <p>Format: DVD</p>
                        <p>Stars: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy</p>

                        <br />

                        <p>Title: Cool Hand Luke</p>
                        <p>Release Year: 1967</p>
                        <p>Format: VHS</p>
                        <p>Stars: Paul Newman, George Kennedy, Strother Martin</p>

                        <br />
                        <p>...</p>
                    </div>
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
)(MultipleFilmsInterface);
