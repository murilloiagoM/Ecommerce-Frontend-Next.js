"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "../cadastro.module.css";
import { FormDataCadastro } from "@/app/components/types";
import { Cadastro } from "@/app/services/auth.services";

function Forms() {
  const [formData, setFormData] = useState<FormDataCadastro>({
    email: "",
    nome: "",
    senha: "",
    error: "",
  });

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Cadastro(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let isValid = true;

    if (name === "email") {
      isValid = /\S+@\S+\.\S+/.test(value);
    }

    if (isValid) {
      setFormData({
        ...formData,
        [name]: value,
        error: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        error: "*Email inválido!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      {formData.error != "" && (
        <p className={styles.emailerror}>{formData.error}</p>
      )}
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
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        autoComplete="off"
        value={formData.nome}
        onChange={handleChange}
        required
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
