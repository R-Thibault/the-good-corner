import { FormEvent, useEffect, useState } from "react";
import { CategoryType } from "@/components/Category";
import { AdType } from "./AdCard";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { queryAllCategories } from "@/graphQl/queryAllCategories";
import { queryAd } from "@/graphQl/queryAd";
import { mutationCreateAd } from "@/graphQl/mutationCreateAd";
import { queryAllAds } from "@/graphQl/queryAllAds";
import { mutationUpdateAd } from "@/graphQl/mutationUpdateAd";

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
  const [errors, setErrors] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [ad, setAd] = useState<AdType>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const {
    data: categoryData,
    error: categoryError,
    loading: categoryLoading,
  } = useQuery<{ items: CategoryType[] }>(queryAllCategories);

  const categories = categoryData ? categoryData.items : [];

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const router = useRouter();

  const [doCreate, { loading: loadingCreate }] = useMutation(mutationCreateAd, {
    refetchQueries: [queryAllAds],
  });
  const [doUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdateAd, {
    refetchQueries: [queryAd, queryAllAds],
  });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors(undefined);
    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      category: categoryId ? { id: Number(categoryId) } : null,
    };

    if (data.title.trim().length < 3) {
      setErrors("title");
    } else if (data.price < 0) {
      setErrors("price");
    } else {
      if (!props.ad) {
        const result = await doCreate({
          variables: {
            data: data,
          },
        });
        if ("id" in result.data.item) {
          router.replace(`/ads/${result.data.item.id}`);
        }
      } else {
        const result = await doUpdate({
          variables: {
            id: props.ad?.id,
            data: data,
          },
        });
        if (!result.errors?.length) {
          router.replace(`/ads/${props.ad.id}`);
        }
      }
    }
  }
  useEffect(() => {
    setCategoryId(categories[0]?.id || null);
  }, [categories]);

  useEffect(() => {
    if (props.ad) {
      setTitle(props.ad.title);
      setDescription(props.ad.description);
      setPrice(props.ad.price);
      setImgUrl(props.ad.imgUrl);
      setCategoryId(
        props.ad.category ? props.ad.category.id : categories[0]?.id
      );
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [props.ad, categories]);

  return (
    <>
      <div className="title">
        <p>{props.ad ? "Modifier l'offre" : "Crée une nouvelle offre"}</p>
        {errors === "price" && <p>Le prix doit être positif</p>}
        {errors === "title" && (
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
              name="categoryId"
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
