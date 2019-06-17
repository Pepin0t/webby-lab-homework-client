import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addFilm } from "../../../actions/films_actions";

export class MultipleFilmsInterface extends PureComponent {
    static propTypes = {
        addFilm: PropTypes.func,
        waiting: PropTypes.bool,
        response: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.fileInput = createRef();

        this.state = {
            fileName: "",
            showMessage: false,
            innerMessage: ""
        };
    }

    onSubmit = () => {
        const file = this.fileInput.current.files[0];

        if (file.type !== "text/plain") {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "Unsupported file's format"
            }));

            return;
        }

        if (file.size > 50000) {
            this.setState(() => ({
                showMessage: true,
                innerMessage: "Maximum file's size exceeded"
            }));

            return;
        }

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
        const file = this.fileInput.current.files[0];

        if (!file) return;

        this.setState(() => ({
            fileName: file.name,
            showMessage: false,
            innerMessage: ""
        }));
    };

    render() {
        return (
            <div id="multiple-films-container">
                <div id="file-container">
                    <label htmlFor="file">
                        <input type="file" name="" id="file" ref={this.fileInput} onChange={this.inputChange} />
                    </label>
                    <div> {this.state.fileName ? "File's name: " + this.state.fileName : "Choose your file"}</div>
                </div>

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
                        disabled={!this.state.fileName || this.props.waiting}
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
