import { provinces } from '../../config';

export const getProvinces = async () => {
  const provincesData = fetch(provinces).then((response) => {
    return response.json();
  });

  return provincesData;
};
