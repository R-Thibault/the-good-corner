import styles from "@/components/AdCard.module.css";
import { API_URL } from "@/config";
import axios from "axios";

export type AdType = {
  id: number;
  link: string;
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  editLink?: string;
  categoryId: number;
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

  return (
    <div className={styles.adCardContainer}>
      <article>
        <figure className={styles.figure}>
          <img src={props.imgUrl} alt={props.title} />
        </figure>
        <div className={styles.adCardBody}>
          <div className={styles.adCardText}>
            <div>
              <h3>{props.title}</h3>
              <p>{props.description}</p>
            </div>
            <div>{props.price} €</div>
          </div>
          <div>
            <a href={props.link} className={styles.btnDetails}>
              Details
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg> */}
            </a>

            <a href={props.editLink} className={styles.btnPatch}>
              Modifier
            </a>

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
