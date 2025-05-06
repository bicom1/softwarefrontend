import React from "react";
import { Col, Row } from "reactstrap";
import UserData from "./UserData";
import { Container } from "react-bootstrap";
import FilterCardEscalations from "./FilterCardEscalations";
import FilterCardEvaluations from "./FilterCardEvaluations";

const ViewUserAllData = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xl={2} lg={3} md={4} sm={6} className="p-2">
            <FilterCardEvaluations />
            <FilterCardEscalations />
          </Col>
          <Col xl={10} lg={9} md={8} sm={6}>
            <UserData />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewUserAllData;
