import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const root = document.getElementById("modal-root");

export function ModalPortal(props) {
    if (!props.show) return null;

    return ReactDOM.createPortal(props.children, root);
}

ModalPortal.propTypes = {
    show: PropTypes.bool
};

const mapStateToProps = store => ({
    show: store.modal.show
});

export default connect(mapStateToProps)(ModalPortal);
