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
  comments: Comment[] | null,
}

interface Comment {
  id: number,
  productId: number,
  description: string,
  date: string,
}
