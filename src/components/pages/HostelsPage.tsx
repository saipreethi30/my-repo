import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Hostels } from '@/entities';
import { Image } from '@/components/ui/image';
import { Wifi, MapPin, Bed, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostels[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Hostels>('hostels');
      setHostels(items);
    } catch (error) {
      console.error('Error loading hostels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="w-full pt-32 pb-16">
        <div className="max-w-[120rem] mx-auto px-6">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
                Available Hostels
              </h1>
              <p className="font-paragraph text-xl text-foreground/70">
                Find your perfect accommodation with modern facilities
              </p>
            </motion.div>
          </div>

          {/* Hostels Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[400px]">
              {isLoading ? null : hostels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostels.map((hostel, index) => (
                    <motion.div
                      key={hostel._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Link to={`/hostels/${hostel._id}`}>
                        <div className="group bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden bg-monospaced-background">
                            {hostel.itemImage ? (
                              <Image
                                src={hostel.itemImage}
                                alt={hostel.itemName || 'Hostel'}
                                width={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Bed className="w-20 h-20 text-primary/30" />
                              </div>
                            )}
                            
                            {/* Vacancy Badge */}
                            {hostel.itemQuantity !== undefined && (
                              <div className="absolute top-4 right-4 bg-accent-teal text-accent-teal-foreground px-4 py-2 rounded-full font-mono text-sm font-bold shadow-[0_0_15px_rgba(0,255,197,0.5)]">
                                {hostel.itemQuantity} Beds
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-heading text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                              {hostel.itemName || 'Unnamed Hostel'}
                            </h3>

                            {hostel.locationAddress && (
                              <div className="flex items-start gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                                <span className="font-paragraph text-sm text-foreground/70">
                                  {hostel.locationAddress}
                                </span>
                              </div>
                            )}

                            {hostel.itemDescription && (
                              <p className="font-paragraph text-base text-foreground/70 mb-4 line-clamp-2 flex-1">
                                {hostel.itemDescription}
                              </p>
                            )}

                            {/* Amenities */}
                            {hostel.amenities && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hostel.amenities.split(',').slice(0, 3).map((amenity, i) => (
                                  <span
                                    key={i}
                                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-xs font-paragraph text-foreground"
                                  >
                                    <Wifi className="w-3 h-3 text-primary" />
                                    {amenity.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/20">
                              {hostel.itemPrice !== undefined && (
                                <div>
                                  <span className="font-mono text-3xl font-bold text-primary">
                                    ₹{hostel.itemPrice}
                                  </span>
                                  <span className="font-paragraph text-sm text-foreground/60">/month</span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2 text-accent-teal group-hover:gap-3 transition-all">
                                <span className="font-paragraph font-semibold">View Details</span>
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Bed className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    No Hostels Available
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Check back later for available accommodations
                  </p>
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
