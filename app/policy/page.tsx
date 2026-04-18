import Sidebar from '../components/Sidebar';
import policyData from '../../data/policy.json';
import Header from '../components/Header';
import PolicyContent from '../components/PolicyContent';

export const metadata = {
  title: 'Hopenity Consumer Health Data Policy',
  description:
    'Hopenity Consumer Health Data Privacy Policy - How we collect, use, and share consumer health data.',
};

export default function PolicyPage() {
  return (
    <div className="flex min-h-screen bg-black text-white antialias">
      {/* Header */}
      <Header />

      {/* Sidebar Navigation (Desktop) */}
      <Sidebar sections={(policyData.sections || []).map((s: any) => ({ id: s.id, title: s.title }))} />

      {/* Main Content */}
      <PolicyContent />
    </div>
  );
}
