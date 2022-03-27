export const BASE_URL = 'http://127.0.0.1:3003/goods';

export const getGoods = async (): Promise<Product[]> => {
  const responce = await fetch(BASE_URL);

  return responce.json();
};

export const getSortedGoods = async () => {
  const sortedGoods = await getGoods();

  return sortedGoods
    .sort((a, b) => +b.count - +a.count)
    .sort((a, b) => a.name[0].localeCompare(b.name[0]));
};

export const getProduct = async (productId: number) => {
  const responce = await fetch(`${BASE_URL}/${productId}`);

  return responce.json();
};

export async function postProduct(
  id: number,
  imageUrl: string,
  name: string,
  count: string,
  width: string,
  height: string,
  weight: string,
) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id,
      imageUrl,
      name,
      count,
      size: {
        width,
        height,
      },
      weight,
      comments: [],
    }),
  });

  return response.json();
}

export async function editProduct(
  id: number,
  imageUrl: string,
  name: string,
  count: string,
  width: string,
  height: string,
  weight: string,
) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id,
      imageUrl,
      name,
      count,
      size: {
        width,
        height,
      },
      weight,
      comments: [],
    }),
  });

  return response.json();
}

export async function deleteProduct(productId: number) {
  return fetch(`${BASE_URL}/${productId}`, {
    method: 'DELETE',
  });
}
