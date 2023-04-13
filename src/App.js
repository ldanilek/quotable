import { useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "./convex/_generated/react";

function AddQuote() {
  const [addingQuote, setAddingQuote] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [attrText, setAttrText] = useState("");
  const saveQuote = useMutation("addQuote");
  const done = () => {
    setAddingQuote(false);
    setQuoteText("");
    setAttrText("");
  };

  return (
    <div>
      {addingQuote ? (
        <div className="quote">
          <textarea
            placeholder="paste quote here"
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="attributed to (author)"
            value={attrText}
            onChange={(e) => setAttrText(e.target.value)}
          ></input>
          <button
            onClick={async () => {
              await saveQuote({ quote: quoteText, attributedTo: attrText });
              done();
            }}
          >
            save
          </button>
          <button onClick={done}>cancel</button>
        </div>
      ) : (
        <button
          onClick={() => {
            setAddingQuote(true);
            setQuoteText("");
          }}
        >
          Add Quote
        </button>
      )}
    </div>
  );
}

function App() {
  const tasks = useQuery("getQuotes") ?? [];
  return (
    <div className="App">
      <h1>Quotable</h1>
      <AddQuote />
      <div>
        {tasks.map((task) => (
          <div key={task._id.toString()} className="quote">
            {task.quote} &mdash; {task.attributedTo}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
