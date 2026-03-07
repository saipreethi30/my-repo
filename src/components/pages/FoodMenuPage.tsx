import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { FoodMenu } from '@/entities';
import { Utensils, Coffee, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FoodMenuPage() {
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { items } = await BaseCrudService.getAll<FoodMenu>('foodmenu');
      // Sort by day of week
      const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const sorted = items.sort((a, b) => {
        const aIndex = daysOrder.indexOf(a.dayOfWeek || '');
        const bIndex = daysOrder.indexOf(b.dayOfWeek || '');
        return aIndex - bIndex;
      });
      setMenuItems(sorted);
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Sun;
      case 'dinner':
        return Moon;
      default:
        return Utensils;
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
                Weekly Food Menu
              </h1>
              <p className="font-paragraph text-xl text-foreground/70">
                Nutritious meals planned for your convenience
              </p>
            </motion.div>
          </div>

          {/* Menu Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[400px]">
              {isLoading ? null : menuItems.length > 0 ? (
                <div className="space-y-6">
                  {menuItems.map((menu, index) => (
                    <motion.div
                      key={menu._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                        {/* Day Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/20">
                          <h3 className="font-heading text-3xl font-bold text-foreground">
                            {menu.dayOfWeek || 'Day'}
                          </h3>
                          <Utensils className="w-8 h-8 text-primary" />
                        </div>

                        {/* Meals Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Breakfast */}
                          {menu.breakfastItems && (
                            <div className="bg-background/50 rounded-xl border border-accent-teal/20 p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-teal/20 flex items-center justify-center">
                                  <Coffee className="w-6 h-6 text-accent-teal" />
                                </div>
                                <h4 className="font-heading text-xl font-semibold text-foreground">
                                  Breakfast
                                </h4>
                              </div>
                              <div className="space-y-2">
                                {menu.breakfastItems.split(',').map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-accent-teal mt-1">•</span>
                                    <span className="font-paragraph text-foreground/80">
                                      {item.trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Lunch */}
                          {menu.lunchItems && (
                            <div className="bg-background/50 rounded-xl border border-primary/20 p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                  <Sun className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="font-heading text-xl font-semibold text-foreground">
                                  Lunch
                                </h4>
                              </div>
                              <div className="space-y-2">
                                {menu.lunchItems.split(',').map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    <span className="font-paragraph text-foreground/80">
                                      {item.trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Dinner */}
                          {menu.dinnerItems && (
                            <div className="bg-background/50 rounded-xl border border-accent-purple/20 p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                                  <Moon className="w-6 h-6 text-accent-purple" />
                                </div>
                                <h4 className="font-heading text-xl font-semibold text-foreground">
                                  Dinner
                                </h4>
                              </div>
                              <div className="space-y-2">
                                {menu.dinnerItems.split(',').map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-accent-purple mt-1">•</span>
                                    <span className="font-paragraph text-foreground/80">
                                      {item.trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Special Items */}
                        {menu.specialItems && (
                          <div className="mt-6 p-4 bg-secondary/10 border border-secondary/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-sm text-secondary uppercase">Special</span>
                            </div>
                            <p className="font-paragraph text-foreground/80">
                              {menu.specialItems}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Utensils className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    No Menu Available
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Menu information will be updated soon
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
