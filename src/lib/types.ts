export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'main' | 'appetizer' | 'dessert' | 'beverage';
  description: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface TableOrder {
  id: string;
  items: OrderItem[];
  status: 'active' | 'completed' | 'pending';
  timestamp: number;
}

export interface TableData {
  [key: string]: TableOrder;
}