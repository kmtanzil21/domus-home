// src/app/dashboard/my-listings/page.jsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMyHouses } from '@/lib/houses';
import MyListingsClient from '@/components/MyListingsClient';

export default async function MyListingsPage() {
  const session = await getServerSession(authOptions);
  const houses  = await getMyHouses(session.user.email);

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Dashboard</p>
        <h1 className="text-3xl font-black text-secondary">My Listings</h1>
        <p className="text-gray-400 text-sm mt-1">
          {houses.length} {houses.length === 1 ? 'property' : 'properties'} listed
        </p>
      </div>

      <MyListingsClient initialHouses={houses} />
    </div>
  );
}