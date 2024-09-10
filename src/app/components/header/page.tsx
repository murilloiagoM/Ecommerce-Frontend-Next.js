"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./actions/header.search";
import styles from "./header.module.css";
import Logo from "../images/logo.png";
import HeaderAuth from "./actions/header.auth";
import { HeaderProps } from "../types";
import Cart from "./actions/header.cart";

const Header = ({
  produtos,
  setProdutos,
  setMoreProducts,
  pesquisaValue,
  setPesquisaValue,
  tipoVerMais,
  setTipoVerMais,
  selectedFilter,
  tipo,
  setCategoriasSelecionadas,
}: HeaderProps) => {
  const LeftSide = () => {
    return (
      <div className={styles.left}>
        <Link className={styles.link} href="/">
          <Image
            className={styles.logo}
            alt="logomarket"
            priority
            src={Logo}
            width={130}
            height={130}
          />
        </Link>
      </div>
    );
  };

  return (
    <header>
      <LeftSide />
      <div className={styles.mid}>
        {tipo === "search" && (
          <>
            <Search
              tipo={tipo}
              produtos={produtos}
              setProdutos={setProdutos}
              setMoreProducts={setMoreProducts}
              pesquisaValue={pesquisaValue}
              setPesquisaValue={setPesquisaValue}
              tipoVerMais={tipoVerMais}
              setTipoVerMais={setTipoVerMais}
              selectedFilter={selectedFilter}
              setCategoriasSelecionadas={setCategoriasSelecionadas}
            />
            <Cart tipo={tipo} />
          </>
        )}
        {tipo === "cart" && <Cart tipo={tipo} />}
      </div>
      <HeaderAuth />
    </header>
  );
};

export default Header;
