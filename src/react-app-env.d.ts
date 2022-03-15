/// <reference types="react-scripts" />

interface State {
  goods: Good[],
  good: Good | null,
}

interface Good {
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  size: {
    width: number,
    height: number,
  },
  weight: string,
  comments: Comment[],
}

interface Comment {
  id: number,
  productId: number,
  description: string,
  date: string,
}
