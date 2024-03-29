import { GetStaticProps } from "next";

import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import Image from "next/image"

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} per month</span>
          </p>
          <SubscribeButton />
        </section>

        <Image src="/images/avatar.svg" alt="Girl coding" width={336} height={521}/>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KP2rUEaFQMfcZB6EgFGu3Qd", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
