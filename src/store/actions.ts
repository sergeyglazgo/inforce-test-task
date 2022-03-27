export const LOAD_GOODS = 'LOAD GOODS';
export const LOAD_PRODUCT = 'LOAD GOOD';

export const loadGoodsAction = (payload: Product[]) => ({
  type: LOAD_GOODS,
  payload,
});

export const loadProductAction = (payload: Product | null) => ({
  type: LOAD_PRODUCT,
  payload,
});
