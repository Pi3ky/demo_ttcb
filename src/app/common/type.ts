export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  avatar: string;
  color: string
}

export interface Products {
  id: number;
  price: number;
  category: string;
  image: string;
  description: string;
  title: string;
  rate: number;
  colors: Colors[];
}

export interface Colors {
  value: string;
  name: string;
  id: string;
}
