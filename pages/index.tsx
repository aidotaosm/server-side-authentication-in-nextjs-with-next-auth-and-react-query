import Link from "next/link";
import { useState } from "react";
import Layout from "../src/components/Layout";

const IndexPage = () => {
  let [formFields, setFormFields] = useState({ email: "", password: "" });
  const login = () => {
    console.log(formFields);
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          value={formFields.email}
          onChange={(event) => {
            setFormFields((e) => {
              e.email = event.target.value;
              return { ...e };
            });
          }}
        />
        <input
          type="password"
          name="password"
          value={formFields.password}
          onChange={(event) => {
            setFormFields((e) => {
              e.password = event.target.value;
              return { ...e };
            });
          }}
        />
        <button type="button" onClick={login}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IndexPage;
