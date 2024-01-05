import { Layout } from "@/components/Layout";
import { mutationSignup } from "@/graphQl/mutationSignup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doSignup, { error }] = useMutation(mutationSignup);

  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data } = await doSignup({
      variables: {
        data: {
          email,
          password,
        },
      },
    });

    if (data.item) {
      router.replace("/signin");
    }
  }
  return (
    <>
      <Layout title="Inscription">
        <main className="main-content">
          <div className="title">
            <p>Inscription</p>
          </div>
          {error && <p> Une érreur est survenue</p>}
          <form onSubmit={onSubmit} className="form-fields">
            <div className="div-field">
              <label htmlFor="">
                Email: <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Votre email ici"
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-field"
                />
              </label>
            </div>
            <div className="div-field">
              <label htmlFor="">
                Password: <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Votre mot de passe ici"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-field"
                />
              </label>
            </div>
            <button type="submit" className="button-primary">
              Inscription
            </button>
          </form>
        </main>
      </Layout>
    </>
  );
}
