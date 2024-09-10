import React from "react";
import Header from "@/app/components/header/page";
import styles from "./login.module.css";
import Forms from "./actions/form";

export default function Login() {
  const Foto = () => {
    return (
      <div className={styles.foto}>
        <p>Imagem/Anúncio</p>
      </div>
    );
  };

  const Formulario = () => {
    return (
      <div className={styles.formulario}>
        <p className={styles.indice}>Login</p>
        <Forms />
      </div>
    );
  };

  return (
    <>
      <Header tipo="cart" />
      <div className={styles.container}>
        <div className={styles.content}>
          <Foto />
          <Formulario />
        </div>
      </div>
    </>
  );
}
