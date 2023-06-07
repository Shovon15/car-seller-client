import { Button, Card } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../Shared/Toast/toaster";

const CheckOutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { price, name, email, _id } = booking;

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  console.log(cardError);

  const handleCardInputChange = (event) => {
    // Validate the card input here
    // If it's valid, clear the cardError
    // if (/* Your card validation logic here */) {
    setCardError("");
    // }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("card info", card);
      // store payment info in the database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };
      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
            showSuccessToast("your payment is completed");
            navigate("/dashboard/bookingItems");
          }
        });
    }
    setProcessing(false);
    console.log(paymentIntent, "paymentIntent");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        //    onChange={setCardError("")}
      >
        <Card className="h-16 p-5 mb-2">
          <CardElement
            onChange={handleCardInputChange}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Card>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="bg-primary px-12"
          >
            Pay
          </Button>
        </div>
      </form>
      <p className="text-red-500">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p className="text-green-500">Transaction Id:{transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default CheckOutForm;
