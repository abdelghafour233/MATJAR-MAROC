
export enum Category {
  ELECTRONICS = 'إلكترونيات',
  HOME = 'منزل وديكور',
  CARS = 'سيارات'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  productId: string;
  productName: string;
  amount: number;
  status: 'جديد' | 'قيد المعالجة' | 'تم الشحن' | 'ملغي';
  createdAt: string;
}

export interface AppSettings {
  fbPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  googleSheetUrl: string;
  domainName: string;
  nameServers: string[];
}
