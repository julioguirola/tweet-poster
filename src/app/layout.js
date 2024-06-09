import "./globals.css";

export const metadata = {
  title: "Twitter Poster",
  description: "Herramienta para publicar contenido en Twitter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
