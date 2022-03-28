/// <reference types="react-scripts" />

interface State {
  goods: Product[],
  product: Product | null,
}

interface Product {
  id: number,
  imageUrl: string,
  name: string,
  count: string,
  size: {
    width: string,
    height: string,
  },
  weight: string,
  comments: CommentItem[] | null,
}

interface CommentItem {
  id: number,
  productId: number,
  description: string,
  date: string,
}
