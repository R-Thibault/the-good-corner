import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { FormEvent, useEffect, useState } from "react";
import { CategoryType } from "@/components/Category";
import axios from "axios";
import { API_URL } from "@/config";

type AdFormData = {
  title: string;
  description: string;
  price: number;
  imgUrl: string;
  category: { id: number };
};

export default function NewAd() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);

  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(`${API_URL}/categories`);
    setCategories(result.data);
  }

  useEffect(() => {
    // mounting
    fetchCategories();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as AdFormData;

    if ("categoryId" in data) {
      data.category = { id: Number(data.categoryId) };
      delete data.categoryId;
    }

    data.price = Number(data.price);

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const result = await axios.post(`${API_URL}/ads`, data);
      if ("id" in result.data) {
        form.reset();
        setHasBeenSent(true);
        // redirect to /ads/result.data.id
      }
    }
  }
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <div className="title">
            <p>Poster une nouvelle offre</p>
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
                />
              </label>
            </div>
            <div className="div-field">
              <label>
                Catégorie: <br />
                <select name="category" className="text-field">
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </main>
      </Layout>
    </>
  );
}
