import { Hashtags } from "../store/store";

type AllHashtagsProps = {
  hashtags:Hashtags[]
}


export default function AllHashtags({hashtags}:AllHashtagsProps) {
  return (
    <ul className="min-h-[100px] flex justify-center items-center">
      {hashtags?.map((hashtag, index) => (
          <li key={index}
          className="mr-3"
          >{hashtag.value}</li>
        ))
      }
    </ul>
  )
}
