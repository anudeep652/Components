import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Batch from "./pages/Batches";
import CreateBatch from "./pages/CreateBatch";
import EditProcess from "./pages/EditProcess";
import Process from "./pages/Process";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  let user = useSelector((state) => state.components?.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/:name/:batchName/process"
            element={user ? <Process /> : <Login />}
          />
          <Route
            path="/component/create"
            element={user ? <CreatePage /> : <Login />}
          />
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/:name/batches" element={user ? <Batch /> : <Login />} />
          <Route
            path="/:name/create-batch"
            element={user ? <CreateBatch /> : <Login />}
          />
          <Route
            path="/:name/:batchName/edit-process"
            element={user ? <EditProcess /> : <Login />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
