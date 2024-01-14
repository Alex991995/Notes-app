
type FilterProps = {
  stateHashtags: valueOfHashtagsProps[]
  handleChange: (id:string) => void
}

type valueOfHashtagsProps = {
  checked: boolean;
  id: string;
  value: string;
}

export default function Filter({stateHashtags, handleChange}:FilterProps) {
  return (
    <ul className="flex gap-3 sm:block">
      {stateHashtags?.map( (hashtag, index) => (
        <li key={index}>
          <label ><input type="checkbox" 
          checked={hashtag.checked !== undefined &&  hashtag.checked } 
          onChange={() =>handleChange(hashtag.id)}
          />{hashtag.value}</label>
        </li>
      ))}
    </ul>
  )
}
