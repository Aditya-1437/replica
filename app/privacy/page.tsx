import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: "Replica | Privacy Policy",
  description: "Learn how we protect your information and prioritize your privacy.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
