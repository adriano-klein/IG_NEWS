import Head from "next/head";
import styles from "./styles.module.scss";

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
