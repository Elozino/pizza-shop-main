import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51LOCl2EOkFHCJu7Gl43sI2shRxM0IEbf3uRlVaLDARLEbMz4UXT3A2Y7FwmOHR3JYNoYQBMcUegXymZdGeUQoUIj00EBQOa5FQ"
);

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;
          const newImage = img
            .replace("image-", "https://cdn.sanity.io/images/dt048ux7/pizza/")
            .replace("-jpg", ".jpg");
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 150,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        //success page
        success_url: `${req.headers.origin}/success`,
        // where it was before
        cancel_url: `${req.headers.origin}/cart`,
      };

      // checkout session
      const session = await stripe.checkout.sessions.create(params);
      console.log(session)
      res.status(200).json(session )
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// const session = await stripe.checkout.sessions.create({
//   line_items: [
//     {
//       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//       price: '{{PRICE_ID}}',
//       quantity: 1,
//     },
//   ],
//   mode: 'payment',
//   success_url: `${req.headers.origin}/?success=true`,
//   cancel_url: `${req.headers.origin}/?canceled=true`,
// });
// res.redirect(303, session.url);
