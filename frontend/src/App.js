import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Batch from "./pages/Batches";
import CreateBatch from "./pages/CreateBatch";
import EditProcess from "./pages/EditProcess";
import Process from "./pages/Process";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/:name/:batchName/process" element={<Process />} />
          <Route path="/component/create" element={<CreatePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/:name/batches" element={<Batch />} />
          <Route path="/:name/create-batch" element={<CreateBatch />} />
          <Route
            path="/:name/:batchName/edit-process"
            element={<EditProcess />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
