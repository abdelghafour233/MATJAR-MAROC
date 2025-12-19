
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  products: Product[];
}

const ProductDetail: React.FC<Props> = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Link to="/" className="text-blue-600 hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <nav className="text-sm text-gray-500 mb-4">
             {product.category} &gt; {product.name}
          </nav>
          <h1 className="text-4xl font-black text-gray-900 mb-6">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-5xl font-black text-blue-600">{product.price.toLocaleString()}</span>
            <span className="text-xl text-gray-400">درهم مغربي</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <Link 
              to={`/checkout/${product.id}`}
              className="bg-blue-600 text-white text-center py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200"
            >
              اطلب الآن - الدفع عند الاستلام
            </Link>
            <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              متوفر في المخزون: {product.stock} قطع
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t pt-8">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🚚</div>
              <p className="text-xs font-bold">توصيل سريع</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🤝</div>
              <p className="text-xs font-bold">دفع آمن</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🔄</div>
              <p className="text-xs font-bold">إرجاع مجاني</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
