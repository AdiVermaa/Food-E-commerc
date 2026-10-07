'use client';

import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-warm-gray-900 mb-3">
            Contact Archana&apos;s Zaika 📞
          </h1>
          <p className="text-warm-gray-500">
            Have questions about tiffin subscriptions or custom bulk catering? Reach out directly!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Direct Contact Cards */}
          <div className="space-y-4">
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20about%20tiffin%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-50 hover:bg-green-100/80 border border-green-200 rounded-2xl p-6 flex items-center gap-4 transition-all shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl shrink-0">
                <FaWhatsapp />
              </div>
              <div>
                <h4 className="font-heading font-bold text-green-900 text-lg">WhatsApp Order & Chat</h4>
                <p className="text-xs text-green-700 mt-0.5">Fastest response! Tap to open WhatsApp</p>
                <p className="text-sm font-bold text-green-800 mt-1">+91 98765 43210</p>
              </div>
            </a>

            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-saffron-500 text-lg mt-1 shrink-0" />
                <div>
                  <h5 className="font-heading font-semibold text-warm-gray-900 text-sm">Kitchen Location</h5>
                  <p className="text-xs text-warm-gray-500 mt-0.5">Sector 35E, Kharghar, Navi Mumbai, Maharashtra 410210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-saffron-500 text-lg mt-1 shrink-0" />
                <div>
                  <h5 className="font-heading font-semibold text-warm-gray-900 text-sm">Operating Hours</h5>
                  <p className="text-xs text-warm-gray-500 mt-0.5">Mon - Sat: 9:00 AM - 9:00 PM (Sunday Closed)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-saffron-500 text-lg mt-1 shrink-0" />
                <div>
                  <h5 className="font-heading font-semibold text-warm-gray-900 text-sm">Email Inquiry</h5>
                  <p className="text-xs text-warm-gray-500 mt-0.5">hello@archanaszaika.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-warm-gray-900">Send us a Message</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Message / Inquiry</label>
                <textarea
                  rows={4}
                  placeholder="Ask about weekly menu, party orders, or customized food..."
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => alert('Message sent! Archana aunty will contact you soon.')}
                className="w-full py-3 gradient-saffron text-white font-semibold rounded-xl text-sm shadow-md hover:opacity-95 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
