import prismadb from "@/lib/prismadb";

// export async function POST(req: Request) {
//   const { dateExpense, category, amount, comment } =
//     typeof req.body == "string" ? JSON.parse(req.body) : req.body;

//   try {
//     // we can access db records with prisma functions
//     const wish = await prismadb.expenses.create({
//       data: {
//         dateExpense,
//         category,
//         amount: parseInt(amount),
//         comment,
//       },
//     });

//     return NextResponse.json(wish);
//   } catch (error) {
//     console.log("BUDGET_ERROR", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

export async function GetBudget() {
  try {
    // console.log("=======================HIT WOI===========================");
    const list = await prismadb.expenses.findMany();
    return { data: list, status: 200 };
  } catch (error) {
    console.log("[BUDGET_ERROR]", error);
    return {
      status: 500,
      message: "[BUDGET_ERROR] Internal Error",
      error: error,
    };
  }
}

export async function SetBudget(values: any) {
  console.log({values})

  const res = await prismadb.expenses.create({
    data: {
      comment: values.comment,
      dateExpense: values.dateExpense,
      amount: values.amount,
      category: values.category,
      updateAt: new Date()
    },
  });

  return res;
}