"use client";
import React, { useState } from "react";
import styles from "./products.module.css";
import Filters from "./products.filter";
import Tiles from "./products.tiles";
import Header from "../../components/header/page";
import { SingleValue } from "react-select";
import { TypeProdutos, Filter, Option } from "@/app/components/types";

function Products() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<TypeProdutos[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [filtroSalvo, setFiltroSalvo] = useState<string[]>([]);
  const [fixedFilter, setFixedFilter] = useState<Filter>({
    header: 0,
    position: "",
  });
  const [selectedFilter, setSelectedFilter] = useState<SingleValue<Option>>({
    value: "none",
    label: "Filtrar",
  });
  const [moreProducts, setMoreProducts] = useState<boolean>(false);
  const [offset, setOffSet] = useState<string>("0");
  const [tipoVerMais, setTipoVerMais] = useState<string>("normal");
  const [pesquisaValue, setPesquisaValue] = useState<string>("");

  return (
    <>
      <Header
        produtos={produtos}
        setProdutos={setProdutos}
        setMoreProducts={setMoreProducts}
        pesquisaValue={pesquisaValue}
        setPesquisaValue={setPesquisaValue}
        tipoVerMais={tipoVerMais}
        setTipoVerMais={setTipoVerMais}
        selectedFilter={selectedFilter}
        tipo="search"
        setCategoriasSelecionadas={setCategoriasSelecionadas}
      />
      <div className={styles.container}>
        <Filters
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          fixedFilter={fixedFilter}
          setFixedFilter={setFixedFilter}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          produtos={produtos}
          setProdutos={setProdutos}
          categoriasSelecionadas={categoriasSelecionadas}
          setCategoriasSelecionadas={setCategoriasSelecionadas}
          setMoreProducts={setMoreProducts}
          offset={offset}
          setOffSet={setOffSet}
          moreProducts={moreProducts}
          filtroSalvo={filtroSalvo}
          setFiltroSalvo={setFiltroSalvo}
          tipoVerMais={tipoVerMais}
          setTipoVerMais={setTipoVerMais}
          pesquisaValue={pesquisaValue}
          setPesquisaValue={setPesquisaValue}
        />

        <Tiles
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          fixedFilter={fixedFilter}
          setFixedFilter={setFixedFilter}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          produtos={produtos}
          setProdutos={setProdutos}
          categoriasSelecionadas={categoriasSelecionadas}
          setCategoriasSelecionadas={setCategoriasSelecionadas}
          setMoreProducts={setMoreProducts}
          offset={offset}
          setOffSet={setOffSet}
          moreProducts={moreProducts}
          filtroSalvo={filtroSalvo}
          setFiltroSalvo={setFiltroSalvo}
          tipoVerMais={tipoVerMais}
          setTipoVerMais={setTipoVerMais}
          pesquisaValue={pesquisaValue}
          setPesquisaValue={setPesquisaValue}
        />
      </div>
    </>
  );
}

export default Products;
