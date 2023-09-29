import { AdCard, AdType } from "@/components/AdCard";
import { CategoryType } from "@/components/Category";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Patch() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [ad, setAd] = useState<AdType>();

  const router = useRouter();
  const adId = router.query.id as string;

  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(`${API_URL}/categories`);
    setCategories(result.data);
  }

  async function fetchAd() {
    const result = await axios.get<AdType>(`${API_URL}/ads/${adId}`);
    console.log(result);
    setAd(result.data);
  }

  useEffect(() => {
    // mounting
    fetchCategories();
    if (adId !== undefined) {
      fetchAd();
    }
  }, [adId]);

  return (
    <Layout title="AdEdit">
      <main className="main-content">
        <p>EDITION {router.query.id}</p>
        {ad ? (
          <>
            <main className="main-content">
              <div className="title">
                <p>Poster une nouvelle offre</p>
                {/*
                {hasBeenSent && <p>Offre ajoutée !</p>} */}
              </div>
              <form className="form-fields">
                <div className="div-field">
                  <label>
                    Titre de l&apos;annonce: <br />
                    <input
                      type="text"
                      placeholder="Titre de l'annonce"
                      className="text-field"
                      name="title"
                      value={ad.title}
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
                      value={ad.description}
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
                      value={ad.price}
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
                      value={ad.imgUrl}
                    />
                  </label>
                  {/* <div>
                    <img src={ad.imgUrl} alt="imgUrl" />
                  </div> */}
                </div>
                <div className="div-field">
                  <label>
                    Catégorie: <br />
                    <select name="category" className="text-field">
                      <option value=""></option>
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
          </>
        ) : adId ? (
          "Chargement/erreur"
        ) : (
          "Il manque l'id dans l'URL"
        )}
      </main>
    </Layout>
  );
}
