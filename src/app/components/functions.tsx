export function isOnlySpaces(str: string) {
  return str.trim() === "";
}

export function formatoMoeda(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
