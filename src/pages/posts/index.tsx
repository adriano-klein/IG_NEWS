import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time> 9 de fevereiro de 2022 </time>
            <strong>Creating anything with Prismic CMS</strong>
            <p>
              Muitos devs que acompanham nosso trabalho se perguntam como é o
              meu processo de criação da parte visual de uma interface, seja uma
              página de evento, website ou até mesmo a nossa plataforma de
              ensino, o Station.
            </p>
          </a>

          <a href="#">
            <time> 9 de fevereiro de 2022 </time>
            <strong>Creating anything with Prismic CMS</strong>
            <p>
              Muitos devs que acompanham nosso trabalho se perguntam como é o
              meu processo de criação da parte visual de uma interface, seja uma
              página de evento, website ou até mesmo a nossa plataforma de
              ensino, o Station.
            </p>
          </a>

          <a href="#">
            <time> 9 de fevereiro de 2022 </time>
            <strong>Creating anything with Prismic CMS</strong>
            <p>
              Muitos devs que acompanham nosso trabalho se perguntam como é o
              meu processo de criação da parte visual de uma interface, seja uma
              página de evento, website ou até mesmo a nossa plataforma de
              ensino, o Station.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.tile", "post.content"],
      pageSize: 100,
    }
  );
  console.log(response);

  return {
    props: {},
  };
};
