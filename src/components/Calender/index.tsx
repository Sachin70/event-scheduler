"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import EventForm from "@components/EventForm";
import EventList from "@components/EventList";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useEventStore } from "@store/eventStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { events } = useEventStore();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 }),
  });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          Previous
        </button>
        <motion.h2
          key={currentDate.toISOString()}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          {format(currentDate, "MMMM yyyy")}
        </motion.h2>
        <button
          onClick={nextMonth}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          Next
        </button>
      </div>
      <motion.div
        className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-7"} gap-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {!isMobile &&
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-gray-400 uppercase tracking-wider text-sm"
            >
              {day}
            </div>
          ))}
        <AnimatePresence>
          {daysInMonth.map((day, index) => (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.01 }}
              className={`p-4 rounded-xl ${
                isSameMonth(day, currentDate)
                  ? "bg-gray-800 text-white"
                  : "bg-gray-700 text-gray-400"
              } ${
                isSameDay(day, selectedDate || new Date())
                  ? "border-2 border-purple-500 shadow-lg"
                  : "hover:border-gray-600"
              } cursor-pointer transition-all duration-300`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-lg font-bold">{format(day, "d")}</div>
              {events.filter((event) => isSameDay(new Date(event.date), day))
                .length > 0 && (
                <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-2 animate-pulse"></div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 bg-gray-900 bg-opacity-50 p-6 rounded-xl shadow-xl"
        >
          <EventForm date={selectedDate} />
          <EventList date={selectedDate} />
        </motion.div>
      )}
    </div>
  );
}
