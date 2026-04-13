import { Metadata } from 'next';
import CookieContent from './CookieContent';

export const metadata: Metadata = {
  title: "Replica | Cookie Policy",
  description: "Understand how we use cookies to improve your interview preparation experience.",
};

export default function CookiePolicyPage() {
  return <CookieContent />;
}
