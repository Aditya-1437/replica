import { Metadata } from 'next';
import AccountContent from './AccountContent';

export const metadata: Metadata = {
  title: "Replica | My Dashboard",
  description: "Track your growth, view your metrics, and refine your interview presence.",
};

export default function AccountPage() {
  return <AccountContent />;
}
