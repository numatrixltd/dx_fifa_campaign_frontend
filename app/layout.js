import "./globals.css";

export const metadata = {
  title: "Argentica — Wear your team's frame",
  description: "Pick your country, upload your photo, get a fan frame.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
