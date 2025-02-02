import dotenv from "dotenv";
import stripePackage from "stripe";

dotenv.config();

const stripe = stripePackage(process.env.STRIPE);

export const checkout = async (req, res, next) => {
  try {
    const { data } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name:  data,
            },
            unit_amount: hire.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: http://localhost:5173/success/},
      cancel_url: "http://localhost:5173/dashboard?tab=hires",
    });

    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};