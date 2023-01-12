import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'src/constants/cars.constant';

export type PanigationType = {
  limit: number;
  offset: number;
  total: number;
};

export const handleGetLimitAndOffset = (
  limitValue: number,
  offsetValue: number,
  totalValue: number = 0,
): PanigationType => {
  const limit: number = limitValue || LIMIT_DEFAULT;
  const offset: number = offsetValue || OFFSET_DEFAULT;
  const total: number = totalValue;
  return { limit, offset, total };
};
