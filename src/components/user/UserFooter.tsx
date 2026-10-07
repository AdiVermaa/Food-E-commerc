import Link from 'next/link';
import { FaLeaf, FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function UserFooter() {
  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Archana's%20Zaika"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-float"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center">
                <FaLeaf className="text-white text-lg" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Archana&apos;s Zaika</h3>
                <p className="text-xs text-warm-gray-400">Ghar Ka Khana, Dil Se</p>
              </div>
            </div>
            <p className="text-sm text-warm-gray-400 leading-relaxed mb-4">
              Authentic Bihari home-cooked food delivered to your doorstep in Kharghar. 
              Made with love by Archana aunty for college students and working professionals.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-warm-gray-800 flex items-center justify-center text-warm-gray-400 hover:bg-green-600 hover:text-white transition-all">
                <FaWhatsapp className="text-lg" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-warm-gray-800 flex items-center justify-center text-warm-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/menu', label: 'Our Menu' },
                { href: '/plans', label: 'Tiffin Plans' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-warm-gray-400 hover:text-saffron-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Areas */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">We Deliver To</h4>
            <ul className="space-y-2.5 text-sm text-warm-gray-400">
              <li>Kharghar Sector 34, 35, 36</li>
              <li>Kharghar Sector 20</li>
              <li>Belapur CBD</li>
              <li className="text-saffron-400 font-medium">More areas coming soon!</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-saffron-400 mt-0.5 shrink-0" />
                <span className="text-sm text-warm-gray-400">Sector 35E, Kharghar, Navi Mumbai - 410210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone className="text-saffron-400 shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-warm-gray-400 hover:text-saffron-400 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-saffron-400 shrink-0" />
                <a href="mailto:hello@archanaszaika.com" className="text-sm text-warm-gray-400 hover:text-saffron-400 transition-colors">hello@archanaszaika.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-gray-500">
            © {new Date().getFullYear()} Archana&apos;s Zaika. Made with ❤️ in Kharghar.
          </p>
          <div className="flex gap-6 text-xs text-warm-gray-500">
            <Link href="#" className="hover:text-warm-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-warm-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
