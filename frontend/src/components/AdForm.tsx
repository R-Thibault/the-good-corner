import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { FormEvent, useEffect, useState } from "react";
import { CategoryType } from "@/components/Category";
import axios from "axios";
import { API_URL } from "@/config";
import { AdType } from "./AdCard";
import { useRouter } from "next/router";

type AdFormData = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: { id: number } | null;
};
export type AdFormProps = {
  ad?: AdType;
};

export function AdForm(props: AdFormProps): React.ReactNode {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [ad, setAd] = useState<AdType>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const router = useRouter();
  const adId = router.query.id as string;

  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(`${API_URL}/categories`);
    setCategories(result.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchAd() {
    const result = await axios.get<AdType>(`${API_URL}/ads/${adId}`);
    console.log(result);
    setAd(result.data);
  }

  useEffect(() => {
    // mounting

    if (adId !== undefined) {
      fetchAd();
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      category: categoryId ? { id: Number(categoryId) } : null,
    };

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      if (!props.ad) {
        const result = await axios.post(`${API_URL}/ads`, data);
        if ("id" in result.data) {
          router.replace(`/ads/${result.data.id}`);
        }
      } else {
        const result = await axios.patch(`${API_URL}/ads/${props.ad.id}`, data);
        if (result.status >= 200 && result.status < 300) {
          router.replace(`/ads/${props.ad.id}`);
        }
      }
    }
  }

  useEffect(() => {
    if (props.ad) {
      setTitle(props.ad.title);
      setDescription(props.ad.description);
      setPrice(props.ad.price);
      setImgUrl(props.ad.imgUrl);
      setCategoryId(props.ad.categoryId);
    }
  }, [props.ad]);

  return (
    <>
      <div className="title">
        <p>{props.ad ? "Modifier l'offre" : "Crée une nouvelle offre"}</p>
        {error === "price" && <p>Le prix doit être positif</p>}
        {error === "title" && (
          <p>Le titre est requis et doit faire plus de 3 caractères</p>
        )}
        {hasBeenSent && <p>Offre ajoutée !</p>}
      </div>
      <form className="form-fields" onSubmit={onSubmit}>
        <div className="div-field">
          <label>
            Titre de l&apos;annonce: <br />
            <input
              type="text"
              placeholder="Titre de l'annonce"
              className="text-field"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="div-field">
          <label>
            Description: <br />
            <input
              type="text"
              placeholder="Description de l'annonce"
              className="text-field"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="div-field">
          <label>
            Prix: <br />
            <input
              type="number"
              placeholder="0,00€"
              className="text-field"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="div-field">
          <label>
            Lien de l&apos;image: <br />
            <input
              type="text"
              placeholder="lien"
              className="text-field"
              name="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </label>
        </div>
        <div className="div-field">
          <label>
            Catégorie: <br />
            <select
              name="category"
              className="text-field"
              value={categoryId + ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn-submit" type="submit">
          {props.ad ? "Modifier" : "Créer"}
        </button>
      </form>
    </>
  );
}
