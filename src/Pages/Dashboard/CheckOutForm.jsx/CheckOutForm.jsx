import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";


const CheckOutForm = ({biodataId}) => {
    const stripe = useStripe();
   const axiosPublic= UseAxiosPublic()
  const elements = useElements();
  const {user}=UseAuth()
  const[errors,serError]=useState(null)
  const[   clientSecret,setclientSecret]=useState('')
  // const price =5;
  // const email=user?.email
  useEffect(()=>{
    axiosPublic.post('/create-payment-intent',{price:5})
    .then(res=>{
      console.log(res.data.   clientSecret);
      setclientSecret(res.data.   clientSecret)
    })
  },[axiosPublic])

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }


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
    const{paymentIntent,error:confirmError}= await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          email:user?.email,
          biodataId:biodataId,
          name:user?.displayName,
          amount:5

        }
      }
    })

    if (confirmError) {
      console.log('[errorconfirm]',confirmError);
      
    } else {
      console.log('[paymentIntent]', paymentIntent);
     
    }
  };

    return (
        <div>
            
            <form className=" w-1/2 mx-auto bg-rose-50 ring-offset-cyan-200 p-6 rounded-lg " onSubmit={handleSubmit}>
           <div className="space-y-2 mb-2 justify-between mx-2 font-medium "> <p>BiodataId:{biodataId}</p> <p>Your email:{user?.email}</p></div>
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
      <button  className="px-5 text-center mt-10  py-2 text-xl rounded-lg bg-rose-100" type="submit" disabled={!stripe || !   clientSecret}>
        Pay
      </button>  <p className=" mt-3 text-center text-red-500">{errors}</p>

                
            </form>
        </div>
    );
};

export default CheckOutForm;