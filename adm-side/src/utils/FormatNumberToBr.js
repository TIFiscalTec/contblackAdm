/**
 * Formata um número para padrão brasileiro (pt-BR)
 * @param {number|string} value - valor numérico ou string que represente número
 * @param {object} options - opções de casas decimais
 * @param {number} options.minimumFractionDigits - mínimas casas decimais (default 2)
 * @param {number} options.maximumFractionDigits - máximas casas decimais (default 2)
 * @returns {string} valor formatado em pt-BR
 */
export function FormatNumberToBr(value, { minimumFractionDigits = 2, maximumFractionDigits = 2 } = {}) {
  if (value === null || value === undefined || value === "") return "";

  // Converte para número
  const num = typeof value === "number" ? value : Number(String(value).replace(",", "."));

  if (isNaN(num)) return "";

  // Formata para pt-BR
  return num.toLocaleString("pt-BR", { minimumFractionDigits, maximumFractionDigits });
}
