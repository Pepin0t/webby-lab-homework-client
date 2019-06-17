import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleFilmInterface from "./SingleFilmInterface";
import MultipleFilmsInterface from "./MultipleFilmsInterface";

import { hideNewFlimModal } from "../../../actions/modal_actions";

export class NewFilmModal extends PureComponent {
    static propTypes = {
        close: PropTypes.func,
        waiting: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.behindModal = createRef();
        this.closeButton = createRef();

        this.state = {
            multiple: false
        };
    }

    onChangeMode = () => {
        this.setState(state => ({
            multiple: !state.multiple
        }));
    };

    onCloseModal = e => {
        if ((e.target === this.behindModal.current || e.target === this.closeButton.current) && !this.props.waiting) {
            this.props.close();
        }
    };

    render() {
        return (
            <div id="behind-modal" ref={this.behindModal} onClick={this.onCloseModal}>
                <div id="modal-container">
                    <header>
                        <button
                            className="change-mode-button"
                            onClick={this.onChangeMode}
                            disabled={!this.state.multiple || this.props.waiting}
                        >
                            Single film
                        </button>
                        <button
                            className="change-mode-button"
                            onClick={this.onChangeMode}
                            disabled={this.state.multiple || this.props.waiting}
                        >
                            Import from file
                        </button>
                        <button
                            id="close-modal"
                            disabled={this.props.waiting}
                            ref={this.closeButton}
                            onClick={this.onCloseModal}
                        >
                            &times;
                        </button>
                    </header>

                    <div id="mode">{!this.state.multiple ? <SingleFilmInterface /> : <MultipleFilmsInterface />}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    waiting: store.films.addFilmWaiting
});

const mapDispatchToProps = {
    close: hideNewFlimModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFilmModal);
