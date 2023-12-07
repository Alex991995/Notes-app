import { useNote } from "../store/store";
import Form from "./Form";

function Main() {
  const { notes } = useNote( ({notes}) => ({notes}) );

  return (
    <main className="flex justify-center mx-6">
      <Form />
      <ul>
      {notes &&
        notes?.map(item => (
          <li key={item.id}>{item.text}</li>
        )) 
      }
      </ul>
    </main>
  );
}

export default Main;