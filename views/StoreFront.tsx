
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../types';

interface Props {
  products: Product[];
}

const StoreFront: React.FC<Props> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const filteredProducts = activeCategory === 'الكل' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-16 mb-12 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">أفضل المنتجات بأفضل الأثمنة</h1>
        <p className="text-xl opacity-90 mb-8">إلكترونيات، مستلزمات منزلية، وسيارات في مكان واحد.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">تسوق الآن</button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['الكل', Category.ELECTRONICS, Category.HOME, Category.CARS].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-gray-100">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 truncate">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-black text-blue-600">
                  {product.price.toLocaleString()} <span className="text-sm font-normal text-gray-400">د.م.</span>
                </span>
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  التفاصيل
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow-inner border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-xl">لا توجد منتجات في هذا القسم حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default StoreFront;
