"use client";

import { useEventStore } from "@store/eventStore";
import { format, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface EventListProps {
  date: Date;
}

export default function EventList({ date }: EventListProps) {
  const { events, deleteEvent } = useEventStore();

  const eventsForDay = events.filter((event) =>
    isSameDay(new Date(event.date), date)
  );

  return (
    <ul className="mt-6 space-y-4">
      <AnimatePresence>
        {eventsForDay.length > 0 ? (
          eventsForDay.map((event) => {
            const eventTime = format(new Date(event.date), "hh:mm a");
            return (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg text-white"
              >
                <div>
                  <span className="block font-bold text-lg">
                    {event.description}
                  </span>
                  <span className="text-sm text-gray-400">{eventTime}</span>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[12px] transition-transform transform hover:scale-105"
                >
                  Delete
                </button>
              </motion.li>
            );
          })
        ) : (
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center text-gray-400"
          >
            No events for this day.
          </motion.li>
        )}
      </AnimatePresence>
    </ul>
  );
}
