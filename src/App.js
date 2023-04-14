import { useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "./convex/_generated/react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

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

function QuoteCard({ quote }) {
  const { user } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const deleteQuote = useMutation("deleteQuote");
  const likeQuote = useMutation("likeQuote");

  const matchId = (id) => {
    return user && id && id.endsWith(user.id);
  };
  const liked = (quote.likes ?? []).some(matchId);

  return (
    <div className="quote">
      <p>
        {quote.quote} &mdash; {quote.attributedTo}
      </p>
      {(quote.likes ?? []).length}
      <button
        onClick={() => likeQuote({ quoteId: quote._id })}
        disabled={!isAuthenticated}
      >
        {liked ? "liked" : "like"}
      </button>
      {matchId(quote.contributor) ? (
        <button onClick={() => deleteQuote({ quoteId: quote._id })}>
          delete
        </button>
      ) : null}
    </div>
  );
}

function QuoteList() {
  const [filter, setFilter] = useState("");
  const quotes = useQuery("getQuotes", { filter }) ?? [];
  return (
    <div>
      <p>
        Filter{" "}
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </p>
      {quotes.map((quote) => (
        <QuoteCard key={quote._id.toString()} quote={quote} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Authenticated>
        <UserButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <h1>Quotable</h1>
      <a href="https://discord.com/api/oauth2/authorize?client_id=1096229575995965552&permissions=2048&scope=applications.commands%20bot">
        Install the Discord bot
      </a>
      <Authenticated>
        <AddQuote />
      </Authenticated>
      <QuoteList />
    </div>
  );
}

export default App;
