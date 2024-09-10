"use client";
import React, { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import styles from "../header.module.css";
import searchIcon from "@/app/components/images/searchicon.png";
import { GetProdutos, Pesquisar } from "@/app/services/products.services";
import { HeaderProps } from "../../types";
import { isOnlySpaces } from "../../functions";

export const Search = ({ tipo, produtos, setProdutos, setMoreProducts, pesquisaValue, setPesquisaValue, setTipoVerMais, selectedFilter,
  setCategoriasSelecionadas }: HeaderProps) => {
  function produtosDefault() {
    if (produtos && setProdutos && setMoreProducts) {
      GetProdutos(produtos, setProdutos, "0", setMoreProducts);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      pesquisaValue &&
      !isOnlySpaces(pesquisaValue) &&
      selectedFilter &&
      produtos &&
      setProdutos &&
      setMoreProducts &&
      pesquisaValue
    ) {
      Pesquisar(
        produtos,
        setProdutos,
        setMoreProducts,
        pesquisaValue,
        selectedFilter.value
      );
      {
        setTipoVerMais && setTipoVerMais("pesquisa");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      {
        setCategoriasSelecionadas && setCategoriasSelecionadas([]);
      }
    } else {
      produtosDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (setPesquisaValue) {
      setPesquisaValue(e.currentTarget.value);
    }
  };

  return (
    <form
      className={`${styles.searchForm} ${
        tipo === "toptile" && styles.searchFormTop
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="texto-pesquisa"
        name="texto-pesquisa"
        autoComplete="off"
        value={pesquisaValue}
        onChange={handleChange}
      />
      <button>
        Pesquisar{" "}
        <Image
          className={styles.searchicon}
          alt="searchicon"
          priority
          src={searchIcon}
          width={30}
          height={30}
        />
      </button>
    </form>
  );
};
