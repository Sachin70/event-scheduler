import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Event {
  id: string;
  date: string;
  description: string;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
    }),
    {
      name: "event-storage",
    }
  )
);
