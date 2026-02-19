export function FormatarData(data) {
  // Verifica se o input tem o tamanho correto (8 caracteres)

  if (!data || data.length !== 8) {
    return '';
  }
  if (data.length === 8) {
    const dia = data.slice(0, 2);
    const mes = data.slice(2, 4);
    const ano = data.slice(4, 8);

    // Retorna a data formatada como DD/MM/AAAA
    return `${dia}/${mes}/${ano}`;
  }
}