import { create } from "zustand";

export const useFuzzieStore = create()((set) => ({
  googleFile: {},
  setGoogleFile: (googleFile) => set({ googleFile }),
  slackChannels: [],
  setSlackChannels: (slackChannels) => set({ slackChannels }),
  selectedSlackChannels: [],
  setSelectedSlackChannels: (selectedSlackChannels) =>
    set({ selectedSlackChannels }),
}));
