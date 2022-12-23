import "./css/App.css";
import TodoMain from "./comps/TodoMain";

function App() {
  return (
    <div className="App">
      <header>
        <h1>오늘할 일</h1>
      </header>
      <TodoMain />
    </div>
  );
}

export default App;
