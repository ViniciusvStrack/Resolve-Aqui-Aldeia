const express = require("express");
const Stripe = require("stripe");
const { proteger } = require("../middlewares/auth");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const planos = {
  profissional: {
    nome: "Plano Profissional",
    preco: 2900,
  },
  premium: {
    nome: "Plano Premium",
    preco: 4900,
  },
};

router.post("/criar-checkout", proteger, async (req, res) => {
  const { plano } = req.body;

  if (!planos[plano]) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Plano inválido.",
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: planos[plano].nome,
          },
          unit_amount: planos[plano].preco,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.FRONTEND_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/planos`,
    metadata: {
      profissionalId: req.profissional._id.toString(),
      plano,
    },
  });

  res.json({ url: session.url });
});

module.exports = router;