import { mutationCreateTag } from "@/graphQl/mutationCreateTag";
import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";

export function TagForm() {
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState({ tagName: "" });
  const [doCreate, { loading: loadingCreate }] = useMutation(mutationCreateTag);

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
    const result = await doCreate({
      variables: {
        name: formData.tagName,
      },
    });
    console.log(formData);
  }
  return (
    <>
      <div className="title">
        <h2> Créer un Tag</h2>
      </div>
      <form className="form-fields" onSubmit={handleSubmit}>
        <div className="div-field">
          <label>
            Créer un tag: <br />
            <input
              type="text"
              placeholder="Créer un tag"
              name="tagName"
              value={formData.tagName}
              className="text-field"
              onChange={handleChange}
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
