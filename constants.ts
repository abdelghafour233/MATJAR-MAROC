
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ماك بوك برو M3',
    description: 'أحدث حاسوب محمول من آبل مع شاشة ريتينا وقوة معالجة خارقة.',
    price: 24500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/seed/macbook/600/400',
    stock: 10
  },
  {
    id: '2',
    name: 'أريكة عصرية مريحة',
    description: 'أريكة بثلاثة مقاعد، تصميم عصري يناسب غرف الجلوس المغربية.',
    price: 4200,
    category: Category.HOME,
    image: 'https://picsum.photos/seed/sofa/600/400',
    stock: 5
  },
  {
    id: '3',
    name: 'تويوتا كورولا 2024',
    description: 'سيارة سيدان اقتصادية وعملية، مثالية للمدن المغربية.',
    price: 215000,
    category: Category.CARS,
    image: 'https://picsum.photos/seed/car/600/400',
    stock: 2
  },
  {
    id: '4',
    name: 'هاتف سامسونج S24 Ultra',
    description: 'هاتف ذكي بكاميرا احترافية وقلم مدمج.',
    price: 13500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/seed/samsung/600/400',
    stock: 15
  },
  {
    id: '5',
    name: 'آلة قهوة إسبيرسو',
    description: 'استمتع بأفضل قهوة في منزلك مع هذه الآلة الاحترافية.',
    price: 1800,
    category: Category.HOME,
    image: 'https://picsum.photos/seed/coffee/600/400',
    stock: 20
  }
];

export const MOROCCAN_CITIES = [
  'الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'فاس', 'أكادير', 'مكناس', 'وجدة', 'القنيطرة', 'تطوان'
];
