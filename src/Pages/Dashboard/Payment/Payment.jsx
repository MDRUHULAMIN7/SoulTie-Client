import { loadStripe } from "@stripe/stripe-js";
import Heading from "../Sidebar/Heading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../CheckOutForm.jsx/CheckOutForm";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    const {biodataId}=useParams()
    console.log(biodataId);
    return (
        <div>

            <Heading subheading={'you can use stripe for payment here'} heading={'Payment'}></Heading>

            <div>
            <Elements stripe={stripePromise}>
          <CheckOutForm biodataId={biodataId}></CheckOutForm>
            </Elements>
            </div>
            
        </div>
    );
};

export default Payment;