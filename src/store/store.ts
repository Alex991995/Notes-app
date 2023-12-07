import { create } from "zustand";
import { persist} from "zustand/middleware";

type Notes = {
  id: string,
  text:string
}

type NoteType = {
  notes: Notes[],
  addNote: (newNote:{ id: string, text:string} ) => void
}

export const useNote = create<NoteType>()(
  persist((set, get) => ({

    notes: [],
    addNote: (newNote) => {
      set( {notes: [ ...get().notes , newNote] })
    },

    }),
    {name: "any"}
  ));


