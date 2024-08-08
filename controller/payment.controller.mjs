import stripe from 'stripe'
stripe(process.env.SECRET_KEY);

const loadPayment = async (req, res) => {
    try {

        return res.render('payment', { amount: 25, publisherKey: process.env.PUBLISHER_KEY });

    }
    catch (error) {
        return res.render('404', { message: error.message });
    }
}

const paymentCharge = async (req, res) => {
    const { token, amount, name } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, //in cents
            currency: 'usd',
            source: token,
            description: 'Custom Stripe Payment',
            shipping: {
                name: name,
                address: {
                    line1: '123 Main station',
                    line2: 'Apt 1',
                    city: 'Anytown',
                    state: 'NY',
                    postal_code: '12345',
                    country: 'US'
                }
            }
        });

        return res.json({ success: true, charge });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

export {
    loadPayment,
    paymentCharge
}