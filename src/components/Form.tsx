
import { useRef, useState } from 'react'
import { useNote } from '../store/store'
import { nanoid } from 'nanoid';

function Form() {

  const [value, setValue] = useState('');
  const [hashtag, setHashtag] = useState<RegExpMatchArray | null>();
  const textareraRef = useRef<HTMLTextAreaElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { addNote } = useNote( ({addNote}) => ({addNote}) );

  function handelTextarea(e:React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(hashtag)
    setHashtag(value.match(/(#[a-z0-9-_]+)/g) )
    setValue(e.target.value.replace(/(#[a-z0-9-_]+)/g, '<span class="text-red-600">$1</span>'))
  }

  function handelAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(textareraRef.current !== null && textareraRef.current.value && ref.current ) {
      const valueFromTextarera = textareraRef.current.value
      const newNote = {id: nanoid(), text:valueFromTextarera }
      addNote(newNote)

      console.log(ref.current?.textContent)
      ref.current.textContent = ""
      setValue('')
    }
    else return false 
  }

  return (
    <form className='flex flex-col' onSubmit={handelAddNote} >
        <div className='relative inline-block' >
          <textarea
          placeholder='Type here...' 
          className='text-transparent bg-transparent caret-black w-[30rem] h-[20rem] border border-slate-700 outline-none' ref={textareraRef}
          onChange={handelTextarea}></textarea>
          <div className='absolute top-0 left-0 w-[30rem] h-[20rem] -z-10 ' ref={ref}  dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
        <button className='rounded-md p-3 bg-green-500 hover:bg-green-600 transition-colors'>Button</button>
      </form>
  );
}

export default Form;