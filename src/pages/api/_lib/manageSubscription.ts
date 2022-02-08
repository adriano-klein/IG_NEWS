import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";
import { fauna } from "../../../services/fauna";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  //TODO: Buscar usuário do FaunaDB com o ID do {customerID}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  console.log(subscription);

  //TODO: Salvar os dados da subscription do usuário no FaunaDB;

  const subscriptionData = {
    id: subscriptionId,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection("subscriptions"), { data: subscriptionData })
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
        ),
        { data: subscriptionData }
      )
    );
  }
}
