import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { Card, Row, Col, ToggleButtonGroup, ToggleButton, Form, FormGroup } from 'react-bootstrap';
import { Button } from "@material-ui/core"
import CreditCardForm from './cardfield';
import "./elements.css";
import { useHistory, Redirect, Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { connect, useSelector, useDispatch } from 'react-redux';

import JsonData1 from '../../layout/data/data_en.json'
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';

var prev1 = "4";

//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

//declare class
export default function PaymentComponent(props) {

  let history = useHistory();

  const [landingPageData, setLandingPageData] = useState(JsonData4);
  const { translateFlag } = useSelector(state => state.translator);
  const [renderFlag, setRenderFlag] = useState(true);

  const getlandingPageData = (flag) => {
    switch (flag) {
      case "1":
        prev1 = "1";
        return setLandingPageData(JsonData1)
      case "2":
        prev1 = "2";
        return setLandingPageData(JsonData2)
      case "3":
        prev1 = "3";
        return setLandingPageData(JsonData3)
      case "4":
        prev1 = "4";
        return setLandingPageData(JsonData4)
      case "5":
        prev1 = "5";
        return setLandingPageData(JsonData5)
      default:
        return null;
    }
  }

  useEffect(() => {
    if (prev1 !== translateFlag) {
      console.log("I will sleep")
      getlandingPageData(translateFlag)
    }
    else {
      if (renderFlag) {
        getlandingPageData(translateFlag);
        setRenderFlag(false)
      }
    }
  })

  //render
  return (
    <div style={{ marginTop: "20%" }}>
      <h2 style={{ textAlign: "center", fontFamily: "initial" }}>{landingPageData ? landingPageData.Service.buyWithCardTitle : "loading"}</h2>
      <Card border="primary" id="paymentWidgetContainerCard" style={{ marginLeft: "10%", marginRight: "10%", marginTop: "10%" }}>

        {/* header and back button */}
        <Card.Header>
          <Row>
            <Col>
              <Button variant="contained" color="secondary" onClick={() => { history.push("/buy-space") }}>{landingPageData ? landingPageData.PatientTable.backButton : "loading"}</Button>
            </Col>
          </Row>
        </Card.Header>

        {/* body */}
        <Card.Body >

          <Elements stripe={loadStripe(props.keys.stripe)} options={ELEMENTS_OPTIONS}>
            <CreditCardForm />
          </Elements>

        </Card.Body>
      </Card>
    </div>
  );

}
