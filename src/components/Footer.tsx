import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-monospaced-background border-t border-primary/20">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                <span className="font-heading text-2xl font-bold text-primary-foreground">DH</span>
              </div>
              <span className="font-heading text-xl font-bold text-foreground">Digital Hostel</span>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
              Advanced hostel management system for the future of student living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hostels" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Hostels
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link to="/food-menu" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Food Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-accent-teal mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fee-records" className="font-paragraph text-sm text-foreground/70 hover:text-accent-teal transition-colors">
                  Fee Records
                </Link>
              </li>
              <li>
                <Link to="/parent-dashboard" className="font-paragraph text-sm text-foreground/70 hover:text-accent-teal transition-colors">
                  Parent Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="font-paragraph text-sm text-foreground/70 hover:text-accent-teal transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-accent-purple mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-foreground/70">
                  info@digitalhostel.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-foreground/70">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-foreground/70">
                  Hyderabad, Telangana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/60 text-center md:text-left">
              © {currentYear} Digital Hostel. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
