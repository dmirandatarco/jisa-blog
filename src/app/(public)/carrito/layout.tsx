import Script from "next/script";
export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="openpay-core" src="https://js.openpay.pe/openpay.v1.min.js" strategy="afterInteractive" />
      <Script id="openpay-device" src="https://js.openpay.pe/openpay-data.v1.min.js" strategy="afterInteractive" />
    </>
  );
}