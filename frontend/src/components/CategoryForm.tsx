import { useMutation } from "@apollo/client";
import { FormEvent, FormEventHandler, useState } from "react";
import { mutationCreateCategory } from "@/graphQl/mutationCreateCategory";

type CategoryFormData = {
  name: string;
};

export function CategoryForm() {
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState({ categoryName: "" });
  const [doCreate, { loading: loadingCreate }] = useMutation(
    mutationCreateCategory
  );
  function handleChange(event: {
    target: { type: any; name: string; value: string };
  }) {
    const { type, name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors(undefined);
    const result = await doCreate({
      variables: {
        name: formData.categoryName,
      },
    });
    console.log(formData);
  }
  return (
    <>
      <div className="title">
        <h2>Créer une catégorie</h2>
      </div>
      <form className="form-fields" onSubmit={handleSubmit}>
        <div className="div-field">
          <label>
            Catégorie: <br />
            <input
              type="text"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Catégorie"
              className="text-field"
              name="categoryName"
            />
          </label>
        </div>
        <button className="btn-submit" type="submit">
          Créer
        </button>
      </form>
    </>
  );
}
