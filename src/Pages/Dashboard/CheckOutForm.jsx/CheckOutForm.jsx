import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const CheckOutForm = ({biodataId}) => {

    const stripe = useStripe();
   const axiosPublic= UseAxiosPublic()
  const elements = useElements();
  const {user}=UseAuth()
  const[errors,serError]=useState(null)
  const[ clientSecret,setclientSecret]=useState('')
  const [transId,setTransId]=useState('')
  const navigate = useNavigate()
  // const price =5;
  // const email=user?.email
  useEffect(()=>{
    axiosPublic.post('/create-payment-intent',{price:5})
    .then(res=>{
      console.log(res.data.clientSecret);
      setclientSecret(res.data.clientSecret)
      setTransId('')
    })
  },[axiosPublic])
  console.log(biodataId);
  const {data:fulldata}=useQuery({
    queryKey:['fulldata'],
    enabled:!!user?.email,
    queryFn:async()=>{
        const res = await axiosPublic.get(`/reqbiodatas-paument/${biodataId}`)
        return res.data
    }
})
console.log(fulldata);

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

          name:user?.displayName,
       

        }
      }
    })

    if (confirmError) {
      console.log('[errorconfirm]',confirmError);
      
    } else {
      console.log('[paymentIntent]', paymentIntent);

      if(paymentIntent.status ===  "succeeded"){
        setTransId(paymentIntent.id)
        
      }
    const payment ={
      email:user?.email,
      name:user?.displayName,
      biodataId:biodataId,
      biodtaName:fulldata?.name,
      biodataEmail:fulldata?.ContactEmail,
      biodataMobile:fulldata?.MobileNumber,
      transactinId:paymentIntent.id,
      date: new Date(),
      price:5,
      status:'pending',

    }
    const res = await axiosPublic.post('/payment',payment)
     if(res.data.insertedId){
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Payment Successfull Wait for Admin Aproval",
        showConfirmButton: false,
        timer: 2500
      });
      navigate('/biodatas')
     }
     else{
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "something wrong",
        showConfirmButton: false,
        timer: 2500
      });
     }
     
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
      <button  className="px-5 text-center mt-10  py-2 text-xl rounded-lg bg-rose-100" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>  <p className=" mt-3 text-center text-red-500">{errors}</p>

          {transId ?      <p className="text-green-500 flex justify-center my-4">{transId}Payment Successfull</p>
          :  ''}
            </form>
        </div>
    );
};

export default CheckOutForm;