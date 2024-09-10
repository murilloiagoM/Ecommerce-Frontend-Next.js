"use client";
import Header from "@/app/components/header/page";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import Image from "next/image";
import { TypeUser } from "@/app/services/auth.services";
import styles from "./novoproduto.module.css";
import Delete from "@/app/components/images/delete.png";

interface Categorias {
  id: number;
  nome: string;
  subcategorias: string;
}

interface OptionType {
  value: string;
  label: string;
}

function page() {
  const [typeUser, setTypeuser] = useState<string>("normal");
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [subcategorias, setSubCategorias] = useState<string[]>([]);
  const [tamanhos, setTamanhos] = useState<string[]>([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>(
    []
  );
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [formData, setFormData] = useState<FormData>();
  const [selectedCategoria, setSelectedCategoria] =
    useState<SingleValue<OptionType>>(null);
  const [selectedSubcategoria, setSelectedSubcategoria] =
    useState<SingleValue<OptionType>>(null);
  const [selectedParcelas, setSelectedParcelas] = useState<
    SingleValue<OptionType>
  >({
    value: "1",
    label: "1",
  });
  const [displayTamanhos, setDisplayTamanhos] = useState<boolean>(false);

  //OPTIONS REACT-SELECT
  const categoriaOptions = categorias.map((valor) => ({
    value: valor.nome,
    label: valor.nome,
  }));

  const subcategoriaOptions = subcategorias
    .filter((value) => value !== "Tudo")
    .map((value) => ({
      value: value,
      label: value,
    }));

  const tamanhoOptions: OptionType[] = tamanhos.map((value) => ({
    value: value,
    label: value,
  }));

  const parcelaOptions: OptionType[] = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  function getCategorias() {
    const apiUrl = "http://localhost:3333/categorias";
    let status = 0;
    fetch(apiUrl)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status === 200) {
          setCategorias(data["categorias"]);
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro na requisição:", error);
      });
  }

  useEffect(() => {
    TypeUser(setTypeuser, true);
    getCategorias();
  }, []);

  const handleValorTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, "");

    if (value === "") {
      e.currentTarget.value = "";
      return;
    }

    const numberValue = parseFloat(value) / 100;

    if (isNaN(numberValue)) {
      e.currentTarget.value = "";
      return;
    }

    e.currentTarget.value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  const selectSubcategorias = (selectedOption: OptionType | null) => {
    setTamanhosSelecionados([]);
    if (selectedOption && selectedOption.value !== "CATEGORIA") {
      const value = selectedOption.value;
      const array = categorias.filter((cat) => cat.nome === value);
      const options = array[0].subcategorias;
      setSubCategorias(options.split(", "));
      setSelectedCategoria(selectedOption);
    } else {
      setSubCategorias([]);
      setTamanhos([]);
      setSelectedCategoria(null);
    }
  };

  const tipoTamanho = (selectedOption: OptionType | null) => {
    const valor = selectedOption ? selectedOption.value : "";

    setTamanhosSelecionados([]);

    if (valor === "SUBCATEGORIA") {
      setTamanhos([]);
      setSelectedSubcategoria(null);
      setDisplayTamanhos(false);
    } else {
      if (valor === "Calçado") {
        setTamanhos([
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
        ]);
      } else {
        setTamanhos(["PP", "P", "M", "G", "GG", "EXG"]);
      }
      setSelectedSubcategoria(selectedOption);
      setDisplayTamanhos(true);
    }
  };

  const handleParcelas = (selectedOption: OptionType | null) => {
    setSelectedParcelas(selectedOption);
  };

  const handleTamanhos = (selectedOption: OptionType | null) => {
    if (!selectedOption) return;
    const valor = selectedOption.value;
    if (!tamanhosSelecionados.includes(valor) && valor !== "selecionar") {
      const array = tamanhos.filter((value) => value !== valor);
      setTamanhos(array);
      const novostamanhos = [...tamanhosSelecionados, valor].sort((a, b) =>
        a.localeCompare(b)
      );
      setTamanhosSelecionados(novostamanhos);
    }
  };

  const removeTamanho = (e: React.MouseEvent<HTMLButtonElement>) => {
    const array = tamanhosSelecionados.filter(
      (tamanho) => tamanho !== e.currentTarget.value
    );
    setTamanhosSelecionados(array);

    const novostamanhos = [...tamanhos, e.currentTarget.value].sort((a, b) =>
      a.localeCompare(b)
    );
    setTamanhos(novostamanhos);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      const data = new FormData();

      if (formData) {
        formData.forEach((value, key) => {
          if (key != "image") {
            data.append(key, value);
          }
        });
      }
      data.append("image", file);
      setFormData(data);
    }
  };

  const handleSubmit = () => {
    const nome = document.getElementById("nomeproduto") as HTMLInputElement;
    const parcelas = document.getElementById(
      "valorparcelas"
    ) as HTMLInputElement;
    const total = document.getElementById("valortotal") as HTMLInputElement;
    const descricao = document.getElementById(
      "descricao"
    ) as HTMLTextAreaElement;
    const especificacoes = document.getElementById(
      "especificacoes"
    ) as HTMLTextAreaElement;

    if (
      formData &&
      formData.get("image") &&
      selectedCategoria &&
      selectedSubcategoria &&
      selectedParcelas &&
      nome.value.length > 0 &&
      selectedCategoria.value != "CATEGORIA" &&
      selectedSubcategoria.value != "SUBCATEGORIA" &&
      tamanhosSelecionados.length > 0 &&
      parcelas.value.length > 0 &&
      total.value.length > 0 &&
      descricao.value.length > 0 &&
      especificacoes.value.length > 0
    ) {
      const ordemTamanhos = ["PP", "P", "M", "G", "GG", "EXG"];
      const ordenarTamanhos = (tamanhos: string[]): string[] => {
        return tamanhos.sort(
          (a, b) => ordemTamanhos.indexOf(a) - ordemTamanhos.indexOf(b)
        );
      };
      const tamanhosordenados = ordenarTamanhos(tamanhosSelecionados);
      const tamanhos = tamanhosordenados.join(", ");
      const data = new FormData();
      const newparcelas = parcelas.value
        .replace("R$", "")
        .replace(/\s+/g, "")
        .replaceAll(".", "")
        .replace(",", ".");
      const newtotal = total.value
        .replace("R$", "")
        .replace(/\s+/g, "")
        .replaceAll(".", "")
        .replace(",", ".");
      const descricaoFormatted = descricao.value.replace(/\n/g, "\\n");
      const especificacoesFormatted = especificacoes.value.replace(
        /\n/g,
        "\\n"
      );

      formData.forEach((value, key) => {
        data.append(key, value);
      });

      data.append("nome", nome.value);
      data.append("categoria", selectedCategoria.value);
      data.append("subcategoria", selectedSubcategoria.value);
      data.append("tamanhos", tamanhos);
      data.append("parcelas", selectedParcelas.value);
      data.append("valorparcelas", newparcelas);
      data.append("valortotal", newtotal);
      data.append("descricao", descricaoFormatted);
      data.append("especificacoes", especificacoesFormatted);

      const apiUrl = "http://localhost:3333/novoproduto";
      fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        body: data,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Produto adicionado com sucesso!");
            window.location.reload();
          } else {
            alert("Erro ao inserir!");
          }
        })
        .catch((error) => {
          console.error("Ocorreu um erro na requisição:", error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const ContainerImagem = () => {
    return (
      <div className={styles.containerimagem}>
        <div className={styles.imagem}>
          {selectedImage != "" ? (
            <Image
              src={selectedImage}
              className={styles.imgfile}
              alt="Selected Image"
              width={550}
              height={550}
              priority
            />
          ) : (
            <p>NENHUMA IMAGEM SELECIONADA</p>
          )}
        </div>
        <div className={styles.botoesimagem}>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className={styles.hiddeninput}
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput" className={styles.custombutton}>
            {" "}
            Selecionar Imagem{" "}
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      {typeUser == "admin" && (
        <>
          <Header tipo="nosearch" />
          <div className={styles.novoproduto}>
            <div className={styles.container}>
              <p className={styles.title}>NOVO PRODUTO</p>
              <div className={styles.produto}>
                <ContainerImagem />
                <div className={styles.containerdados}>
                  <input
                    name="nomeproduto"
                    id="nomeproduto"
                    type="text"
                    autoComplete="off"
                    className={styles.dadostitle}
                    placeholder="NOME DO PRODUTO"
                  />
                  <div className={styles.categorias}>
                    <Select
                      className={styles.selectcategorias}
                      options={categoriaOptions}
                      defaultValue={{ value: "CATEGORIA", label: "CATEGORIA" }}
                      onChange={selectSubcategorias}
                    />
                    <Select
                      className={styles.selectcategorias}
                      options={subcategoriaOptions}
                      defaultValue={{
                        value: "SUBCATEGORIA",
                        label: "SUBCATEGORIA",
                      }}
                      onChange={tipoTamanho}
                    />
                  </div>
                  {displayTamanhos === true && (
                    <div className={styles.tamanhos}>
                      <p className={styles.tamanhostitle}>TAMANHOS</p>
                      <div className={styles.selecttamanhos}>
                        <div className={styles.tamanhosselecionados}>
                          {tamanhosSelecionados.length == 0 ? (
                            <p>NENHUM TAMANHO SELECIONADO</p>
                          ) : (
                            tamanhosSelecionados.map((value, index) => {
                              return (
                                <div
                                  className={styles.itemtamanhos}
                                  key={`div-${value}-${index}`}
                                >
                                  <p key={`p-${value}-${index}`}>{value}</p>
                                  <button
                                    value={value}
                                    key={`btn-${value}-${index}`}
                                    onClick={removeTamanho}
                                  >
                                    <Image
                                      key={`img-${value}-${index}`}
                                      src={Delete}
                                      className={styles.deleteicon}
                                      alt="delete"
                                      width={40}
                                      height={35}
                                      priority
                                    />
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>
                        <div className={styles.novotamanho}>
                          <Select
                            className={styles.comboboxtamanhos}
                            options={tamanhoOptions}
                            defaultValue={{ value: "selecionar", label: "N.º" }}
                            onChange={handleTamanhos}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <p className={styles.parcelastitle}>PARCELAS</p>
                  <div className={styles.parcelas}>
                    <Select
                      className={styles.selectparcelas}
                      options={parcelaOptions}
                      defaultValue={{ value: "1", label: "1" }}
                      onChange={handleParcelas}
                    />
                    <p>X</p>
                    <input
                      name="valorparcelas"
                      id="valorparcelas"
                      type="text"
                      autoComplete="off"
                      className={styles.valorparcelas}
                      onChange={handleValorTotalChange}
                      placeholder="R$ 999.999,99"
                    />
                  </div>
                  <div className={styles.total}>
                    <p>VALOR À VISTA</p>
                    <input
                      name="valortotal"
                      id="valortotal"
                      autoComplete="off"
                      type="text"
                      className={styles.valortotal}
                      onChange={handleValorTotalChange}
                      placeholder="R$ 999.999,99"
                    />
                  </div>
                </div>
                <div className={styles.especificacoes}>
                  <p>DESCRIÇÃO</p>
                  <textarea name="descricao" id="descricao"></textarea>
                </div>
                <div className={styles.especificacoes}>
                  <p>ESPECIFICAÇÕES</p>
                  <textarea
                    name="especificacoes"
                    id="especificacoes"
                  ></textarea>
                </div>
                <div className={styles.containerenviar}>
                  <div className={styles.btnformulario}>
                    <button>LIMPAR</button>
                    <button onClick={handleSubmit}>ENVIAR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
