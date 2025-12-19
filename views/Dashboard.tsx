
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product, Order, AppSettings, Category } from '../types';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const Dashboard: React.FC<Props> = ({ products, setProducts, orders, setOrders, settings, setSettings }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password is 'admin123'
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('كلمة السر غير صحيحة، حاول مجدداً.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔒</div>
            <h2 className="text-2xl font-black">الدخول للوحة التحكم</h2>
            <p className="text-gray-500 text-sm mt-2">يرجى إدخال كلمة السر للمتابعة</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="كلمة السر (الافتراضية: admin123)" 
                className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 outline-none transition ${error ? 'border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs mt-2 pr-1">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'نظرة عامة', path: '/admin', icon: '📊' },
    { label: 'الطلبات', path: '/admin/orders', icon: '📦' },
    { label: 'المنتجات', path: '/admin/products', icon: '🏷️' },
    { label: 'البكسلات والتتبع', path: '/admin/tracking', icon: '🔍' },
    { label: 'الدومين والإعدادات', path: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-[600px]">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/')
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        <div className="mt-auto pt-6 border-t mt-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition font-medium"
          >
            <span>🚪</span>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Routes>
          <Route path="/" element={<Overview orders={orders} products={products} />} />
          <Route path="/orders" element={<OrdersList orders={orders} setOrders={setOrders} />} />
          <Route path="/products" element={<ProductsList products={products} setProducts={setProducts} />} />
          <Route path="/tracking" element={<TrackingSettings settings={settings} setSettings={setSettings} />} />
          <Route path="/settings" element={<GeneralSettings settings={settings} setSettings={setSettings} />} />
        </Routes>
      </main>
    </div>
  );
};

/* --- Sub-Components --- */

const Overview: React.FC<{orders: Order[], products: Product[]}> = ({ orders, products }) => {
  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const lowStock = products.filter(p => p.stock < 5).length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">نظرة عامة على المتجر</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <p className="text-sm text-blue-600 mb-2 font-bold uppercase">إجمالي المبيعات</p>
          <p className="text-3xl font-black text-blue-900">{totalSales.toLocaleString()} د.م.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-sm text-green-600 mb-2 font-bold uppercase">عدد الطلبات</p>
          <p className="text-3xl font-black text-green-900">{totalOrders}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <p className="text-sm text-red-600 mb-2 font-bold uppercase">منتجات نفد مخزونها</p>
          <p className="text-3xl font-black text-red-900">{lowStock}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-2xl text-center border-2 border-dashed border-gray-200">
        <p className="text-gray-500">مخطط المبيعات سيظهر هنا عند توفر بيانات كافية.</p>
      </div>
    </div>
  );
};

const OrdersList: React.FC<{orders: Order[], setOrders: any}> = ({ orders, setOrders }) => {
  const updateStatus = (id: string, newStatus: any) => {
    setOrders((prev: Order[]) => prev.map(o => o.id === id ? {...o, status: newStatus} : o));
  };

  const deleteOrder = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      setOrders((prev: Order[]) => prev.filter(o => o.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">إدارة الطلبات</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-4 pr-2">الزبون</th>
              <th className="pb-4">المدينة</th>
              <th className="pb-4">المنتج</th>
              <th className="pb-4">الحالة</th>
              <th className="pb-4">التاريخ</th>
              <th className="pb-4">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-4 pr-2">
                  <div className="font-bold">{order.customerName}</div>
                  <div className="text-xs text-gray-400">{order.phone}</div>
                </td>
                <td className="py-4 text-sm">{order.city}</td>
                <td className="py-4 text-sm font-medium">{order.productName}</td>
                <td className="py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1 bg-white"
                  >
                    <option value="جديد">جديد</option>
                    <option value="قيد المعالجة">قيد المعالجة</option>
                    <option value="تم الشحن">تم الشحن</option>
                    <option value="ملغي">ملغي</option>
                  </select>
                </td>
                <td className="py-4 text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('ar-MA')}
                </td>
                <td className="py-4">
                  <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-700 p-2">🗑️</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="py-20 text-center text-gray-400">لا توجد طلبات حالياً.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductsList: React.FC<{products: Product[], setProducts: any}> = ({ products, setProducts }) => {
  const updateStock = (id: string, newStock: number) => {
    setProducts((prev: Product[]) => prev.map(p => p.id === id ? {...p, stock: newStock} : p));
  };

  const deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts((prev: Product[]) => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ إضافة منتج</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <img src={product.image} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">المخزون</p>
                <input 
                  type="number" 
                  className="w-16 border rounded text-center py-1 text-sm bg-white"
                  value={product.stock}
                  onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="text-left w-24">
                <p className="font-bold text-blue-600">{product.price.toLocaleString()} د.م.</p>
              </div>
              <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700 p-2">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrackingSettings: React.FC<{settings: AppSettings, setSettings: any}> = ({ settings, setSettings }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">إعدادات البكسل والتتبع</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Facebook Pixel ID</label>
          <input 
            type="text" 
            placeholder="مثال: 123456789012345"
            className="w-full bg-gray-50 border rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
            value={settings.fbPixelId}
            onChange={e => setSettings({...settings, fbPixelId: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">TikTok Pixel ID</label>
          <input 
            type="text" 
            placeholder="مثال: C6ABCD123EFG"
            className="w-full bg-gray-50 border rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
            value={settings.tiktokPixelId}
            onChange={e => setSettings({...settings, tiktokPixelId: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Google Analytics (G-ID)</label>
          <input 
            type="text" 
            placeholder="مثال: G-XXXXXXX"
            className="w-full bg-gray-50 border rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
            value={settings.googleAnalyticsId}
            onChange={e => setSettings({...settings, googleAnalyticsId: e.target.value})}
          />
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <h4 className="font-bold text-yellow-800 mb-2">رابط Google Sheets</h4>
          <p className="text-xs text-yellow-700 mb-4">ضع رابط الجدول الذي تريد إرسال الطلبات إليه تلقائياً.</p>
          <input 
            type="text" 
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="w-full bg-white border rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
            value={settings.googleSheetUrl}
            onChange={e => setSettings({...settings, googleSheetUrl: e.target.value})}
          />
        </div>
        <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC<{settings: AppSettings, setSettings: any}> = ({ settings, setSettings }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">إعدادات الدومين والسيفر</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold mb-2">اسم النطاق (Domain Name)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-grow bg-gray-50 border rounded-xl px-4 py-3 outline-none"
              value={settings.domainName}
              onChange={e => setSettings({...settings, domainName: e.target.value})}
            />
            <button className="bg-gray-100 px-4 rounded-xl font-bold">تغيير</button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span>🌍</span> Name Servers الإفتراضية
          </h4>
          <div className="space-y-3">
            {settings.nameServers.map((ns, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border flex justify-between items-center font-mono text-sm">
                <span>{ns}</span>
                <span className="text-green-500 text-xs font-bold uppercase">متصل</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            يرجى توجيه الدومين الخاص بك إلى خوادمنا باستخدام الإعدادات أعلاه لضمان عمل المتجر بشكل صحيح. قد يستغرق التحديث 24-48 ساعة.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">إعدادات إضافية</h4>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-sm">تفعيل شهادة SSL مجانية</p>
              <p className="text-xs text-gray-500">حماية المتجر وبروتوكول HTTPS</p>
            </div>
            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
