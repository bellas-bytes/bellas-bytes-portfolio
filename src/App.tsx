import { Analytics } from "@vercel/analytics/react";
import ReceiptPortfolio from "./components/ReceiptPortfolio";

export default function App() {
  return (
    <>
      <ReceiptPortfolio />
      <Analytics />
    </>
  );
}
