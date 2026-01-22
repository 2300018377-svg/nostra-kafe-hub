import { Plus } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { MenuItem, formatPrice } from '@/data/menuData';
import { useCartContext } from '@/context/CartContext';
import { useRef } from 'react';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const { addItem, cartIconRef, triggerShake } = useCartContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    // Create flying element
    if (imageRef.current && cartIconRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();

      const flyingEl = document.createElement('div');
      flyingEl.className = 'fixed pointer-events-none z-[100] rounded-full overflow-hidden shadow-lg';
      flyingEl.style.width = '60px';
      flyingEl.style.height = '60px';
      flyingEl.style.left = `${imageRect.left + imageRect.width / 2 - 30}px`;
      flyingEl.style.top = `${imageRect.top + imageRect.height / 2 - 30}px`;
      
      const img = document.createElement('img');
      img.src = item.image;
      img.className = 'w-full h-full object-cover';
      img.onerror = () => {
        img.src = 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=100&h=100&fit=crop';
      };
      flyingEl.appendChild(img);
      document.body.appendChild(flyingEl);

      // Calculate fly distance
      const deltaX = cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
      const deltaY = cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);

      // Animate
      flyingEl.style.setProperty('--fly-x', `${deltaX}px`);
      flyingEl.style.setProperty('--fly-y', `${deltaY}px`);
      flyingEl.classList.add('animate-fly-to-cart');

      // Cleanup and trigger cart shake
      setTimeout(() => {
        flyingEl.remove();
        triggerShake();
      }, 600);
    }

    addItem(item);
  };

  return (
    <div 
      ref={cardRef}
      className="glass-card rounded-2xl overflow-hidden card-hover animate-scale-in"
    >
      {/* Image */}
      <div ref={imageRef} className="relative aspect-square overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          fallbackKeyword={item.fallbackKeyword}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-accent p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
