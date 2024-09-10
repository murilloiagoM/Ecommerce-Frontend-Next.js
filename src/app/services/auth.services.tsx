import { Dispatch, SetStateAction } from "react";
import { FormDataCadastro, FormDataLogin } from "../components/types";
import { generateMD5Hash } from "@/app/components/utils/md5";

export const Cadastro = (formData: FormDataCadastro) => {
  if (/\S+@\S+\.\S+/.test(formData.email)) {
    let status = 0;
    const dados = {
      email: formData.email,
      nome: formData.nome,
      senha: generateMD5Hash(formData.senha),
    };
    const url = "http://localhost:3333/novousuario";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dados),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status === 200) {
          localStorage.setItem("user", data["user"]);
          alert("Cadastro realizado com sucesso!");
          window.location.href = "/";
        } else {
          alert("Erro no cadastro");
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro na requisição:", error);
      });
  }
};

export const Login = (formData: FormDataLogin) => {
  const dados = {
    email: formData.email,
    senha: generateMD5Hash(formData.senha),
  };
  const url = "http://localhost:3333/login";
  let status = 0;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dados),
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        localStorage.setItem("user", data["user"]);
        alert("Login realizado com sucesso!");
        window.location.href = "/";
      } else {
        alert("Erro no login");
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};

export const Logout = () => {
  const url = "http://localhost:3333/logout";
  let status = 0;

  const dados = {};

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dados),
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then(() => {
      if (status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      } else {
        alert("Erro no logout");
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};

export const TypeUser = (
  setTypeUser: Dispatch<SetStateAction<string>>,
  redirecionar: boolean
) => {
  const url = "http://localhost:3333/typeuser";
  let status = 0;

  const dados = {};

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dados),
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        if (data["success"] === true && data["user"] === "admin") {
          setTypeUser("admin");
        } else if (redirecionar) {
          window.location.href = "/";
        }
      } else {
        alert("Erro na verificacao");
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro na requisição:", error);
    });
};
