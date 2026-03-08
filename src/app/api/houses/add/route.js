// src/app/api/houses/add/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const {
      title, description, location, division,
      price, currency, period, beds, baths, sqft,
      type, tag, available, image, images,
    } = body;

    // Basic validation
    if (!title || !description || !location || !division || !price || !image) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    const collection = await dbConnect('houses');

    const newHouse = {
      title:       title.trim(),
      description: description.trim(),
      location:    location.trim(),
      division,
      price:       Number(price),
      currency:    currency || 'BDT',
      period:      period   || 'month',
      beds:        Number(beds)  || 1,
      baths:       Number(baths) || 1,
      sqft:        Number(sqft)  || 0,
      type,
      tag:         tag || '',
      available:   available !== false,
      image,
      images:      images || [],
      owner: {
        name:  session.user.name,
        email: session.user.email,
        phone: body.phone || '',
      },
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newHouse);

    return NextResponse.json(
      { message: 'House listed successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}