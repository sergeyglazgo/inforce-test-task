export const LOAD_GOODS = 'LOAD GOODS';
export const LOAD_GOOD = 'LOAD GOOD';

export const loadGoodsAction = (payload: Good[]) => ({
  type: LOAD_GOODS,
  payload,
});

export const loadGoodAction = (payload: Good | null) => ({
  type: LOAD_GOOD,
  payload,
});
