"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/header/page";
import Image from "next/image";
import Loadicon from "@/app/components/images/load-icon.png";
import styles from "./pageprodutos.module.css";
import { GetProdutoId } from "@/app/services/products.services";
//import { TypePageProduto } from "@/app/components/types";
import CartIcon from "@/app/components/images/add-to-cart.png";
import { useProds } from "@/app/components/contexts/ProdContext";
import { localprop } from "@/app/components/types";
import { formatoMoeda } from "@/app/components/functions";

function PageProduto() {
  const {
    produtoPage,
    setProdutoPage,
    tamanhoCarrinho,
    setTamanhoCarrinho,
    setProdutosCarrinho,
  } = useProds();
  const [arrayTamanhos, setArrayTamanhos] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (produtoPage.nome !== "") {
      setArrayTamanhos(produtoPage.tamanhos.split(", "));
    } else if (id) {
      GetProdutoId(parseInt(id), setProdutoPage, setArrayTamanhos);
    }
  }, []);

  const LoadingTiles = () => {
    return (
      <div className={`${styles.loading} ${styles.loadingtiles}`}>
        <Image alt="loading" src={Loadicon} width={180} height={180} />
      </div>
    );
  };

  const handleAddToCart = (id: number) => {
    const carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
      const array: localprop[] = JSON.parse(carrinho);
      if (array.length <= 100) {
        let flag = false;
        setTamanhoCarrinho(tamanhoCarrinho + 1);
        array.forEach((value, index) => {
          if (value.id === id) {
            array[index].quantidade += 1;
            flag = true;
          }
        });
        if (!flag) {
          array.push({ id: id, quantidade: 1 });
        }
        setProdutosCarrinho(array);
        localStorage.setItem("carrinho", JSON.stringify(array));
      } else {
        alert("Máximo de 100 Produtos!");
      }
    }
  };

  const Informacoes = () => {
    return (
      <div className={styles.informacoes}>
        <p className={styles.nomeproduto}>{produtoPage.nome}</p>
        <div className={styles.divcategorias}>
          <p>{produtoPage.categoria}</p>
          <p>{produtoPage.subcategoria}</p>
        </div>
        <div
          className={`${styles.tamanhos} ${
            arrayTamanhos.length <= 8 && styles.tamanhosmenor
          }`}
        >
          <p className={styles.tamanhosindice}>TAMANHOS DISPONÍVEIS</p>
          <div className={styles.btntamanhos}>
            {arrayTamanhos.map((value, index) => (
              <p className={styles.ptamanhos} key={`p-${value}-${index}`}>
                {value}
              </p>
            ))}
          </div>
        </div>
        {produtoPage.valortotal && produtoPage.valorparcelas && (
          <>
            <p className={styles.valortotal}>
              {formatoMoeda(produtoPage.valortotal)}
            </p>
            <p className={styles.avista}>à vista ou</p>
            <p className={styles.valorparcelas}>
              {produtoPage.parcelas} x {formatoMoeda(produtoPage.valorparcelas)}
            </p>
            <div className={styles.divbtns}>
              <button className={styles.btncomprar}>COMPRAR</button>
              <button
                className={styles.btncart}
                onClick={() => {
                  handleAddToCart(produtoPage.id);
                }}
              >
                <Image
                  src={CartIcon}
                  className={styles.iconcart}
                  priority
                  alt="addcart"
                  width={90}
                  height={90}
                />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const Textos = () => {
    return (
      <section className={styles.sectiontextos}>
        <div className={styles.textosproduto}>
          <p className={styles.textosindice}>DESCRIÇÃO</p>
          <p className={styles.conteudotexto}>
            {produtoPage.descricao?.split("\\n").map((value, index) => (
              <React.Fragment key={index}>
                {value.replace("\\", "")}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className={styles.textosproduto}>
          <p className={styles.textosindice}>ESPECIFICAÇÕES</p>
          <p className={styles.conteudotexto}>
            {produtoPage.especificacoes?.split("\\n").map((value, index) => (
              <React.Fragment key={index}>
                {value.replace("\\", "")}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>
    );
  };

  return (
    <>
      <Header tipo="cart" />
      {produtoPage.nome !== "" ? (
        <div className={styles.containerproduto}>
          <div className={styles.imageproduto}>
            <Image
              className={styles.img}
              unoptimized
              src={`http://localhost:3333/uploads/${produtoPage.imagem}`}
              alt="imgproduto"
              priority
              width={750}
              height={750}
            />
          </div>
          <Informacoes />
          <Textos />
        </div>
      ) : (
        <LoadingTiles />
      )}
    </>
  );
}

export default PageProduto;
