import styles from "@/components/AdCard.module.css";
import { API_URL } from "@/config";
import axios from "axios";
import { CategoryType } from "./Category";
import { TagType } from "./Tag";

export type CategoryProps = CategoryType;

export type AdType = {
  id: number;
  link: string;
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
  async function deleteAd() {
    await axios.delete<AdType>(`${API_URL}/ads/${props.id}`);
    if (props.onDelete) {
      props.onDelete();
    }
  }
  //console.log(props);
  return (
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
          <div>
            <button className={styles.btnDetails}>
              <a href={props.link} style={{ color: "white" }}>
                Details
              </a>
            </button>
            <button className={styles.btnPatch}>
              <a href={props.editLink} style={{ fontWeight: "semi-bold" }}>
                Modifier
              </a>
            </button>
            {props.onDelete && (
              <button onClick={deleteAd} className={styles.btnDelete}>
                Supprimer
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
