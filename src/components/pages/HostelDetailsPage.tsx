import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Hostels } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, Bed, Wifi, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function HostelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [hostel, setHostel] = useState<Hostels | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadHostel();
  }, [id]);

  const loadHostel = async () => {
    if (!id) return;
    
    try {
      const data = await BaseCrudService.getById<Hostels>('hostels', id);
      setHostel(data || null);
    } catch (error) {
      console.error('Error loading hostel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!hostel?._id) return;
    actions.addToCart({
      collectionId: 'hostels',
      itemId: hostel._id,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Cart />
      
      <main className="w-full pt-32 pb-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link
              to="/hostels"
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-monospaced-background border border-primary/30 hover:border-primary/50 transition-all text-foreground hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-paragraph">Back to Hostels</span>
            </Link>

            <div className="min-h-[500px]">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[500px]">
                  <LoadingSpinner />
                </div>
              ) : !hostel ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Bed className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Hostel Not Found
                  </h3>
                  <p className="font-paragraph text-foreground/60 mb-6">
                    The hostel you're looking for doesn't exist
                  </p>
                  <Link
                    to="/hostels"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-teal text-primary-foreground font-paragraph font-semibold"
                  >
                    Browse Hostels
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="relative">
                      <div className="sticky top-32">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden bg-monospaced-background border border-primary/20 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                          {hostel.itemImage ? (
                            <Image
                              src={hostel.itemImage}
                              alt={hostel.itemName || 'Hostel'}
                              width={800}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Bed className="w-32 h-32 text-primary/30" />
                            </div>
                          )}
                          
                          {hostel.itemQuantity !== undefined && (
                            <div className="absolute top-6 right-6 bg-accent-teal text-accent-teal-foreground px-6 py-3 rounded-full font-mono text-lg font-bold shadow-[0_0_20px_rgba(0,255,197,0.5)]">
                              {hostel.itemQuantity} Beds Available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                      <div>
                        <h1 className="font-heading text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
                          {hostel.itemName || 'Unnamed Hostel'}
                        </h1>

                        {hostel.locationAddress && (
                          <div className="flex items-start gap-3 mb-6">
                            <MapPin className="w-6 h-6 text-accent-purple flex-shrink-0 mt-1" />
                            <span className="font-paragraph text-xl text-foreground/80">
                              {hostel.locationAddress}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price Card */}
                      {hostel.itemPrice !== undefined && (
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-mono text-5xl font-bold text-primary">
                              {formatPrice(hostel.itemPrice, currency ?? DEFAULT_CURRENCY)}
                            </span>
                            <span className="font-paragraph text-xl text-foreground/60">/month</span>
                          </div>
                          <p className="font-paragraph text-sm text-foreground/60 mb-6">
                            Includes all basic amenities
                          </p>
                          
                          <button
                            onClick={handleAddToCart}
                            disabled={addingItemId === hostel._id}
                            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-accent-teal text-primary-foreground font-paragraph font-semibold shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            {addingItemId === hostel._id ? (
                              <>
                                <LoadingSpinner />
                                <span>Adding to Cart...</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-5 h-5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Description */}
                      {hostel.itemDescription && (
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8">
                          <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
                            About This Hostel
                          </h2>
                          <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                            {hostel.itemDescription}
                          </p>
                        </div>
                      )}

                      {/* Amenities */}
                      {hostel.amenities && (
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8">
                          <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                            Amenities & Facilities
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {hostel.amenities.split(',').map((amenity, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30"
                              >
                                <Wifi className="w-6 h-6 text-primary flex-shrink-0" />
                                <span className="font-paragraph text-foreground">
                                  {amenity.trim()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
