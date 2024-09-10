import React from "react";
import styles from "./page.module.css";
//import Header from "./components/header/page";
import Produtos from "../app/pages/produtos/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Produtos />
    </main>
  );
}
