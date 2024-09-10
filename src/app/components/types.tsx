import { Dispatch, SetStateAction } from "react";

import { SingleValue } from "react-select";

export interface HeaderProps {
  produtos?: TypeProdutos[];
  setProdutos?: Dispatch<SetStateAction<TypeProdutos[]>>;
  setMoreProducts?: Dispatch<SetStateAction<boolean>>;
  pesquisaValue?: string;
  setPesquisaValue?: (value: string) => void;
  tipoVerMais?: string;
  setTipoVerMais?: (value: string) => void;
  selectedFilter?: SingleValue<Option>;
  setCategoriasSelecionadas?: (value: string[]) => void;
  tipo: string;
}

export interface FormDataCadastro {
  email: string;
  nome: string;
  senha: string;
  error: string;
}

export interface FormDataLogin {
  email: string;
  senha: string;
}

//PRODUCTS
export interface TypeProdutos {
  id: number;
  nome: string;
  categoria: string;
  subcategoria: string;
  parcelas: number;
  valorparcelas: number;
  valortotal: number;
  descricao: string;
  especificacoes: string;
  imagem: string;
  tamanhos: string;
  quantidade?: number;
}

export interface TypePageProduto {
  nome?: string;
  categoria?: string;
  descricao?: string;
  especificacoes?: string;
  id?: string;
  imagem?: string;
  parcelas?: number;
  subcategoria?: string;
  tamanhos?: string;
  valorparcelas?: number;
  valortotal?: number;
}

export interface Filter {
  header: number;
  position: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface Categorias {
  id: number;
  nome: string;
  subcategorias: string;
}

export interface TypeCategorias {
  id: number;
  nome: string;
  subcategorias: string;
}

export interface EstruturaCategoria {
  nome: string;
  subcategorias: string[];
}

export interface ProductsTilesProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  produtos: TypeProdutos[];
  setProdutos: Dispatch<SetStateAction<TypeProdutos[]>>;
  fixedFilter: Filter;
  setFixedFilter: (value: Filter) => void;
  selectedFilter: SingleValue<Option>;
  setSelectedFilter: (value: SingleValue<Option>) => void;
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: (value: string[]) => void;
  moreProducts: boolean;
  setMoreProducts: Dispatch<SetStateAction<boolean>>;
  offset: string;
  setOffSet: (value: string) => void;
  filtroSalvo: string[];
  setFiltroSalvo: (value: string[]) => void;
  tipoVerMais: string;
  setTipoVerMais: (value: string) => void;
  pesquisaValue: string;
  setPesquisaValue: (value: string) => void;
}

export interface localprop {
  id: number;
  quantidade: number;
}
