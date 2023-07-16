const THOUSAND = 1000;
const MILLION = 1000000;

export function formatTotalNumber(total: number) {
  if (total < THOUSAND) {
    return total.toLocaleString('de-DE');
  } else if (total < MILLION) {
    const numberDivided = Math.floor(total / THOUSAND);
    return `${numberDivided.toLocaleString('de-DE')} N`;
  } else {
    const numberDivided = Math.floor(total / MILLION);
    return `${numberDivided.toLocaleString('de-DE')} Tr`;
  }
}
