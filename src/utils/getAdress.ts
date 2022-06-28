import { mapQuest } from '../config/axios';
import { formatAdress } from './formatAdress';

interface IGetAdressProps {
  number: string;
  adress: string;
  city: string;
  state: string;
  zip_code: string;
}

export async function getAdress({
  number,
  adress,
  city,
  state,
  zip_code
}: IGetAdressProps) {
  const formatedAdress = formatAdress(adress);

  return mapQuest.post('', {
    location: `${number} ${formatedAdress}, ${city}, ${state}, ${zip_code}`,
    options: {
      thumbMaps: false
    }
  });
}
