import { Layout } from "@/components/Layout";
import { mutationSignin } from "@/graphQl/mutationSignin";
import { queryMe } from "@/graphQl/queryMe";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [doSignin, { error }] = useMutation(mutationSignin, {
    refetchQueries: [queryMe],
  });

  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setFailed(false);
    event.preventDefault();
    const { data } = await doSignin({
      variables: {
        email,
        password,
      },
    });

    if (data.item) {
      router.replace("/");
    } else {
      setFailed(true);
    }
  }
  return (
    <>
      <Layout title="Connexion">
        <div className="title">
          <p>Connexion</p>
        </div>
        {error && <p> Une érreur est survenue</p>}
        {failed && <p>identifiants incorrects</p>}
        <main className="main-content">
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
              Connexion
            </button>
          </form>
        </main>
      </Layout>
    </>
  );
}
