import React, { Component } from 'react';
import { Modal, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUserProfile, saveUserProfile } from '../../actions.js';

class ModalWindow extends Component {

  constructor() {
    super();

    this.state = {
      name: "",
      city: "",
      statePlace: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStatePlaceChange = this.handleStatePlaceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setInitialDetails = this.setInitialDetails.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleCityChange(e) {
    this.setState({city: e.target.value});
  }

  handleStatePlaceChange(e) {
    this.setState({statePlace: e.target.value});
    console.log(this.state.statePlace);
  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.dispatch(saveUserProfile({
      name: this.state.name,
      city: this.state.city,
      state: this.state.statePlace,
      token: this.props.user.userToken
    }));
    this.props.ownProps.closeModal();
  }

  setInitialDetails() {
    this.setState({
      name: this.props.user.name || "",
      city: this.props.user.city || "",
      statePlace: this.props.user.state || ""
    });
  }

  componentWillMount() {
    this.props.dispatch(getUserProfile(this.props.user.userToken));
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     name: nextProps.user.name || "",
  //     city: nextProps.user.city || "",
  //     statePlace: nextProps.user.state || ""
  //   });
  // }

  componentDidMount() {
    this.setInitialDetails();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.ownProps.open} onHide={this.props.ownProps.closeModal}>

          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleNameChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                  <input type="text" id="city" name="city" className="form-control" value={this.state.city} onChange={this.handleCityChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <input type="text" id="state" name="state" className="form-control" value={this.state.statePlace} onChange={this.handleStatePlaceChange} />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="info" onClick={this.handleSubmit}>Edit</Button>
            <Button bsStyle="danger" onClick={this.setInitialDetails}>Cancel</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { isUserAuthenticated, user } = state;
  return {
    isUserAuthenticated, user, ownProps
  };
}


export default connect(mapStateToProps)(ModalWindow);
