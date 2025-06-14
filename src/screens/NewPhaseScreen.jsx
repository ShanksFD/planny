import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import FormContainer from "../components/formContainer";
import {
  getProjectDetails,
  updateProjectPhase,
} from "../actions/projectActions";

function NewPhaseScreen({ history, match }) {
  const projectDetails = useSelector((state) => state.projectDetails);
  const dispatch = useDispatch();

  const [label, setLabel] = useState("");
  const [desc, setDesc] = useState("");
  const [employees, setEmployees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProjectPhase(
        {
          label: label,
          description: desc,
          employees: employees,
          start_date: startDate,
          end_date: endDate,
          price: price,
          is_done: false,
        },
        projectDetails.project._id,
        projectDetails.project.phases
      )
    );
    history.push("/");
  };

  useEffect(() => {
    dispatch(getProjectDetails(match.params.id));
  }, [match, dispatch]);

  //   const calculatePhasesPrice = () => {
  //     let sum = 0;
  //     if (projectDetails.success) {
  //       for (let i = 0; i < projectDetails.project.phasesObjs.length; i++) {
  //         sum += projectDetails.project.phasesObjs[i].price;
  //       }
  //     }
  //     return sum;
  //   };

  return (
    <FormContainer>
      <h1 className="font--light text-center">NEW PHASE</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group controlId="label" className="my-3">
              <Form.Label>LABEL</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Phase label"
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="description" className="my-3">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              placeholder="Phase description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="description" className="my-3">
            <Form.Label>EMPLOYEES</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              placeholder="Empolyees"
              value={employees}
              onChange={(e) => {
                setEmployees(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Col lg={6} md={6} sm={12}>
            <Form.Group controlId="startDate" className="my-3">
              <Form.Label>START DATE</Form.Label>
              <Form.Control
                required
                type="date"
                min={projectDetails.project.start_date || 0}
                max={projectDetails.project.end_date || 0}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Form.Group controlId="endDate" className="my-3">
              <Form.Label>END DATE</Form.Label>
              <Form.Control
                required
                type="date"
                min={projectDetails.project.start_date || 0}
                max={projectDetails.project.end_date || 0}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="price" className="my-4">
            <Form.Label style={{ display: "block" }}>
              PRICE
              <strong style={{ color: "green" }}>
                {" "}
                (total: ${Number(projectDetails.project.price) || 0})
              </strong>
            </Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Price"
              min="0"
              max={projectDetails.project.price || 0}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Button type="submit" variant="primary" className="my-2">
          SAVE
        </Button>
      </Form>
    </FormContainer>
  );
}

export default NewPhaseScreen;
