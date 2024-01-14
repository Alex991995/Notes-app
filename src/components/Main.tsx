import { useEffect, useState } from "react";
import { Notes, useNote } from "../store/store";
import Form from "./Form";
import Filter from "./Filter";
import DisplayNotes from "./DisplayNotes";
import AllHashtags from "./AllHashtags";


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
      <div className="flex items-center justify-center mx-6 flex-col sm:flex-row">
        <Form />
        <Filter stateHashtags={stateHashtags} handleChange={handleChange}/>
      </div>
      <AllHashtags hashtags={hashtags}/>
      <DisplayNotes  currentNote={currentNote} updateNote={updateNote}/>
    </main>
  );
}

export default Main;


