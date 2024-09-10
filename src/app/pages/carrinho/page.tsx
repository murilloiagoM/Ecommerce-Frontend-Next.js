"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header/page";
import Image from "next/image";
import styles from "./carrinho.module.css";
import { TypeProdutos } from "@/app/components/types";
//import { useProds } from '@/app/components/contexts/ProdContext'
import { GetProdCarrinho } from "@/app/services/products.services";
import Loadicon from "../../components/images/load-icon.png";
import Delete from "../../components/images/delete.png";
import Arrow from "../../components/images/right-arrow.png";
import { useProds } from "@/app/components/contexts/ProdContext";
import { useRouter } from "next/navigation";
import { localprop } from "@/app/components/types";
import { formatoMoeda } from "@/app/components/functions";

function Carrinho() {
  const [listaProdutos, setListaProdutos] = useState<TypeProdutos[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [valorParcelas, setValorParcelas] = useState<number>(0);

  const {
    setProdutosCarrinho,
    tamanhoCarrinho,
    setTamanhoCarrinho,
    setProdutoPage,
  } = useProds();
  const router = useRouter();

  function getCarrinho() {
    const products = localStorage.getItem("carrinho");
    if (products) {
      const array: localprop[] = JSON.parse(products);
      {
        array.length > 0
          ? GetProdCarrinho(
              array,
              setListaProdutos,
              setDisplay,
              setValorTotal,
              setValorParcelas
            )
          : setDisplay(true);
      }
    }
  }

  useEffect(() => {
    getCarrinho();
  }, []);

  const handleAddToCart = (id: number) => {
    const carrinho = localStorage.getItem("carrinho");
    const newProdutos = listaProdutos;
    newProdutos.forEach((produto, index) => {
      if (newProdutos[index].quantidade && id === produto.id) {
        newProdutos[index].quantidade += 1;
      }
    });

    if (carrinho) {
      const array: localprop[] = JSON.parse(carrinho);
      let somatotal: number = 0;
      let somaparcelas: number = 0;
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
        newProdutos.forEach((value) => {
          if (value.quantidade) {
            somatotal += value.valortotal * value.quantidade;
            somaparcelas += value.valorparcelas * value.quantidade;
          }
        });
        setListaProdutos(newProdutos);
        setProdutosCarrinho(array);
        setValorTotal(somatotal);
        setValorParcelas(somaparcelas);
        localStorage.setItem("carrinho", JSON.stringify(array));
      } else {
        alert("Máximo de 100 Produtos!");
      }
    }
  };

  const handleRemoveCart = (id: number) => {
    const carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
      const array: localprop[] = JSON.parse(carrinho);
      let flag = false;
      array.forEach((value, index) => {
        if (value.id === id) {
          if (array[index].quantidade - 1 === 0) {
            removerProduto(array[index].id, array[index].quantidade);
          } else {
            array[index].quantidade -= 1;
            flag = true;
          }
        }
      });
      if (flag) {
        const newProdutos = listaProdutos;
        let somatotal: number = 0;
        let somaparcelas: number = 0;
        newProdutos.forEach((produto, index) => {
          if (newProdutos[index].quantidade && id === produto.id) {
            newProdutos[index].quantidade -= 1;
          }
        });

        newProdutos.forEach((value) => {
          if (value.quantidade) {
            somatotal += value.valortotal * value.quantidade;
            somaparcelas += value.valorparcelas * value.quantidade;
          }
        });
        setValorTotal(somatotal);
        setValorParcelas(somaparcelas);
        setListaProdutos(newProdutos);
        setTamanhoCarrinho(tamanhoCarrinho - 1);
        setProdutosCarrinho(array);
        localStorage.setItem("carrinho", JSON.stringify(array));
      }
    }
  };

  const handleImagem = (produto: TypeProdutos) => {
    setProdutoPage(produto);
    router.push(`/pageproduto?id=${produto.id}`);
  };

  const removerProduto = (id: number, quantidade: number) => {
    const carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
      const array: localprop[] = JSON.parse(carrinho);
      const filtro = array.filter((prop) => prop.id !== id);
      const lista = listaProdutos.filter((prod) => prod.id !== id);
      const subtracao = tamanhoCarrinho - quantidade;
      let somatotal = 0;
      let somaparcelas = 0;

      setProdutosCarrinho(filtro);
      localStorage.setItem("carrinho", JSON.stringify(filtro));
      lista.forEach((value) => {
        if (value.quantidade) {
          somatotal += value.valortotal * value.quantidade;
          somaparcelas += value.valorparcelas * value.quantidade;
        }
      });
      setValorTotal(somatotal);
      setValorParcelas(somaparcelas);
      setListaProdutos(lista);
      setTamanhoCarrinho(subtracao);
    }
  };

  const Dados = ({ value, index }: { value: TypeProdutos; index: number }) => {
    return (
      <div className={styles.dados}>
        <p className={styles.nome}>{value.nome}</p>
        <p className={styles.categorias}>
          {value.categoria}-{value.subcategoria}
        </p>
        <p className={styles.descricao}>
          {value.especificacoes.replaceAll("\\n", "").replaceAll("\\", "")}
        </p>
        <div className={styles.bottomtile}>
          <Quantidade value={value} index={index} />
          <div className={styles.valores}>
            <p className={styles.avista}>
              {`${formatoMoeda(value.valortotal)} ou`}
            </p>
            <p className={styles.parcela}>
              {`12x ${formatoMoeda(value.valorparcelas)}`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ContainerImagem = ({
    value,
    index,
  }: {
    value: TypeProdutos;
    index: number;
  }) => {
    return (
      <div className={styles.imagem}>
        <Image
          onClick={() => {
            handleImagem(value);
          }}
          className={styles.imgfile}
          key={`img-${value.nome}-${index}`}
          src={`http://localhost:3333/uploads/${value.imagem}`}
          alt="imgproduto"
          unoptimized
          priority
          width={210}
          height={238}
        />
      </div>
    );
  };

  const Quantidade = ({
    value,
    index,
  }: {
    value: TypeProdutos;
    index: number;
  }) => {
    return (
      <div className={styles.quantidade}>
        <button
          className={styles.btnremover}
          onClick={() => {
            {
              value.quantidade && removerProduto(value.id, value.quantidade);
            }
          }}
        >
          <Image
            key={`delimg-${value.nome}-${index}`}
            src={Delete}
            alt="delete"
            priority className={styles.imgremover}
            width={70}
            height={65}
          />
        </button>
        <p className={styles.textoquantidade}>{`QUANTIDADE`}</p>
        <div className={styles.quantidadebtns}>
          <button
            onClick={() => {
              handleRemoveCart(value.id);
            }}
          >
            <Image
              className={styles.leftarrow}
              key={`leftarr-${value.nome}-${index}`}
              src={Arrow}
              alt="arrow"
              priority
              width={48}
              height={48}
            />
          </button>
          {value.quantidade}
          <button
            onClick={() => {
              handleAddToCart(value.id);
            }}
          >
            <Image
              key={`rightarr-${value.nome}-${index}`}
              className={styles.rightarrow}
              src={Arrow}
              alt="arrow"
              priority
              width={48}
              height={48}
            />
          </button>
        </div>
      </div>
    );
  };

  const Informacoes = () => {
    return (
      <div className={styles.informacoes}>
        <p className={styles.totalindice}>TOTAL</p>
        <p className={styles.total}>{`${formatoMoeda(valorTotal)}`}</p>
        <p className={styles.totalavista}>à vista ou</p>
        <p className={styles.totalparcela}>{`12x ${formatoMoeda(
          valorParcelas
        )}`}</p>
        <button className={styles.btncomprar}>COMPRAR</button>
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className={`${styles.loading} ${styles.loadingtiles}`}>
        <Image alt="loading" src={Loadicon} width={180} height={180} />
      </div>
    );
  };

  return (
    <>
      <Header tipo="cart" />
      {display === true ? (
        <div className={styles.container}>
          <p className={styles.prodtitle}>PRODUTOS</p>
          <div
            className={`${styles.produtos} ${
              listaProdutos.length === 0 && styles.semprodutos
            }`}
          >
            {listaProdutos.length > 0 ? (
              listaProdutos.map((value, index) => (
                <div key={`tile-${index}`} className={styles.produtotile}>
                  <Dados value={value} index={index} />
                  <ContainerImagem value={value} index={index} />
                </div>
              ))
            ) : (
              <div className={styles.nenhum}>
                <p>NENHUM PRODUTO!</p>
              </div>
            )}
          </div>
          {listaProdutos.length > 0 && <Informacoes />}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Carrinho;
