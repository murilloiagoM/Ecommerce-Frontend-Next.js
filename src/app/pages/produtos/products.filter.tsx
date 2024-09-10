/* eslint-disable react/prop-types */
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./products.module.css";
import { TypeUser } from "@/app/services/auth.services";
import {
  GetCategorias,
  GetProdutos,
  GetProdutosCategorias,
} from "@/app/services/products.services";
import Plusicon from "@/app/components/images/plus.png";
import Menu from "@/app/components/images/menu.png";
import FClothes from "@/app/components/images/femaleclothes.png";
import MClothes from "@/app/components/images/maleclothes.png";
import CClothes from "@/app/components/images/cclothes.png";
import Loadicon from "@/app/components/images/load-icon.png";
import { Categorias, ProductsTilesProps } from "@/app/components/types";

function Filters({ isCollapsed, setIsCollapsed, fixedFilter, produtos, setProdutos, setFixedFilter, selectedFilter,
  setSelectedFilter, categoriasSelecionadas, setCategoriasSelecionadas, setOffSet, setMoreProducts, setFiltroSalvo,
  setTipoVerMais, setPesquisaValue }: ProductsTilesProps) {
    
  const [typeUser, setTypeUser] = useState<string>("normal");
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [categoriasAtivas, setCategoriasAtivas] = useState<string[]>([]);

  const fixedFilterRef = useRef(fixedFilter);

  useEffect(() => {
    fixedFilterRef.current = fixedFilter;
  }, [fixedFilter]);

  useEffect(() => {
    TypeUser(setTypeUser, false);
    GetCategorias(setCategorias);

    const headerHeight =
      document.getElementsByTagName("header")[0]?.offsetHeight;
    const filter = document.getElementById("fixed-filter") as HTMLDivElement;
    let filterHeight = 0;
    if (headerHeight && filter) {
      fixedFilter.header = headerHeight;
      const screenHeight = window.screen.availHeight;
      if (
        screenHeight === 1080 ||
        screenHeight === 900 ||
        screenHeight === 768 ||
        screenHeight === 800 ||
        screenHeight === 1024 ||
        screenHeight === 1280 ||
        screenHeight === 800 ||
        screenHeight === 640
      ) {
        filterHeight = window.screen.availHeight - headerHeight + 13;
      } else {
        filterHeight = window.screen.availHeight - headerHeight - 71;
      }
      filter.style.height = `${filterHeight}px`;
    }
    const handleScroll = () => {
      const currentTop = document.documentElement.scrollTop;

      if (headerHeight >= currentTop) {
        if (fixedFilterRef.current.position != "") {
          setFixedFilter({
            ...fixedFilter,
            position: "",
          });
        }
        filter.style.height = `${filterHeight + currentTop}px`;
      } else {
        if (fixedFilterRef.current.position != "fixed") {
          setFixedFilter({
            ...fixedFilter,
            position: "fixed",
          });
        }
        filter.style.height = `${102}%`;
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCollapse = () => {
    if (!isCollapsed) {
      setCategoriasAtivas([]);
    }
    setIsCollapsed(!isCollapsed);
  };

  const ImagemCat = ({ cat }: { cat: Categorias }) => {
    return (
      <Image
        key={`img-${cat.nome}-${cat.id}`}
        src={
          cat.nome == "FEMININO"
            ? FClothes
            : cat.nome == "MASCULINO"
            ? MClothes
            : CClothes
        }
        className={`${styles.btnimg} ${
          isCollapsed === true && styles.btnimgcollapsed
        }`}
        priority
        width={62}
        height={62}
        alt="FemaleClothes"
      />
    );
  };

  const ButtonsAdmin = () => {
    return (
      <>
        {typeUser === "admin" && (
          <Link href="/novoproduto">
            <button
              className={`${styles.btnadmin} ${
                isCollapsed === true && styles.btnadmincollapsed
              }`}
            >
              {isCollapsed ? (
                <Image
                  src={Plusicon}
                  className={styles.imgbtnadmin}
                  priority
                  width={62}
                  height={62}
                  alt="plus"
                />
              ) : (
                "NOVO PRODUTO"
              )}
            </button>
          </Link>
        )}
      </>
    );
  };

  const setContainerSub = (nome: string) => {
    const buttonName = nome;

    if (!categoriasAtivas.includes(buttonName)) {
      setCategoriasAtivas([...categoriasAtivas, buttonName]);
    } else {
      const format = categoriasAtivas.filter((value) => value != buttonName);
      setCategoriasAtivas(format);
    }
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const SubCategorias = ({ categoria }: { categoria: Categorias }) => {
    //COMPONENTE

    const logicaCategoria = (buttonName: string, categoria: Array<string>) => {
      if (categoriasSelecionadas.includes(buttonName)) {
        setCategoriasSelecionadas(
          categoriasSelecionadas.filter((sub) => sub !== buttonName)
        );
      } else {
        if (categoriasSelecionadas.includes(buttonName)) {
          setCategoriasSelecionadas(
            categoriasSelecionadas.filter((sub) => sub !== buttonName)
          );
        } else {
          if (categoria[1] == "Tudo") {
            const array = categoriasSelecionadas.filter(
              (sub) => !sub.includes(categoria[0])
            );
            setCategoriasSelecionadas([...array, buttonName]);
          } else {
            const array = categoriasSelecionadas.filter(
              (sub) => !sub.includes(categoria[0] + "-Tudo")
            );
            setCategoriasSelecionadas([...array, buttonName]);
          }
        }
      }
    };

    const setSubCat = (nome: string) => {
      const buttonName = nome;
      const categoria = buttonName.split("-");

      if (isCollapsed) {
        setIsCollapsed(false);
        !categoriasSelecionadas.includes(buttonName) &&
          setCategoriasSelecionadas([...categoriasSelecionadas, buttonName]);
      } else {
        logicaCategoria(buttonName, categoria);
      }
    };

    return (
      <>
        {categoriasAtivas.includes(categoria.nome) && (
          <div key={`sub-${categoria.nome}`} className={styles.containersub}>
            {categoria.subcategorias.split(", ").map((subcategoria, index) => (
              <button
                key={`btn-${subcategoria}-${index}`}
                className={`${styles.btnsubcategorias} ${
                  isCollapsed ||
                  (subcategoria != "Tudo" &&
                    categoriasSelecionadas.includes(categoria.nome + "-Tudo") &&
                    styles.btnsubcategoriascollapsed)
                }`}
                onClick={() => {
                  setSubCat(`${categoria.nome}-${subcategoria}`);
                }}
              >
                <p key={`p-${categoria.nome}-${subcategoria}`}>
                  {subcategoria}
                </p>
                <div
                  key={`containerchb-${categoria.nome}-${subcategoria}`}
                  className={styles.containerchb}
                >
                  <input
                    key={`inputchb-${categoria.nome}-${subcategoria}`}
                    onChange={changeHandler}
                    checked={
                      categoriasSelecionadas.includes(
                        `${categoria.nome}-${subcategoria}`
                      )
                        ? true
                        : false
                    }
                    type="checkbox"
                    name={`inputchb-${categoria.nome}-${subcategoria}`}
                    id={`inputchb-${categoria.nome}-${subcategoria}`}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const salvarFiltro = () => {
    setOffSet("0");
    if (selectedFilter) {
      if (
        selectedFilter.value === "none" &&
        categoriasSelecionadas.length === 0
      ) {
        GetProdutos(produtos, setProdutos, "0", setMoreProducts);
      } else {
        GetProdutosCategorias(
          produtos,
          categoriasSelecionadas,
          selectedFilter.value,
          setProdutos,
          setMoreProducts,
          "0"
        );
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setFiltroSalvo(categoriasSelecionadas);
    setTipoVerMais("categorias");
    setPesquisaValue("");
  };

  const limparFiltro = () => {
    setCategoriasSelecionadas([]);
    setFiltroSalvo([]);
    setCategoriasAtivas([]);
    setSelectedFilter({ value: "none", label: "Filtrar" });
    GetProdutos(produtos, setProdutos, "0", setMoreProducts);
    setOffSet("0");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTipoVerMais("normal");
    setPesquisaValue("");
  };

  const ButtonsCategorias = () => {
    return (
      <>
        {categorias.map((categoria, index) => (
          <div key={`div-${categoria.nome}-${index}`}>
            <button
              key={`btn-${categoria.nome}-${index}`}
              className={
                categoriasAtivas.includes(categoria.nome) && !isCollapsed
                  ? styles.btncategoriaativa
                  : `${styles.btncategorias} ${
                      isCollapsed === true && styles.btncategoriascollapsed
                    }`
              }
              onClick={() => {
                setContainerSub(categoria.nome);
              }}
            >
              <p key={`p-${categoria.nome}-${index}`}>{categoria.nome}</p>
              <ImagemCat cat={categoria} />
            </button>
            <SubCategorias categoria={categoria} />
          </div>
        ))}
        <button
          onClick={salvarFiltro}
          className={`${styles.btnfiltro} ${
            isCollapsed === true && styles.btnfiltrocollapsed
          }`}
        >
          SALVAR
        </button>
        <button
          onClick={limparFiltro}
          className={`${styles.btnfiltro} ${
            isCollapsed === true && styles.btnfiltrocollapsed
          }`}
        >
          LIMPAR
        </button>
      </>
    );
  };

  return (
    <div
      className={`${styles.colfilters} ${
        isCollapsed === true && styles.colfilterscoll
      }`}
    >
      <div
        id="fixed-filter"
        className={`${
          fixedFilter.position === "fixed" && !isCollapsed
            ? styles.filtersfixed
            : fixedFilter.position === "fixed" && isCollapsed
            ? styles.filtersfixedcoll
            : fixedFilter.position === "" &&
              !isCollapsed === true &&
              styles.filters
        }`}
      >
        <button
          className={`${styles.recolher} ${
            isCollapsed === true && styles.recolhercollapsed
          }`}
          onClick={toggleCollapse}
        >
          <Image
            src={Menu}
            className={styles.imgmenu}
            priority
            width={80}
            height={80}
            alt="menu"
          />
        </button>
        <ButtonsAdmin />
        {categorias.length > 0 && (
          <p
            className={`${styles.cabecalho} ${
              isCollapsed === true && styles.cabecalhocollapsed
            }`}
          >
            CATEGORIAS
          </p>
        )}
        <div className={styles.categorias}>
          {categorias.length > 0 ? (
            <ButtonsCategorias />
          ) : (
            <div className={styles.divloadingfilter}>
              <div className={`${styles.loading} ${styles.loadingfilter}`}>
                <Image alt="loading" src={Loadicon} width={120} height={120} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
