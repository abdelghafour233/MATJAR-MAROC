
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product, Order, AppSettings, Category } from './types';
import { INITIAL_PRODUCTS } from './constants';
import StoreFront from './views/StoreFront';
import ProductDetail from './views/ProductDetail';
import Checkout from './views/Checkout';
import Dashboard from './views/Dashboard';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      fbPixelId: '',
      googleAnalyticsId: '',
      tiktokPixelId: '',
      googleSheetUrl: '',
      domainName: 'myshop.ma',
      nameServers: ['ns1.provider.com', 'ns2.provider.com']
    };
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col relative">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<StoreFront products={products} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route path="/checkout/:id" element={<Checkout products={products} onOrderComplete={addOrder} />} />
            <Route 
              path="/admin/*" 
              element={
                <Dashboard 
                  products={products} 
                  setProducts={setProducts} 
                  orders={orders} 
                  setOrders={setOrders}
                  settings={settings} 
                  setSettings={setSettings} 
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HashRouter>
  );
};

const WhatsAppButton: React.FC = () => (
  <a 
    href="https://wa.me/212649075664" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-[100] bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group"
    title="تواصل معنا عبر واتساب"
  >
    <svg 
      className="w-10 h-10 fill-current" 
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.815 11.815 0 001.592 5.911L0 24l6.147-1.613a11.773 11.773 0 005.901 1.592h.005c6.635 0 12.046-5.413 12.049-12.051.002-3.218-1.247-6.242-3.513-8.508z"/>
    </svg>
    <span className="absolute left-full ml-4 bg-white text-gray-800 px-3 py-1 rounded shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      تحدث معنا!
    </span>
  </a>
);

const Navigation: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded">MA</span>
          متجر المغرب
        </Link>
        <div className="flex gap-6 items-center">
          {!isAdmin && (
            <>
              <Link to="/" className="hover:text-blue-600 transition">الرئيسية</Link>
              <Link to="/admin" className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">لوحة التحكم</Link>
            </>
          )}
          {isAdmin && (
            <Link to="/" className="text-blue-600 hover:underline">العودة للمتجر</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 mt-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">متجر المغرب الحديث</h3>
        <p className="text-gray-400">وجهتك الأولى للتسوق الإلكتروني في المغرب. جودة عالية وأثمنة تنافسية.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/" className="hover:text-white transition">الرئيسية</Link></li>
          <li><Link to="/admin" className="hover:text-white transition">لوحة التحكم</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
        <p className="text-gray-400">الدار البيضاء، المغرب</p>
        <p className="text-gray-400">هاتف: 0649075664</p>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
      <p>&copy; 2024 جميع الحقوق محفوظة.</p>
    </div>
  </footer>
);

export default App;
