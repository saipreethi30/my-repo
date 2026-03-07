import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-monospaced-background border-l border-primary/20 shadow-[0_0_50px_rgba(0,255,255,0.2)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-20 h-20 text-primary/30 mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Add hostels to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-background/50 rounded-xl border border-primary/20 p-4"
                    >
                      <div className="flex gap-4">
                        {/* Item Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-monospaced-background flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-primary/30" />
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-paragraph font-semibold text-foreground mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="font-mono text-lg font-bold text-primary mb-3">
                            {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-primary" />
                            </button>
                            <span className="font-mono text-foreground font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-primary" />
                            </button>
                            <button
                              onClick={() => actions.removeFromCart(item)}
                              className="ml-auto p-2 rounded-lg hover:bg-destructive/20 transition-colors"
                            >
                              <Trash2 className="w-5 h-5 text-destructive" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/20 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-paragraph text-lg text-foreground">Total:</span>
                  <span className="font-mono text-3xl font-bold text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-accent-teal text-primary-foreground font-paragraph font-semibold shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isCheckingOut ? (
                    <>
                      <LoadingSpinner />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Proceed to Checkout</span>
                  )}
                </button>

                <button
                  onClick={actions.clearCart}
                  className="w-full px-6 py-3 rounded-xl border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-paragraph font-semibold transition-all"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
