// src/lib/houses.js
import { dbConnect } from './dbConnect';
import { ObjectId } from 'mongodb';

// Get all houses — no owner info
export async function getAll() {
  const collection = dbConnect('houses');
  const houses = await collection
    .find({})
    .project({
      title: 1,
      description: 1,
      location: 1,
      division: 1,
      price: 1,
      period: 1,
      beds: 1,
      baths: 1,
      sqft: 1,
      type: 1,
      tag: 1,
      available: 1,
      image: 1,
    })
    .toArray();

  return houses.map((h) => ({ ...h, _id: h._id.toString() }));
}

// Get single house WITHOUT owner info (not logged in)
export async function get(id) {
  try {
    const collection = dbConnect('houses');
    const house = await collection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          'owner.name': 0,
          'owner.phone': 0,
          'owner.email': 0,
        },
      }
    );
    if (!house) return null;
    return { ...house, _id: house._id.toString() };
  } catch {
    return null;
  }
}

// Get single house WITH owner info (logged in)
export async function getWithOwner(id) {
  try {
    const collection = dbConnect('houses');
    const house = await collection.findOne({ _id: new ObjectId(id) });
    if (!house) return null;
    return { ...house, _id: house._id.toString() };
  } catch {
    return null;
  }
}