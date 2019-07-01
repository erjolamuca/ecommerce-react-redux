const app = require("express")();
const stripe = require("stripe")("your_secret_stripe_key");

app.use(require("body-parser").json());

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: "usd",
      description: "Next charge",
      source: req.body.stripeToken
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(9000, () => console.log("Listening on port 9000"));
