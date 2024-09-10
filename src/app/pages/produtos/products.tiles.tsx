import React, { useEffect } from 'react'
import Select, { SingleValue } from 'react-select';
import styles from './products.module.css'
import { GetProdutos, GetProdutosCategorias, Pesquisar } from '@/app/services/products.services'
import Image from 'next/image'
import Loadicon from "@/app/components/images/load-icon.png"
import Addcart from "@/app/components/images/add-to-cart.png"
import Sort from "@/app/components/images/sort.png"
import { Option, ProductsTilesProps, TypeProdutos } from '@/app/components/types'
import stylesheader from "@/app/components/header/header.module.css"
import { useProds } from '@/app/components/contexts/ProdContext'
import { useRouter } from 'next/navigation'
import searchIcon from "@/app/components/images/searchicon.png"
//import Cart from '../header/actions/header.cart';
import { localprop } from '@/app/components/types';
import { formatoMoeda } from '@/app/components/functions';
import { isOnlySpaces } from "@/app/components/functions";


const options: Option[] = [
  { value: 'none', label: 'Nenhum filtro' },
  { value: 'low-price', label: 'Menor preço' },
  { value: 'high-price', label: 'Maior preço' }
];

function Tiles({ isCollapsed, fixedFilter, produtos, setProdutos, selectedFilter, setSelectedFilter,
  categoriasSelecionadas, setCategoriasSelecionadas, offset, setOffSet, moreProducts, setMoreProducts, filtroSalvo, setFiltroSalvo,
  tipoVerMais, setTipoVerMais, pesquisaValue, setPesquisaValue }: ProductsTilesProps) {

  const { tamanhoCarrinho, setTamanhoCarrinho, setProdutoPage, setProdutosCarrinho } = useProds();
  const router = useRouter()

  useEffect(() => {
    if (tipoVerMais === "normal") {
      GetProdutos(produtos, setProdutos, offset, setMoreProducts)
    } else if (selectedFilter && tipoVerMais === "categorias") {
      GetProdutosCategorias(produtos, filtroSalvo, selectedFilter.value, setProdutos, setMoreProducts, offset)
      setCategoriasSelecionadas(filtroSalvo)
    }
  }, [offset])

  function tamanhoNome(text: string): string {
    const words = text.split(' ');
    const firstFourWords = words.slice(0, 4).join(' ');

    return firstFourWords;
  }

  const LoadingTiles = () => {
    return (
      <div className={styles.divloadingtiles}>
        <div className={`${styles.loading} ${styles.loadingtiles}`}>
          <Image alt="loading" className={styles.loadingicon} src={Loadicon} width={180} height={180} />
        </div>
      </div>
    )
  }

  const handleChange = (option: SingleValue<Option>) => {
    setSelectedFilter(option);
  };

  const salvarFiltro = () => {
    if (tipoVerMais !== "pesquisa") {
      setOffSet("0")
      if (selectedFilter) {
        if (selectedFilter.value === "none" && categoriasSelecionadas.length === 0) {
          GetProdutos(produtos, setProdutos, "0", setMoreProducts)
        } else {
          GetProdutosCategorias(produtos, categoriasSelecionadas, selectedFilter.value, setProdutos, setMoreProducts, "0")
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setFiltroSalvo(categoriasSelecionadas)
      setTipoVerMais("categorias")
      setPesquisaValue("")
    } else if (pesquisaValue !== "" && pesquisaValue !== " " && pesquisaValue !== "  " && selectedFilter) {
      Pesquisar(produtos, setProdutos, setMoreProducts, pesquisaValue, selectedFilter.value)
      setCategoriasSelecionadas(filtroSalvo)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDivtile = (produto: TypeProdutos) => {
    setProdutoPage(produto)
    router.push(`/pageproduto?id=${produto.id}`)
  }

  const handleAddToCart = (id: number) => {//AQUI
    const carrinho = localStorage.getItem("carrinho")
    if (carrinho) {
      const array: localprop[] = JSON.parse(carrinho)
      if (array.length <= 100) {
        let flag = false
        setTamanhoCarrinho(tamanhoCarrinho + 1)
        array.forEach((value, index) => {
          if (value.id === id) {
            array[index].quantidade += 1
            flag = true
          }
        })
        if (!flag) {
          array.push({ id: id, quantidade: 1 })
        }
        setProdutosCarrinho(array)
        localStorage.setItem("carrinho", JSON.stringify(array))
      } else {
        alert("Máximo de 100 Produtos!")
      }
    }
  }

  const ImagemTile = ({ produto, index }: { produto: TypeProdutos, index: number }) => {
    return (
      <div key={`div-img-${produto.nome}-${index}}`} className={styles.imagemtile}>
        <Image
          key={`img-${produto.nome}-${index}`}
          className={`${styles.imgmedia} ${isCollapsed && styles.imgmediacoll}`}
          unoptimized
          src={`http://localhost:3333/uploads/${produto.imagem}`}
          alt='imgproduto'
          priority
          width={!isCollapsed ? 305 : 345}
          height={!isCollapsed ? 360 : 400}
        />
        <div key={`div-cat-${produto.nome}-${index}`} className={`${styles.categoria} ${isCollapsed === true && styles.categoriacoll}`}>
          <p key={`div-cat-p-${produto.nome}-${index}`}>{produto.categoria}</p>
        </div>
      </div>
    )
  }

  const DivComprar = ({ produto, index }: { produto: TypeProdutos, index: number }) => {
    return (
      <div className={`${styles.btncomprar} ${isCollapsed === true && styles.btncomprarcoll}`} key={`divbtncomprar-${produto.nome}-${index}`}>
        <button key={`btn-${produto.nome}-${index}`} onClick={(event) => {
          event.stopPropagation();
          handleAddToCart(produto.id);
        }}>ADICIONAR <Image className={styles.addcart} src={Addcart} height={60} width={60} priority alt='Addcart' /></button>
      </div>
    )
  }
  
  function produtosDefault (){
    if(produtos && setProdutos && setMoreProducts){
      GetProdutos(produtos, setProdutos, "0", setMoreProducts)
    }    
  }

  const handleSubmitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(pesquisaValue && !isOnlySpaces(pesquisaValue) && selectedFilter && produtos && setProdutos && 
      setMoreProducts && pesquisaValue){
      Pesquisar(produtos, setProdutos, setMoreProducts, pesquisaValue, selectedFilter.value)
      {setTipoVerMais && setTipoVerMais("pesquisa")}
      window.scrollTo({ top: 0, behavior: 'smooth' })
      {setCategoriasSelecionadas && setCategoriasSelecionadas([])}
    }else{
      produtosDefault()
    }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if(setPesquisaValue){
      setPesquisaValue(e.currentTarget.value)
    }
  }


  return (
    <div className={styles.coltiles}>
      {produtos.length > 0 &&
        <div className={styles.toptiles}>
          <div className={`${styles.topnormal} ${fixedFilter.position === "fixed" && styles.topfixed}`}>
            <Select className={styles.selectordenar} value={selectedFilter} onChange={handleChange}
              options={options} placeholder="Filtrar" />
            <button className={styles.buttonsort} onClick={salvarFiltro}>
              <Image src={Sort} className={styles.imgsort} height={50} width={50} priority alt='sort' />
            </button>
            <div className={`${styles.searchtile} ${fixedFilter.position === "fixed" && styles.searchtiletrue}`}>
              <form className={`${stylesheader.searchForm} ${stylesheader.searchFormTop}`} onSubmit={handleSubmitText}>
                <input type="text" id="texto-pesquisa" name="texto-pesquisa" autoComplete="off" value={pesquisaValue} onChange={handleChangeText}/>
                <button>Pesquisar <Image className={stylesheader.searchicon} alt="searchicon" priority src={searchIcon} width={30} height={30} /></button>
              </form>
            </div>
          </div>
        </div>}
      {produtos.length > 0 ?
        produtos.map((produto, index) => (
          <div key={`div-${produto.nome}-${index}`} className={`${styles.divtile} ${isCollapsed === true && styles.divtilecoll}`}
            onClick={() => handleDivtile(produto)}>
            <ImagemTile produto={produto} index={index} />
            <div className={`${styles.divnomeproduto} ${isCollapsed && styles.divnomeprodutocoll}`}>
              <p className={`${styles.nomeproduto} ${isCollapsed === true && styles.nomeprodutocoll}`} key={`nomep-${produto.nome}-${index}`}>{tamanhoNome(produto.nome)}</p>
            </div>
            <p className={`${styles.total} ${isCollapsed === true && styles.totalcoll}`} key={`totalp-${produto.nome}-${index}`}>{formatoMoeda(produto.valortotal)}</p>
            <p className={`${styles.parcelas} ${isCollapsed === true && styles.parcelascoll}`} key={`parcelasp-${produto.nome}-${index}`}>{`${produto.parcelas}x ${formatoMoeda(produto.valorparcelas)}`}</p>
            <DivComprar produto={produto} index={index} />
          </div>
        )) :
        <LoadingTiles />
      }
      {moreProducts === true &&
        <div className={styles.vermais}>
          <button onClick={() => {
            setOffSet(String(Number(offset) + 1))
          }}>VER MAIS</button>
        </div>
      }
    </div>
  )
}


export default Tiles

