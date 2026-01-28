import { db } from "@/lib/db";
import ReservationSystem from "@/components/ReservationSystem";

export default async function Home() {
  const reservations = await db.reservation.findMany({
    include: { user: true },
    orderBy: { startDate: "asc" },
  });

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-10">
        🏠 속초 별장 예약 현황
      </h1>

      <ReservationSystem />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          예약 리스트
        </h2>
        <div className="grid gap-3">
          {reservations.map((res: typeof reservations[0]) => (
            <div
              key={res.id}
              className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-bold">
                  {res.startDate.toLocaleDateString()} ~{" "}
                  {res.endDate.toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">{res.memo}</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {res.user.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
