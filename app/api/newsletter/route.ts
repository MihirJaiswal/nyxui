import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await addDoc(collection(db, "newsletter"), {
      email,
      subscribedAt: new Date(),
      isActive: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding email:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
