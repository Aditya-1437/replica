import { Metadata } from 'next';
import AccountContent from './AccountContent';

export const metadata: Metadata = {
  title: "Replica | Candidate Workspace & Performance Analytics",
  description: "Track your interview metrics, score progression, STAR alignment telemetry, AI diagnostic coaching, and manage your account & subscription.",
};

export default function AccountPage() {
  return <AccountContent />;
}
