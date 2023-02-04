import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from 'src/common/constants/cars.constant';

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
  const limit: number = limitValue;
  const offset: number = offsetValue;
  const total: number = totalValue;
  return { limit, offset, total };
};
