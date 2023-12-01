import styles from "@/components/AdCard.module.css";

import { CategoryType } from "./Category";
import { TagType } from "./Tag";
import { useMutation } from "@apollo/client";
import { queryAllAds } from "@/graphQl/queryAllAds";
import Link from "next/link";
import { mutationDeleteAd } from "@/graphQl/mutationDeleteAd";
import { Flipped } from "react-flip-toolkit";

export type AdType = {
  id: number;
  link?: string;
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  editLink?: string;
  category: CategoryType | null;
  tags: TagType[] | null;
};

export type AdCardProps = AdType & {
  onDelete?: () => void;
};

export function AdCard(props: AdCardProps): React.ReactNode {
  const [doDelete, { data, error, loading }] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });

  async function deleteAd() {
    await doDelete({
      variables: {
        id: props.id,
      },
    });
    if (props.onDelete) {
      props.onDelete();
    }
  }

  return (
    <Flipped flipId={props.id}>
      <div className={styles.adCardContainer}>
        <article>
          <figure className={styles.figure}>
            <img src={props.imgUrl} alt={props.title} />
          </figure>
          <div className={styles.adCardBody}>
            <div className={styles.adCardText}>
              <div className={styles.adCardTitle}>
                <h3>{props.title}</h3>
                <span className={styles.cardPrice}>{props.price}€</span>
              </div>
              <span className={styles.category}>• {props.category?.name}</span>
              <p>{props.description}</p>
            </div>
            <div className={styles.adCardTags}>
              {props.tags?.map((item) => (
                <span key={item.id}># {item.name}</span>
              ))}
            </div>
            <div className={styles.btnDiv}>
              {props.onDelete && (
                <button onClick={deleteAd} className={styles.btnDelete}>
                  Supprimer
                </button>
              )}
              <button className={styles.btnPatch}>
                <Link
                  href={props.editLink ? props.editLink : ""}
                  style={{ fontWeight: "semi-bold" }}
                >
                  Modifier
                </Link>
              </button>
              {props.link && (
                <button className={styles.btnDetails}>
                  <Link href={props.link}>Details</Link>
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </Flipped>
  );
}
