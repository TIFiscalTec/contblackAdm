export function formatToBrl(value) {
    if (isNaN(value)) return "R$ 0,00";

    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
}
