import React, { Component } from 'react';
import ModalWindow from './ModalWindow';

class ModalButton extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({
      open: true
    });
  }

  closeModal() {
    this.setState({
      open: false
    });
  }

  render() {

    return(
      <div className="modalButton">
        <small onClick={this.showModal}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</small>
        <ModalWindow closeModal={this.closeModal} showModal={this.showModal} open={this.state.open} />
      </div>
    );
  }
}

export default ModalButton;
