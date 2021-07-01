import { Modal, Button } from "react-bootstrap";

// Local imports
import "./Popup.css"

export default function Popup(props) {
   return (
     <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header >
         <Modal.Title id="contained-modal-title-vcenter">
           {props.title}
         </Modal.Title>
         <Button onClick={props.onHide} className="justfy-content-end">X</Button>
       </Modal.Header>
       <Modal.Body>
         {props.children}
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={props.onHide}>Close</Button>
       </Modal.Footer>
     </Modal>
   );
}