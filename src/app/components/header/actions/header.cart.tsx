"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../header.module.css";
import { useRouter } from "next/navigation";
import { useProds } from "../../contexts/ProdContext";
import CartIcon from "../../images/shopping-cart.png";
import Loadicon from "@/app/components/images/load-icon.png";
import { localprop } from "../../types";

interface props {
  tipo: string;
}

function Cart({ tipo }: props) {
  const { tamanhoCarrinho, setTamanhoCarrinho, setProdutosCarrinho } = useProds();
  const [display, setDisplay] = useState<boolean>(false);

  const router = useRouter();

  function setCarrinho() {
    const products = localStorage.getItem("carrinho");
    if (products) {
      const array: localprop[] = JSON.parse(products);
      let count = 0;
      array.forEach((value) => {
        count = count + value.quantidade;
      });
      setTamanhoCarrinho(count);
      setProdutosCarrinho(array);
    } else {
      localStorage.setItem("carrinho", JSON.stringify([]));
    }
    setDisplay(true);
  }

  useEffect(() => {
    setCarrinho();
  }, []);

  const carrinhoRoute = () => {
    router.push("/carrinho");
  };

  const Search = () => {
    return (
      <div className={styles.headercart}>
        <Image
          onClick={carrinhoRoute}
          alt="cart"
          className={styles.imgcart}
          src={CartIcon}
          priority
          width={100}
          height={100}
        />
        <span onClick={carrinhoRoute}>{tamanhoCarrinho}</span>
      </div>
    );
  };

  const SearchLoading = () => {
    return (
      <div className={styles.cartloading}>
        <Image
          className={styles.imgcartloading}
          alt="loading"
          src={Loadicon}
          width={100}
          height={100}
        />
      </div>
    );
  };

  const OnlyCart = () => {
    return (
      <div className={styles.headercartsolo}>
        <Image
          onClick={carrinhoRoute}
          alt="cart"
          className={styles.imgcart}
          src={CartIcon}
          priority
          width={100}
          height={100}
        />
        <span onClick={carrinhoRoute}>{tamanhoCarrinho}</span>
      </div>
    );
  };

  const OnlyCartLogin = () => {
    return (
      <div className={styles.onlycartloading}>
        <Image
          alt="loading"
          className={styles.imgonlycartloading}
          src={Loadicon}
          width={100}
          height={100}
        />
      </div>
    );
  };

  return (
    <>
      {display ? (
        tipo === "search" ? (
          <Search />
        ) : (
          tipo === "cart" && <OnlyCart />
        )
      ) : tipo === "search" ? (
        <SearchLoading />
      ) : (
        <OnlyCartLogin />
      )}
    </>
  );
}

export default Cart;
