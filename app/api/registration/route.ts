import { NextRequest, NextResponse } from "next/server";
import getMongoClientPromise from "@/lib/mongodb";

const DB_NAME = "malwa_chemical_conclave";
const COLLECTION = "registrations";

interface RegistrationBody {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  organization?: string;
  designation?: string;
  message?: string;
  totalAmount?: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: RegistrationBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, phone, category, organization, designation, message, totalAmount } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !category?.trim()) {
    return NextResponse.json(
      { error: "Name, email, phone, and category are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  try {
    const clientPromise = getMongoClientPromise();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection(COLLECTION).insertOne({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      category: category.trim(),
      organization: organization?.trim() ?? "",
      designation: designation?.trim() ?? "",
      totalAmount: totalAmount ?? 0,
      message: message?.trim() ?? "",
      submittedAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Registration submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your registration right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
