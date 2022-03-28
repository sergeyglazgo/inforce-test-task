const BASE_URL = 'http://127.0.0.1:3003/comments';

export const getAllComments = async (): Promise<CommentItem[]> => {
  const responce = await fetch(BASE_URL);

  return responce.json();
};

export const getComments = async (productId: number) => {
  const responce = await getAllComments();

  return responce.filter(comment => comment.productId === productId);
};

export const deleteComment = async (commentId: number) => {
  return fetch(`${BASE_URL}/${commentId}`, {
    method: 'DELETE',
  });
};

export async function postComment(comment: Omit<CommentItem, 'id'>) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return response.ok && response.status === 200;
}
