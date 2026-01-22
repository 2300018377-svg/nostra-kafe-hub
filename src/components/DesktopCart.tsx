import { ShoppingBag, Plus, Minus, Trash2, MessageCircle, Instagram, ShoppingCart, MapPin } from 'lucide-react';
import { useCartContext } from '@/context/CartContext';
import { formatPrice } from '@/data/menuData';
import { ImageWithFallback } from './ImageWithFallback';
import { Button } from '@/components/ui/button';

export const DesktopCart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    generateOrderSummary,
    cartIconRef,
    isShaking,
  } = useCartContext();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(generateOrderSummary());
    window.open(`https://wa.me/6282178695665?text=${message}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/noka.yogyakarta', '_blank');
  };

  const handleShopeeFood = () => {
    window.open('https://shopee.co.id/universal-link/now-food/shop/22056334', '_blank');
  };

  const handleMaps = () => {
    window.open('https://maps.app.goo.gl/WUfsmMrnBJfntVkA9', '_blank');
  };

  return (
    <aside className="hidden lg:block w-96 h-screen sticky top-0 border-l border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <div 
          ref={cartIconRef}
          className={`flex items-center gap-3 pb-4 border-b ${isShaking ? 'animate-shake' : ''}`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Keranjang</h2>
            <p className="text-sm text-muted-foreground">{totalItems} item</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              Keranjang Kosong
            </h3>
            <p className="text-sm text-muted-foreground">
              Tambahkan menu untuk memulai
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 -mx-2 px-2">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 p-3 bg-secondary/30 rounded-xl animate-scale-in"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      fallbackKeyword={item.fallbackKeyword}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-primary font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={handleWhatsApp}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button 
                  onClick={handleInstagram}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white"
                >
                  <Instagram className="w-4 h-4 mr-1" />
                  Instagram
                </Button>
                <Button 
                  onClick={handleShopeeFood}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Shopee Food
                </Button>
                <Button 
                  onClick={handleMaps}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Lokasi
                </Button>
              </div>

              {/* Clear Cart */}
              <Button 
                onClick={clearCart}
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Kosongkan
              </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
