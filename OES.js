const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Define a route to handle incoming payment token and amount
app.post('/processPayment', async (req, res) => {
    try {
        const paymentToken = req.body.paymentToken;
        const amount = req.body.amount; // Get the amount from the request body

        // Now, you can use Axios to make an API request to Paysafe's API for payment processing.
        // Construct the request body and make the API call to Paysafe.

        // Replace the following with your Paysafe API call
        const paysafeResponse = await axios.post(
            'https://api.test.paysafe.com/cardpayments/v1/accounts/1002318590/auths',
            {
                merchantRefNum: 'your-merchant-reference-number',
                amount: amount, // Use the amount received from the request body
                settleWithAuth: true,
                card: {
                    paymentToken: paymentToken,
                },
                billingDetails: {
                    street: '100 Queen Street West',
                    city: 'Toronto',
                    state: 'ON',
                    country: 'CA',
                    zip: 'M5H 2N2',
                },
            },
            {
                auth: {
                    username: 'test_liviudd1',
                    password: 'B-qa2-0-60f06e6d-0-302c02141916198671b06324fa401a3b967dd18815fe7ead021461a345b51ec3b4dc855b6da9445d2077241099b2', // Use the API password you provided
                },
            }
        );

        // Handle the Paysafe API response and send a response back to the client
        res.json(paysafeResponse.data);
    } catch (error) {
        // Handle errors
        console.error('Error processing payment:', error.message);
        res.status(500).json({ error: 'Payment processing error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
