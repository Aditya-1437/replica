import { Metadata } from 'next';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: "Replica | Support, Feedback & Candidate Assistance",
  description: "Direct candidate support, interactive platform rating & feedback, issue reporting with automated system diagnostics, and interview troubleshooting guides.",
};

export default function SupportPage() {
  return <SupportContent />;
}
