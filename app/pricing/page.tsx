import { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: "Replica | Simple, Transparent Plans & Pricing",
  description: "Invest in your career growth with camera-free AI interview simulations. Clear plans for individuals, senior engineers, and engineering teams.",
};

export default function PricingPage() {
  return <PricingContent />;
}
