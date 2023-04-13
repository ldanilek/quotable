import "./App.css";
import { useQuery } from "./convex/_generated/react";

function App() {
  const tasks = useQuery("getQuotes") ?? [];
  return (
    <div className="App">
      <h1>Quotable</h1>
      <div>
        {tasks.map((task) => (
          <div key={task._id.toString()} className="quote">
            {task.quote}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
