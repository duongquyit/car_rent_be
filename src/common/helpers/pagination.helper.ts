export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

export const handleGetLimitAndOffset = (
  limitValue: number,
  offsetValue: number,
  totalValue = 0,
): Pagination => {
  const limit: number = limitValue;
  const offset: number = offsetValue;
  const total: number = totalValue;
  return { limit, offset, total };
};
