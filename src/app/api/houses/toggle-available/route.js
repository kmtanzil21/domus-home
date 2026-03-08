// src/app/api/houses/toggle-available/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, available } = await request.json();

    const collection = await dbConnect('houses');

    // Make sure the house belongs to this user
    const house = await collection.findOne({ _id: new ObjectId(id) });

    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }

    if (house.owner?.email !== session.user.email) {
      return NextResponse.json({ error: 'Not authorized to edit this listing' }, { status: 403 });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { available: !available } }
    );

    return NextResponse.json({
      message:   `Listing marked as ${!available ? 'available' : 'unavailable'}`,
      available: !available,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}