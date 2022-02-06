import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    // TODO: Criar a checkout session
  }

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe
    </button>
  );
}
