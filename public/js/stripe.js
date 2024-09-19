import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // You don't even need next line
    const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
    const res = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(res);

    if (res.status === 200) location.assign(res.data.data.url);
  } catch (err) {
    showAlert('error', err);
  }
};
