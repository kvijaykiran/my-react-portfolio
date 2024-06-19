import { add, format } from "date-fns"

function App() {
  return (
    <>
    Hello, there!
    <p>Today's date: {format(add(new Date(), { days: 0}), "do MMMM yyyy")}</p>
    <p>Tomorrow's date: {format(add(new Date(), { days: 1}), "do MMMM yyyy")}</p>
    </>
  )
}

export default App
