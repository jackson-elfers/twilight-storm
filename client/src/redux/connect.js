import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { user, notice } from "./actions";

function mapStateToProps(state) {
  return {
    globals: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      user: bindActionCreators(user, dispatch),
      notice: bindActionCreators(notice, dispatch)
    }
  };
}

export default function(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
