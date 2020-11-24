import "./App.css";

// component
import Sidebar from "./components/Sidebar/Sidebar.js";
import Shipments from "./components/Shipments/Shipments";

function App() {
  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <Shipments />
      </div>
    </>
  );
}

export default App;
