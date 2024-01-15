import { create } from "zustand";
import { persist, devtools} from "zustand/middleware";

export type Notes = {
  id: string,
  text:string
}
export type Hashtags = {
  id:string,
  value:string,
  checked?:boolean
}

type NoteType = {
  notes: Notes[],
  hashtags: Hashtags[],
  addNote: (newNote:{ id: string, text:string} ) => void,
  removeNote: (id:string) => void
  updateNote:(id: string, editNote:string) => void,
  addHashtag:(newHashtag:{id: string, value:string}) => void
}

export const useNote = create<NoteType>()(
  devtools(
    persist((set, get) => ({
      notes: [],
      hashtags: [],

      addNote: (newNote) => {
        set( {notes: [ ...get().notes , newNote] })
      },

      removeNote: (id) => {
        set( {notes: get().notes.filter(note => note.id !== id) } )
        set( {hashtags: get().hashtags.filter(hash => hash.id !== id) } )
      },

      updateNote:(id, editNote) => {
        // update note
        set({notes: get().notes.map(note => {
          if(note.id === id) {
            return {...note, text:editNote}
          }
          else return note
        })
      })
      // update hashtags
      const hash = editNote.match(/#\w+/g)?.join(' ')
        set({ hashtags: get().hashtags.map(item => {
          if(hash){
            if(item.id === id && item.value !== hash) return {...item, value:hash }
            else if(item.id === id && item.value.length === 0) return {...item}
            else return item
          }
          else return {...item, value:""}
          
        } 
        )})

      },
      addHashtag:(newHashtag) => {
        const isExit = get().hashtags.some(item => item.value === newHashtag.value )
        if(!isExit) {
          set({hashtags: [...get().hashtags, newHashtag ]}) 
        }
        else set({hashtags: [...get().hashtags]})
      }

    }),
    {name: "notes"})
))

