"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleReservation } from "@/app/actions";

export default function ReservationSystem() {
  // 1. 초기값을 함수로 지정하여 localStorage에서 직접 가져옵니다. (에러 근본 해결)
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("family-name") || "";
    }
    return "";
  });

  const [isRegistered, setIsRegistered] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("family-name");
    }
    return false;
  });

  // 이름 저장 함수
  const saveName = () => {
    if (userName.trim()) {
      localStorage.setItem("family-name", userName);
      setIsRegistered(true);
    }
  };

  // 로그아웃(이름 바꾸기) 함수
  const handleLogout = () => {
    localStorage.removeItem("family-name");
    setUserName("");
    setIsRegistered(false);
  };

  if (!isRegistered) {
    return (
      <div className="flex flex-col gap-4 p-10 border rounded-xl max-w-sm mx-auto mt-20 bg-white shadow-md">
        <h2 className="text-xl font-bold text-center">누구신가요?</h2>
        <Input
          placeholder="이름을 입력하세요 (예: 홍길동)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveName()}
        />
        <Button onClick={saveName} className="w-full">
          시작하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-lg">
          반가워요, <b>{userName}</b>님!
        </p>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 underline hover:text-gray-600"
        >
          이름 바꾸기
        </button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-10">
            새 예약하기
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>별장 예약하기</DialogTitle>
          </DialogHeader>
          <form action={handleReservation} className="grid gap-6 py-4">
            <input type="hidden" name="userName" value={userName} />
            <div className="grid gap-2">
              <label className="text-sm font-medium">시작 날짜</label>
              <Input name="startDate" type="date" required className="w-full" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">종료 날짜</label>
              <Input name="endDate" type="date" required className="w-full" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">메모 (선택)</label>
              <Input name="memo" placeholder="예: 할머니 생신, 친구 모임" />
            </div>
            <Button type="submit" className="w-full">
              예약 완료
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
