import { useEffect, useRef } from "react";
import './App.css';

function App() {
  const searchInput = useRef(null);

  useEffect(()=>{
    searchInput.current.focus();  },
    [],
  )

  return (
    <div className="App">
      <header className="App-header">
        <input ref={searchInput} type="text" placeholder="Search" />
        <button>Search.</button>
      </header>
    </div>
  );
}

export default App;
