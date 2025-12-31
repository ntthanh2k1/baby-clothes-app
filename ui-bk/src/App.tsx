import { RouterProvider } from "react-router";
import router from "./routes/router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
