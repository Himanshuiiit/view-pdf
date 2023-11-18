import "./App.css";
import MyApp from "./components/TestComp";

function App() {
  document.addEventListener("keydown", function (e) {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "s" || e.key === "S" || e.key === "I")
    ) {
      // alert("Saving the PDf is not allowed");
      e.preventDefault();
    }
  });

  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <MyApp />
    </div>
  );
}

export default App;
