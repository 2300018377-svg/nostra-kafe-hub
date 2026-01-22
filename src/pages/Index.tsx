import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { MenuGrid } from '@/components/MenuGrid';
import { Cart } from '@/components/Cart';
import { DesktopCart } from '@/components/DesktopCart';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <HeroSection />
        
        {/* Main Content */}
        <div className="flex">
          {/* Menu Section */}
          <div className="flex-1 min-w-0">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <MenuGrid 
              searchQuery={searchQuery}
              activeCategory={activeCategory}
            />
            <Footer />
          </div>
          
          {/* Desktop Sidebar Cart */}
          <DesktopCart />
        </div>

        {/* Mobile Floating Cart */}
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
