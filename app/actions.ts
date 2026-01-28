"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleReservation(formData: FormData) {
  const userName = formData.get("userName") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const memo = formData.get("memo") as string;

  // 1. 이름으로 유저 찾기 (없으면 바로 생성)
  // upsert를 사용하면 "있으면 가져오고, 없으면 생성"을 한 번에 할 수 있습니다.
  const user = await db.user.upsert({
    where: { name: userName },
    update: {}, // 이미 있으면 업데이트할 내용은 없음
    create: { name: userName },
  });

  // 2. 예약 생성
  await db.reservation.create({
    data: {
      startDate,
      endDate,
      memo,
      userId: user.id,
    },
  });

  revalidatePath("/");
}
