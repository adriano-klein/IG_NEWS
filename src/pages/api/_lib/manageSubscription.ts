import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";
import { fauna } from "../../../services/fauna";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  //TODO: Buscar usuário do FaunaDB com o ID do {customerID}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  //TODO: Salvar os dados da subscription do usuário no FaunaDB;

  const subscriptionData = {
    id: subscriptionId,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await fauna.query(
    q.Create(q.Collection("subscriptions"), { data: subscriptionData })
  );
}