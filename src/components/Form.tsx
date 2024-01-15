import { useRef, useState } from 'react'
import { useNote } from '../store/store'
import { nanoid } from 'nanoid';

function Form() {
  const [value, setValue] = useState('');
  const textareraRef = useRef<HTMLTextAreaElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const { addNote, addHashtag } = useNote( ({addNote, addHashtag}) => ({addNote, addHashtag}) );

  function handelTextarea(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value.replace(/(#[a-z0-9-_]+)/g, '<span class="text-red-600">$1</span>'))
  }
  
  function handelAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newId = nanoid()
    const newHash = value.match(/(#[a-z0-9-_]+)/g)?.join('')
    if(newHash){
      const objHash = {id:newId, value: newHash }
      addHashtag(objHash)
    }
    if(textareraRef.current !== null && textareraRef.current.value && divRef.current ) {
      const valueFromTextarera = textareraRef.current.value
      const newNote = {id: newId, text:valueFromTextarera }
      addNote(newNote)
      textareraRef.current.value = ""
      divRef.current.textContent = ""
    }
    else return false 
  }

  return (
    <form className='flex flex-col m-3 max-w-[30rem] w-full' onSubmit={handelAddNote} >
        <div className='relative' >
          <textarea
          placeholder='Type here...' 
          className='text-transparent bg-transparent caret-black w-full  h-[20rem] border border-slate-700 outline-none break-words' ref={textareraRef}
          onChange={handelTextarea}></textarea>
          <div 
          className='absolute top-0 left-0 w-full  h-[20rem] -z-10 break-words whitespace-pre-line' 
          ref={divRef}  dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
        <button className='rounded-md p-3 bg-green-500 hover:bg-green-600 transition-colors w-full'>Button</button>
      </form>
  );
}

export default Form;