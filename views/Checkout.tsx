
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, Order } from '../types';
import { MOROCCAN_CITIES } from '../constants';

interface Props {
  products: Product[];
  onOrderComplete: (order: Order) => void;
}

const Checkout: React.FC<Props> = ({ products, onOrderComplete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return <div>المنتج غير موجود</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        customerName: formData.fullName,
        city: formData.city,
        phone: formData.phone,
        productId: product.id,
        productName: product.name,
        amount: product.price,
        status: 'جديد',
        createdAt: new Date().toISOString()
      };
      
      onOrderComplete(newOrder);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white max-w-lg mx-auto p-12 rounded-3xl shadow-xl border border-green-100">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">شكراً لك!</h2>
          <p className="text-gray-600 mb-8 text-lg">تم تسجيل طلبك بنجاح. سنتصل بك قريباً لتأكيد المعلومات والشحن.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            العودة للتسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Order Summary */}
        <div className="md:w-1/3 order-2 md:order-1">
          <div className="bg-gray-100 p-6 rounded-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-6">ملخص الطلب</h3>
            <div className="flex gap-4 mb-4">
              <img src={product.image} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-bold text-sm">{product.name}</p>
                <p className="text-blue-600 font-bold">{product.price.toLocaleString()} د.م.</p>
              </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between items-center text-lg font-black">
              <span>المجموع:</span>
              <span className="text-blue-600">{product.price.toLocaleString()} د.م.</span>
            </div>
            <p className="text-xs text-green-600 mt-4 flex items-center gap-1">
              <span>🚚</span> التوصيل مجاني لجميع المدن
            </p>
          </div>
        </div>

        {/* Customer Form */}
        <div className="md:w-2/3 order-1 md:order-2">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black mb-8">إتمام عملية الطلب</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">الاسم الكامل *</label>
                <input 
                  type="text" 
                  required
                  placeholder="أدخل اسمك الكامل هنا"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">المدينة *</label>
                <select 
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition appearance-none"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                >
                  <option value="">اختر مدينتك</option>
                  {MOROCCAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">رقم الهاتف *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="06XXXXXXXX"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <p className="text-sm text-blue-800 leading-relaxed">
                  نحن نعتمد نظام <strong>الدفع عند الاستلام</strong>. لن تدفع أي شيء الآن، ستقوم بالدفع فقط عندما يصل المنتج لباب منزلك.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl text-xl font-bold text-white shadow-xl transition flex justify-center items-center gap-3 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    جاري المعالجة...
                  </>
                ) : (
                  'تأكيد الطلب الآن'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
