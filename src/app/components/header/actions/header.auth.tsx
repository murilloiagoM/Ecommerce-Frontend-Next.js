"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../header.module.css";
import { Logout } from "@/app/services/auth.services";
import Loadicon from "@/app/components/images/load-icon.png";

function headerAuth() {
  const [username, setUsername] = useState<string>("");

  function setUser() {
    const storageuser = localStorage.getItem("user") || "empty";
    setUsername(storageuser.split(" ")[0]);
  }

  useEffect(() => {
    setUser();
  }, []);

  const Loading = () => {
    return (
      <div className={styles.divauthloading}>
        <div className={styles.authloading}>
          <Image
            alt="loading"
            className={styles.imgauthloading}
            src={Loadicon}
            width={100}
            height={100}
          />
        </div>
      </div>
    );
  };

  const Logado = () => {
    return (
      <div className={styles.nameuser}>
        <p>Olá, {username}</p>
        <button onClick={Logout}>Logout</button>
      </div>
    );
  };

  const NaoLogado = () => {
    return (
      <>
        <p>
          Faça{" "}
          <Link href="/login" className={styles.link}>
            Login
          </Link>{" "}
          ou{" "}
        </p>
        <p>
          <Link href="/cadastro" className={styles.link}>
            Cadastre-se
          </Link>
        </p>
      </>
    );
  };

  return (
    <div className={styles.user}>
      <div className={styles.entrar}>
        {username === "" ? (
          <Loading />
        ) : username != "empty" ? (
          <Logado />
        ) : (
          <NaoLogado />
        )}
      </div>
    </div>
  );
}

export default headerAuth;
