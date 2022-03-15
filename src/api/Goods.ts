const BASE_URL = 'http://127.0.0.1:3003/goods';

export const getGoods = async () => {
  const responce = await fetch(BASE_URL);

  return responce.json();
};

export async function postGood(
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  width: number,
  height: number,
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

export async function deleteGood(goodId: number) {
  return fetch(`${BASE_URL}/${goodId}`, {
    method: 'DELETE',
  });
}
