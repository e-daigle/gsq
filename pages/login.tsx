import React, { useState } from "react";
import { Database } from "../lib/Database/supabase";
import { signIn } from "../lib/Database/signIn";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface Validator {
  type: "required";
  message: string;
}

interface FormField {
  [key: string]: {
    type: "input" | "dropdown" | "checkbox";
    htmlType?: string;
    label: string;
    required: boolean;
    value: string;
    error?: string;
    validators?: Validator;
  };
}

const Login = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const [formData, setFormData] = useState<FormField>({
    email: {
      type: "input",
      htmlType: "email",
      label: "Courriel",
      required: true,
      value: "",
      validators: {
        type: "required",
        message: "Ce champ est requis",
      },
    },
    password: {
      type: "input",
      htmlType: "password",
      label: "Mot de passe",
      required: true,
      value: "",
      validators: {
        type: "required",
        message: "Ce champ est requis",
      },
    },
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const temp = { ...formData[name] };
    temp.error = "";
    if (temp.validators) {
      if (temp.validators.type == "required") {
        if (value.trim() == "") temp.error = temp.validators.message;
      }
    }
    temp.value = value;
    setFormData({ ...formData, [name]: temp });
    console.log(formData);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    if (event) event.preventDefault();
    const email = formData.email.value;
    const password = formData.password.value;
    if (!email) return;
    if (!password) return;
    const result = await signIn(email, password, supabaseClient);
    if (!result.data || result.error) console.log("ERROR");
    setFormError(result.error?.message);
    console.log(result);
    if (result.data.session) router.push("/admin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <img src="/GSQ.png" alt="Logo" width={150} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {formError && <p className={styles.errorText}>{formError}</p>}
          {Object.entries(formData).map(([key, value]) => (
            <div className={styles.field} key={key}>
              <input
                className={value.error ? styles.error : ""}
                name={key}
                required={value.required}
                id={key}
                value={value.value}
                type={value.htmlType}
                onChange={handleInputChange}
              />
              <label>{value.label}</label>
              {value.error && <p className={styles.errorText}>{value.error}</p>}
            </div>
          ))}
          <button className={styles.button}>CONNEXION</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
