import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { member, isAuthenticated, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hostels', path: '/hostels' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Food Menu', path: '/food-menu' },
    { name: 'Fee Records', path: '/fee-records' },
    { name: 'Parent Dashboard', path: '/parent-dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all">
              <span className="font-heading text-2xl font-bold text-primary-foreground">DH</span>
            </div>
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent hidden sm:block">
              Digital Hostel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph px-4 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-monospaced-background border border-primary/30 hover:border-primary/50 transition-all"
                >
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-foreground">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={actions.logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-paragraph">Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={actions.login}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-teal text-primary-foreground font-paragraph font-semibold shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-monospaced-background border border-primary/30 hover:border-primary/50 transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-2 pt-4 pb-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph px-4 py-3 rounded-lg transition-all ${
                      isActive(link.path)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-primary/20 mt-2 pt-2 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-monospaced-background border border-primary/30"
                      >
                        <User className="w-5 h-5 text-primary" />
                        <span className="font-paragraph text-foreground">
                          {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                        </span>
                      </Link>
                      <button
                        onClick={() => {
                          actions.logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-paragraph">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        actions.login();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-teal text-primary-foreground font-paragraph font-semibold shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
