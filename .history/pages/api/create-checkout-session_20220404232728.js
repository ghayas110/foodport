// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
export default function handler(req, res) {
    const {items,email}=req.body;
    const transformedItems=items.map(item=>({
        description:item.description,
        quantity
        priice_data:{
            currency:'gbp',
            unit_amount:item.price*100,
            product_data:{
                name:items.title,
                image:[item.image]
            },

        }
    }))
  }
  