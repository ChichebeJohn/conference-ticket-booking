import { BookingProvider } from "./context/BookingContext";
import "./globals.css";
import Header from "@/components/Header";


export async function generateMetadata() {
  return {
    title: "Ticket Booking",
    description: "A sample ticket booking application using Next.js 13",
    openGraph: {
      title: "Ticket Booking OG Title",
      description: "An advanced ticket booking application with Next.js 13",
      url: "https://yourdomain.com",
      siteName: "Ticket Booking",
      images: [
        {
          url: "https://yourdomain.com/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ticket Booking Twitter Title",
      description: "Advanced ticket booking application with Next.js 13",
      images: ["https://yourdomain.com/twitter-image.png"],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta viewport tag ensures proper scaling on all devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <BookingProvider>
          <Header />
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
