import { Dispatch, SetStateAction } from "react";
import { TypeProdutos, TypeCategorias, EstruturaCategoria } from "@/app/components/types";
import { localprop } from "@/app/components/types";

export const Pesquisar = (
  produtos: TypeProdutos[],
  setProdutos: Dispatch<SetStateAction<TypeProdutos[]>>,
  setMoreProducts: Dispatch<SetStateAction<boolean>>,
  value: string,
  filtro: string
) => {
  if (value !== "") {
    let status = 0;
    const apiUrl = "http://localhost:3333/busca";
    const data = {
      busca: value,
      filtro,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (status === 200 && data["produtos"].length > 0) {
          setProdutos(data["produtos"]);
          setMoreProducts(false);
        } else {
          alert("Nenhum produto encontrado!");
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro na requisição:", error);
      });
  }
};

export const GetCategorias = (
  setCategorias: Dispatch<SetStateAction<TypeCategorias[]>>
) => {
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
};

export const GetProdutos = (
  produtos: TypeProdutos[],
  setProdutos: Dispatch<SetStateAction<TypeProdutos[]>>,
  offset: string,
  setMoreProducts: Dispatch<SetStateAction<boolean>>
) => {
  const apiUrl = `http://localhost:3333/produtos/${offset}`;
  let status = 0;
  fetch(apiUrl)
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        offset === "0"
          ? setProdutos(data["produtos"])
          : data["produtos"].length > 0
          ? setProdutos([...produtos, ...data["produtos"]])
          : "";
        setMoreProducts(data["more"]);
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};

export const GetProdutosCategorias = (
  produtos: TypeProdutos[],
  categorias: string[],
  filtro: string,
  setProdutos: Dispatch<SetStateAction<TypeProdutos[]>>,
  setMoreProducts: Dispatch<SetStateAction<boolean>>,
  offset: string
) => {
  if (categorias.length > 0 || filtro != "none") {
    const apiUrl = "http://localhost:3333/produtos/categorias";
    const newcategorias: EstruturaCategoria[] = [];

    categorias.forEach((value) => {
      let flag = 0;
      let id = 0;
      const array = value.split("-");
      newcategorias.forEach((newvalue, newindex) => {
        if (newvalue.nome == array[0]) {
          flag = 1;
          id = newindex;
        }
      });
      if (!flag) {
        newcategorias.push({ nome: array[0], subcategorias: [array[1]] });
      } else {
        newcategorias[id].subcategorias.push(array[1]);
      }
    });

    const data = {
      categorias: newcategorias,
      filtro: filtro,
      offset: offset,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        offset === "0"
          ? setProdutos(data["produtos"])
          : data["produtos"].length > 0
          ? setProdutos([...produtos, ...data["produtos"]])
          : "";
        setMoreProducts(data["more"]);
      })
      .catch((error) => {
        console.error("Ocorreu um erro na requisição:", error);
      });
  }
};

export const GetProdutoId = (
  id: number,
  setProduto: Dispatch<SetStateAction<TypeProdutos>>,
  setArrayTamanhos: Dispatch<SetStateAction<string[]>>
) => {
  const apiUrl = `http://localhost:3333/produtoid/${id}`;
  let status = 0;
  fetch(apiUrl)
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        setProduto(data['produto'][0]) //MYSQL
      setArrayTamanhos(data['produto'][0]['tamanhos'].split(", "))
        /*setProduto(data["produto"]); //postgres
        setArrayTamanhos(data["produto"]["tamanhos"].split(", "));*/
      } else {
        alert("Produto não existe!");
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};

export const GetProdCarrinho = (
  produtos: localprop[],
  setListaProdutos: Dispatch<SetStateAction<TypeProdutos[]>>,
  setDisplay: Dispatch<SetStateAction<boolean>>,
  setValorTotal: Dispatch<SetStateAction<number>>,
  setValorParcelas: Dispatch<SetStateAction<number>>
) => {
  const apiUrl = `http://localhost:3333/produtoscarrinho`;
  const data = {
    produtos: produtos,
  };
  let status = 0;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        const array: TypeProdutos[] = data["produtos"];
        let somatotal: number = 0;
        let somaparcelas: number = 0;
        array.forEach((value, index) => {
          produtos.forEach((produto) => {
            if (produto.id === value.id) {
              array[index] = {
                ...array[index],
                quantidade: produto.quantidade,
              };
            }
          });
        });

        array.forEach((value) => {
          if (value.quantidade) {
            somatotal += value.valortotal * value.quantidade;
            somaparcelas += value.valorparcelas * value.quantidade;
          }
        });
        setValorTotal(somatotal);
        setValorParcelas(somaparcelas);
        setListaProdutos(array);
      }
      setDisplay(true);
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};

/*

*/
//EXEMPLOS PUT GET POST DELETE
/*GET

// URL da sua API PHP
const apiUrl = 'https://exemplo.com/sua-api.php';

// Fazer uma requisição GET
fetch(apiUrl)
  .then(response => {
    // Verificar se a resposta da API é bem-sucedida (status 200)
    if (response.status === 200) {
      // Transformar a resposta em JSON
      return response.json();
    } else {
      return response.json();
    }
  })
  .then(data => {
    // O objeto 'data' contém os dados JSON da resposta
    console.log(data);
  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição:', error);
  });

  */

/* POST
const apiUrl = 'https://exemplo.com/sua-api.php';

const data = {
  nome: 'João',
  email: 'joao@example.com',
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return response.json();
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição:', error);
  });




*/

/*PUT

const apiUrl = 'https://exemplo.com/sua-api.php';
const resourceId = 123; // Substitua pelo ID ou identificador do recurso que você deseja atualizar

const data = {
  nome: 'João Atualizado',
  email: 'joao@atualizado.com',
};

fetch(`${apiUrl}/${resourceId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return response.json();
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição:', error);
  });

  */
/* DELETE

const apiUrl = 'https://exemplo.com/sua-api.php';
const resourceId = 123; // Substitua pelo ID ou identificador do recurso que você deseja excluir

fetch(`${apiUrl}/${resourceId}`, {
  method: 'DELETE',
})
  .then(response => {
    if (response.status === 204) {
      // Status 204 significa "No Content" e indica que a exclusão foi bem-sucedida
      console.log('Recurso excluído com sucesso.');
    } else {
      return response.json();
    }
  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição:', error);
  });
  */
