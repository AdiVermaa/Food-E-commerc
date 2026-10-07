import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Archana's Zaika | Authentic Bihari Ghar Ka Khana | Kharghar",
  description:
    "Homemade Bihari tiffin service in Kharghar, Navi Mumbai. Fresh, healthy, and delicious daily tiffin for college students and working professionals. Subscribe to weekly & monthly plans.",
  keywords: "tiffin service kharghar, bihari food navi mumbai, home cooked meals, tiffin delivery, archana zaika",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#FFFBEB',
                  color: '#1C1917',
                  border: '1px solid #FDE68A',
                  fontFamily: 'Inter, sans-serif',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#FFFBEB',
                  },
                },
              }}
            />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
