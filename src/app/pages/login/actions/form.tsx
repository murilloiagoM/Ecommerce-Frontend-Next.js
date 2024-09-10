"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
//import styles from "./login.module.css";
import { FormDataLogin } from "@/app/components/types";
import { Login } from "@/app/services/auth.services";

function Forms() {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    senha: "",
  });
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        autoComplete="off"
        value={formData.email}
        onChange={handleChange}
        required
        ref={emailInputRef}
      />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        name="senha"
        autoComplete="off"
        value={formData.senha}
        onChange={handleChange}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Forms;
