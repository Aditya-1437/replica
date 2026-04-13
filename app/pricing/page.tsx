import { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: "Replica | Pricing",
  description: "Simple, transparent pricing for mastering your next interview.",
};

export default function PricingPage() {
  return <PricingContent />;
}
