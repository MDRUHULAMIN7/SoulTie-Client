import { loadStripe } from "@stripe/stripe-js";
import Heading from "../Sidebar/Heading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../CheckOutForm.jsx/CheckOutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    return (
        <div>

            <Heading subheading={'you can use stripe for payment here'} heading={'Payment'}></Heading>

            <div>
            <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
            </Elements>
            </div>
            
        </div>
    );
};

export default Payment;