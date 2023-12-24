import { useEffect, useState } from "react";
import { useNote } from "../store/store";
import Form from "./Form";


function Main() {
  const { notes, hashtags, updateNote} = useNote( ({notes, hashtags, updateNote}) => ({notes, hashtags, updateNote}) );

  const [stateNotes , setNotes] = useState(notes)
  const [stateHashtags, setHashtags] =  useState(hashtags.map(item =>  ({...item, checked:false})))
  const [checkedItem, setCheckedItem] = useState(stateHashtags.map(item => item.checked));


  // create state with notes and hashtags add every hashtag add checked with boolean 
  useEffect( ()=>{
    setNotes(notes)
    setHashtags(hashtags.map(item =>  ({...item, checked:false})))
  },[notes])

  function handleChange(id:string) {
    setHashtags( prevHash => 
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
    const isCheckedOne = checkedItem.some(item => item)
   
    setNotes( prevNote => 
      prevNote.filter((note,index) => {
        if(isCheckedOne) {
          const isHashChecked = stateHashtags[index++].checked
          const matchingHash = stateHashtags.find(hash => hash.id === note.id)
         
          return isHashChecked && matchingHash
        }
        else  return true
          
      })
  )

  },[checkedItem, stateHashtags])

  return (
    <main >
      <div className="flex items-center mx-6">
      <Form />

      <ul>
      {stateHashtags && 
      stateHashtags.map( (hashtag, index) => (
        <li key={index}>
          <label ><input type="checkbox" 
          checked={hashtag.checked !== undefined &&  hashtag.checked } 
          onChange={() =>handleChange(hashtag.id)}
          />{hashtag.value}</label>
        </li>
        
      ))
      }

    </ul>

      {/* <Filter stateHashtags={stateHashtags} setStateHashtags={setStateHashtags}/> */}
      </div>
      <ul className="min-h-[100px] flex">
        {hashtags && 
          hashtags?.map((hashtag, index) => (
            <li key={index}
            className="mr-3"
            >{hashtag.value}</li>
          ))
        }
      </ul>
      <ul className="gallery gap-3 mt-4">
      {stateNotes &&
        stateNotes?.map(item => (
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


