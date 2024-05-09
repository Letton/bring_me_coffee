interface User {
  id: string;
  email: string;
  username: string;
  firstname: string | null;
  lastname: string | null;
  role: string;
}

interface Product {
  id: string;
  name: string;
  net_weight: number;
  type: string;
  price: number;
  image: string;
}

interface Position extends Product {
  count: number;
}

interface Order {
  id: string;
  address: string;
  status: string;
  total: number;
  creationDate: string;
}
