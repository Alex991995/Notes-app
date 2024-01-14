import { useEffect, useState } from "react";
import { Notes, useNote } from "../store/store";
import Form from "./Form";


function Main() {
  const { notes, hashtags, updateNote} = useNote( ({notes, hashtags, updateNote}) => ({notes, hashtags, updateNote}) );

  const [currentNote , setCurrentNote] = useState<Notes[]>()
  //It creates state with present hashtags and add new value checked:false
  const [stateHashtags, setStateHashtags] =  useState(hashtags.map(item =>  ({...item, checked:false})))
  // that for listen useEffect which is filtering 
  const [checkedItem, setCheckedItem] = useState(stateHashtags.map(item => item.checked));

  // It adds hashtags to stateHashtags after creating new note
  useEffect( ()=>{
    setStateHashtags(hashtags.map(item =>  ({...item, checked:false})))
  },[notes])

  function handleChange(id:string) {
    setStateHashtags( prevHash => 
      prevHash.map(item => {
        if(item.id === id ){
          return {...item, checked:!item.checked } 
        }
        else return item
    })
  )}

  useEffect( ()=> {
    setCheckedItem(stateHashtags.map(item => item.checked))
  },[stateHashtags])

  useEffect( () => {
    const isOneChecked = checkedItem.some(item => item)
    const filterNote = notes.filter(note => {
      if(isOneChecked) {
        const hashOfNote = note.text.match(/(#[a-z0-9-_]+)/g)?.join('')
        return stateHashtags.some( hash => hash.value === hashOfNote && hash.checked)
       }
      else  return true
    })
    setCurrentNote(filterNote)
  },[checkedItem, stateHashtags])

  return (
    <main >
      <div className="flex items-center justify-center mx-6">
        <Form />
        <ul>
        {stateHashtags?.map( (hashtag, index) => (
          <li key={index}>
            <label ><input type="checkbox" 
            checked={hashtag.checked !== undefined &&  hashtag.checked } 
            onChange={() =>handleChange(hashtag.id)}
            />{hashtag.value}</label>
          </li>
          ))}
        </ul>
      </div>
    
      <ul className="min-h-[100px] flex justify-center">
        {hashtags?.map((hashtag, index) => (
            <li key={index}
            className="mr-3"
            >{hashtag.value}</li>
          ))
        }
      </ul>

      <ul className="gallery gap-3 mt-4">
      {currentNote?.map(item => (
          <li
          className="note-item"
          key={item.id}>
            <textarea
            autoFocus
            className="bg-transparent outline-none text-transparent w-full h-full caret-black break-words"
            value={item.text}
            onChange={(e) => updateNote(item.id, e.target.value)}
            />
            <div className="absolute top-0 left-0 break-words whitespace-pre-line w-full h-full -z-10 bg-emerald-400"
            dangerouslySetInnerHTML={{ __html: item.text.replace(/(#[a-z0-9-_]+)/g, '<span class="text-red-600">$1</span>') } }></div>
            </li>
        )) 
      }
      </ul>
    </main>
  );
}

export default Main;


