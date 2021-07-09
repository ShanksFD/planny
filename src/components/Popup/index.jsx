import { Modal, Button } from "react-bootstrap";

// Local imports
import "./Popup.css"

export default function Popup({confirmation, confirmationTitle, buttonVariant, onConfirmation, onHide, children, title, show, isClickable}) {
   return (
     <Modal
       show={show}
       onHide={onHide}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header >
         <Modal.Title id="contained-modal-title-vcenter">
           {title}
         </Modal.Title>
         <Button onClick={onHide} className="justfy-content-end">X</Button>
       </Modal.Header>
       <Modal.Body>
         {children}
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={onHide} className="btn btn-secondary">CLOSE</Button>
         {
           confirmation && <Button onClick={onConfirmation} variant={buttonVariant} disabled={isClickable}>{confirmationTitle}</Button>
         }
       </Modal.Footer>
     </Modal>
   );
}