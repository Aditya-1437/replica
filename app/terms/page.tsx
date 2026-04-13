import { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: "Replica | Terms of Service",
  description: "Read our terms of service to understand your rights and responsibilities when using Replica.",
};

export default function TermsPage() {
  return <TermsContent />;
}
