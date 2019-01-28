import React from 'react';
import { Modal as Mod, OverlayTrigger , Button } from 'react-bootstrap';

class Modal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {

      return (
          <Mod show={this.state.show} onHide={this.handleClose}>
            <Mod.Header closeButton>
              <Mod.Title>Mod heading</Mod.Title>
            </Mod.Header>
            
            <Mod.Body>
              <h4>Text in a Mod</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
            </Mod.Body>

            <Mod.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Mod.Footer>
          </Mod>
      );
    }
  }

  export { Modal };