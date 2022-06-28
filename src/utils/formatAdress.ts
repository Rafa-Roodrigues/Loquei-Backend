export function formatAdress(adress: string) {
  const trimAdress = adress.trim();
  const splitAdress = trimAdress.split(' ');

  const capitalizedFirstLetter = splitAdress.map((text) => {
    const firstCapitalLetter = text[0].toUpperCase();

    return text.replace(text[0], firstCapitalLetter);
  });

  const adressFormated = capitalizedFirstLetter.join(' ');

  return adressFormated;
}
