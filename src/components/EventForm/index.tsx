"use client";

import { useState } from "react";
import { useEventStore } from "@store/eventStore";
import { motion } from "framer-motion";

interface EventFormProps {
  date: Date;
}

export default function EventForm({ date }: EventFormProps) {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00");
  const addEvent = useEventStore((state) => state.addEvent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && time) {
      const eventDateTime = new Date(date);
      const [hours, minutes] = time.split(":").map(Number);
      eventDateTime.setHours(hours, minutes);

      addEvent({
        id: Date.now().toString(),
        date: eventDateTime.toISOString(),
        description,
      });

      setDescription("");
      setTime("12:00");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-700 p-4 rounded-xl shadow-lg mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter event description"
        className="flex-1 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-secondary placeholder-gray-300 text-sm p-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-secondary placeholder-gray-300 text-sm p-2"
      />
      <button
        type="submit"
        className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        Add Event
      </button>
    </motion.form>
  );
}
