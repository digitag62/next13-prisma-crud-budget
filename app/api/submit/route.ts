import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    const res = await prismadb.expenses.create({
        data: {
          comment: values.comment,
          dateExpense: values.dateExpense,
          amount: values.amount,
          category: values.category,
          updateAt: new Date()
        },
    });
    console.log(res)
    return new NextResponse("VAL", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("INTERNAL_ERROR", { status: 500 });
  }
}
