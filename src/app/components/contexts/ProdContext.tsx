"use client";
import React, { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from "react";
import { TypeProdutos } from "../types";
import { localprop } from "../types";

interface ProdContextType {
  tamanhoCarrinho: number;
  setTamanhoCarrinho: React.Dispatch<React.SetStateAction<number>>;
  produtoPage: TypeProdutos;
  setProdutoPage: Dispatch<SetStateAction<TypeProdutos>>;
  produtosCarrinho: localprop[];
  setProdutosCarrinho: Dispatch<SetStateAction<localprop[]>>;
}

const ProdContext = createContext<ProdContextType | undefined>(undefined);

interface ProdProviderProps {
  children: ReactNode;
}

export const ProdProvider: React.FC<ProdProviderProps> = ({ children }) => {
  const [tamanhoCarrinho, setTamanhoCarrinho] = useState<number>(0);
  const [produtoPage, setProdutoPage] = useState<TypeProdutos>({
    id: 0,
    parcelas: 0,
    nome: "",
    categoria: "",
    descricao: "",
    especificacoes: "",
    imagem: "",
    subcategoria: "",
    tamanhos: "",
    valorparcelas: 0,
    valortotal: 0,
  });
  const [produtosCarrinho, setProdutosCarrinho] = useState<localprop[]>([]);

  return (
    <ProdContext.Provider
      value={{
        tamanhoCarrinho,
        setTamanhoCarrinho,
        produtoPage,
        setProdutoPage,
        produtosCarrinho,
        setProdutosCarrinho,
      }}
    >
      {children}
    </ProdContext.Provider>
  );
};

export const useProds = (): ProdContextType => {
  const context = useContext(ProdContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
