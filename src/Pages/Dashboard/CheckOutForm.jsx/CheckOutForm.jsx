import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckOutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const[errors,serError]=useState(null)

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
    })

    if (error) {
      console.log('[error]', error);
      serError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      serError('')
    }
  };

    return (
        <div>
            
            <form className=" w-1/2 mx-auto bg-rose-50 ring-offset-cyan-200 p-6 rounded-lg " onSubmit={handleSubmit}>
           
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} className="text-red-400 rounded-xl bg-white p-4"
      />
      <button  className="px-5 text-center mt-10  py-2 text-xl rounded-lg bg-rose-100" type="submit" disabled={!stripe}>
        Pay
      </button>  <p className=" mt-3 text-center text-red-500">{errors}</p>

                
            </form>
        </div>
    );
};

export default CheckOutForm;