import { TrashIcon } from "@heroicons/react/16/solid"
import { Notes, useNote } from "../store/store"

type DisplayNotesProps = {
  currentNote: Notes[] | undefined,
  updateNote: (id: string, editNote: string) => void
}

export default function DisplayNotes({currentNote, updateNote}:DisplayNotesProps) {
  const {removeNote} = useNote(({removeNote}) => ({removeNote}))
  return (
    <ul className="gallery gap-3 m-4">
      {currentNote?.length === 0 ? <h1 className="text-center text-xl">
        Create hashtag type #yourHash.
        <br/>And you always find your note
        <br/>for example...
        <br/>I wanna go to <span className="text-red-600">#shop</span> tomorrow</h1>  :
      currentNote?.map(item => (
        <li
        className="note-item relative"
        key={item.id}>
          <textarea
          autoFocus
          className="bg-transparent outline-none text-transparent w-full h-full caret-black break-words"
          value={item.text}
          onChange={(e) => updateNote(item.id, e.target.value)}
          />
          <div className="absolute top-0 left-0 break-words whitespace-pre-line w-full h-full -z-10 bg-emerald-400"
          dangerouslySetInnerHTML={{ __html: item.text.replace(/(#[a-z-а-я--0-9-_]+)/g, '<span class="text-red-600">$1</span>') } }></div>
          <TrashIcon  
          onClick={() =>removeNote(item.id)}
          className="h-6 w-6 absolute right-2 top-2"/>
          </li>
        )) 
      }
      </ul>
  )
}
