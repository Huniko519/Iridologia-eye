import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link, withRouter } from "react-router-dom";
import {Button} from "@material-ui/core"
import {
    CardElement,
    useElements,
    useStripe,
    Elements,
} from "@stripe/react-stripe-js";
import { Form, Modal } from "react-bootstrap";
import Field from "./cardform";
import swal from 'sweetalert';
import {connect, useSelector, useDispatch} from 'react-redux';
//css provided by stripe to format elements

import JsonData1 from '../../layout/data/data_en.json'
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';

var prev1 = "4";

const axios = require("axios");

//credit card element specific styling
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "18px",
			color: "#424770",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                   color: '#cccccc',
            },
            "::placeholder": {
                   color: '#888',
            },
        },
        invalid: {
            iconColor: "red",
            color: "red",
        },
        mobileCardField:{
            position: "fixed",
            left: 0,
            right: 0
        },
        mobileCardPayButton:{
            marginTop: "100px"
        }
    },
};

//scredit card button sub component
const CardField = ({onChange}) => (
    <div className="FormRow" style = {window.innerWidth<=500 ? CARD_OPTIONS.style.mobileCardField : null}>
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  );

//submit button sub component
const SubmitButton = ({ processing, error, children, disabled }) => (
    <Button
        style = {window.innerWidth<=500 ? CARD_OPTIONS.style.mobileCardPayButton : null}
        fullWidth
        variant = "contained"
        color="primary"
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </Button>
);

//component declaration
function CreditCardForm(props) {

    let history = useHistory();
    const {auth} = props;

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [price, setPrice] = useState(auth.planwithwhat);
    const [billingDetails, setBillingDetails] = useState({
        email: auth.user.email
    });

    const [landingPageData, setLandingPageData] = useState(JsonData4);
    const {translateFlag} = useSelector(state => state.translator);
    const [renderFlag, setRenderFlag] = useState(true);

    const getlandingPageData =(flag)=> {
        switch (flag){
          case "1" : 
            prev1 = "1";
            return setLandingPageData(JsonData1)
          case "2" : 
            prev1 = "2";
            return setLandingPageData(JsonData2)
          case "3" : 
            prev1 = "3";
            return setLandingPageData(JsonData3)
          case "4" : 
            prev1 = "4";
            return setLandingPageData(JsonData4)
          case "5" : 
            prev1 = "5";
            return setLandingPageData(JsonData5)
          default:
            return null;
        }
      }
    
      useEffect(()=>{
        if(prev1 !== translateFlag){
          console.log("I will sleep")
          getlandingPageData(translateFlag)
        }
        else{
          if(renderFlag){
            getlandingPageData(translateFlag);
            setRenderFlag(false)
          }
        }
      })

    //resets state on completion
    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod('');
        setPrice(0);
        setSuccess(false);
        setCardComplete(false);
        setBillingDetails({
        email: billingDetails.email
        });
    };

    /*
	This code runs when a card transaction is submitted
	There are three main components to this function:
		
		1. create a new stripe payment method using the form data
		
		2. get a payment intent from the server using the speficied price

		3. confirm the payment intent using the new payment method

		4. send a confiemation to the server if the payment succeeded
    */
    
    const CardFix =(event)=>{
                        // setError(event.error);
                        setCardComplete(event.complete);
    }
    const handleSubmit = async (event) => {
        //prevent default form values
        event.preventDefault();

        ///if stripe api is loaded
        if (!stripe || !elements) {
            return;
        }

        //handle errors
        if (error) {
            console.log(error);
            elements.getElement("card").focus();
            return;
        }

        //start processing animation on submit button
        if (cardComplete) {
            setProcessing(true);
        } else {
            return;
        }
		//STEP 1:
        //create new payment method based on card and form information
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        });

        //handle errors, otherwise set the new payment method in state
        if (payload.error) {
            setError(payload.error);
            return;
        } 
		
		//STEP 2:
        //create a new payment request and get irs client secret + id from the server
        const intentData = await axios
            .post("/api/users/stripe", {
                //include the bet amount
                price: price,
                doctor: auth.user.id
            })
            .then(
                (response) => {
                    //SUCCESS: put client secret and id into an object and return it
                    return {
                        secret: response.data.client_secret,
                        id: response.data.intent_id,
                    };
                },
                (error) => {
                    //ERROR: log the error and return
                    setError(error)
                    return error;
                }
            );
		
		//STEP 3:
        //confirm the payment and use the new payment method
        const result = await stripe.confirmCardPayment(intentData.secret, {
            payment_method: payload.paymentMethod.id,
        });

        //handle errors again
        if (result.error) {
            setError(result.error);
            return
        }
		
		//STEP 4:
        // The payment has been processed! send a confirmation to the server
        if (result.paymentIntent.status === "succeeded") {
            const confirmedPayment = await axios
                .post("/api/users/confirm-payment", {
                    //include id of payment
                    payment_id: intentData.id,
                    payment_type: "stripe",
                    //send any other data here
                })
                .then(
                    (response) => {
                        //SUCCESS: return the response message
                        return response.data.success;
                    },
                    (error) => {
                        //ERROR:
                        console.log(error);
                        setError(error)
                        return error;
                    }
                );

            //reset the state and show the success message
            if (confirmedPayment) {

                //reset the form
                
                reset();
                /*
                 YOUR APPLICATION SPECIFIC CODE HERE:
                 for this example all we do is render a modal
                */
                setSuccess(true);
                swal("WELCOME!", "Your just buy some space successfully", "success");
                history.push('/dashboard')
            }
        }
    }

    

    //render
    return (
        // the credit card form
        <Form className="Form" onSubmit={handleSubmit}>
            

            {/* credit card field and submit button */}
                {/* card */}
                <CardField
                    onChange={CardFix}
                />
        
            {/* submit */}
            <SubmitButton
                    processing={processing}
                    error={error}
                    disabled={!stripe}
                >
                    {landingPageData ? landingPageData.Service.buyWithCard:"loading"}
            </SubmitButton>
        </Form>
    );
    
}

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(
    mapStateToProps, {}
)(withRouter(CreditCardForm));
