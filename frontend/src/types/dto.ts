interface User {
  id: string;
  username: string;
  role: string;
}

interface Product {
  id: string;
  name: string;
  net_weight: number;
  price: number;
  image: string;
}

interface Position extends Product {
  count: number;
}
