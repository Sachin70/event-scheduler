import Calendar from "@components/Calender";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Event Scheduler</h1>
      <Calendar />
    </main>
  );
}
