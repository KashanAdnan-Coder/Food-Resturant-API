import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Pl5zlDHqlZvJkVMLjFBrmEazmDwCJJyNwO697GF1qhkKJV0xwNq7BUNLDlA9M3qKnBpTa59v9GbZWpch33WhElc002zEv3bmA');


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: "price_abc123",
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}