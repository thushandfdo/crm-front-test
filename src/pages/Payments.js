import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import './PaymentStyles.css';

const stripePromise = loadStripe("pk_test_51MUsoZAohmapaowNfCCAq0VgDtiwa4oelYilafpDtugHTyYXKuEfUc9qtlr3PJYXPCW7ikrqUbdtuoS5EDzyOk8v00TYupu58G");

export default function Payments() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://localhost:7143/api/Payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='payments'>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <Checkout />
                </Elements>
            )} 
        </div>
    )
}
