import { Metadata } from 'next';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: "Replica | Support",
  description: "Get the help you need to master your journey with Replica.",
};

export default function SupportPage() {
  return <SupportContent />;
}
