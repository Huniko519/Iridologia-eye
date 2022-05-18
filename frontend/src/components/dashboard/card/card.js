import React from "react";
import ReactDOM from "react-dom";
import PaymentComponent from "./cardcomponent";
import { Container, Jumbotron, Button, Image } from "react-bootstrap";

export default function Card(){
    return(
            <Container>
                <PaymentComponent
                    keys={{
                        stripe: "pk_live_51IIG9OFnB9XCFR50I7aLN9BRvdqMkNFLLBxwkANgyc5N91VKTnJNab0Yu4Dj3NQanyW27qLiHJekTrOVxbvL3Rrw00nEgJmdbm"
                    }}
                />
            </Container>
)
}