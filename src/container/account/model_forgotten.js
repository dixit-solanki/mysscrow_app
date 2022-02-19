
import { input, textarea, Loading ,lib } from '../library/elements';
import { modal } from '../library/elements/modal';
import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field,reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../account/account_action';
import { Button } from 'react-bootstrap';
class ModalAccountFrogotPassword extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeModal = this.handleFormSubmit.bind(this);
   this.state = { isButtonLoading:false };
  }


  handleFormSubmit(formProps) {
  this.state = { isButtonLoading:true };
    var _this = this;
    this.props.forgotPassword(formProps, function(err, result) {
      if(result) {
        _this.setState({ isLoading: false });
        _this.props.removeModal();
        // browserHistory.push('/signin');
      }
    });
  }
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
        <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  goSignup() {
  this.props.removeModal();
  // browserHistory.push('/signup');
}
  render() {
    const { handleSubmit ,submitting ,errorMessage } = this.props;
        var isButtonLoading = this.state.isButtonLoading;


        if(errorMessage){
          isButtonLoading = false;
        }
    return (
      <div className="account-forgotten model-card cm-frm">
      <div className="account-banner">
        <div className="cp-1">
          <div className="row">
            <div className="col-sm-12">
              <div className="well">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  {this.renderAlert()}
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <h6>Enter your email address to receive  a new password</h6>
                    </div>
                    <div className="col-sm-12 position-relative has-icon-left">
                      <Field name="email" type="text" icon="fa fa-envelope-o" component={input} label="Email"/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <button action="forgotpassword" className="btn btn-primary btn-block" disabled={isButtonLoading}>
                        <i className="fa fa-paper-plane"></i> {isButtonLoading ? 'Loading...' : 'Send'}
                      </button>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12 text-center">
                      New to Mysscrow? <Link className="form-link" onClick={() => this.goSignup()} to="/signup">Register Now</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
  );
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Required Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
  }
}

ModalAccountFrogotPassword = reduxForm({
  form: 'forgotpassword',
  validate: validate
})(ModalAccountFrogotPassword);

export default connect(mapStateToProps, {forgotPassword})(ModalAccountFrogotPassword);