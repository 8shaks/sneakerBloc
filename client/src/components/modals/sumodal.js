import './../../App.css'
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup,
  Label,
  Input, } from 'reactstrap';


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <p color="primary" onClick={this.toggle}> Sign up</p>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign UP</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
      <FormGroup>
      <Label for="SIgn Up">Username</Label>
      <Input
      type="text"
      name="name"
      placeholder="Username"
      onChange={this.onChange}
      >
      </Input>
      <Label for="Sign Up">Email Adress</Label>
      <Input
      type="text"
      name="name"
      placeholder="Email Adress"
      onChange={this.onChange}
      >
      </Input>
      <Label for="Password">Password</Label>
      <Input
      type="text"
      name="name"
      placeholder="Password"
      onChange={this.onChange}
      >
      </Input>
      
      <Label for="Password">Enter password again</Label>
      <Input
      type="text"
      name="name"
      placeholder="Password"
      onChange={this.onChange}
      >
      
      </Input>
      </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;