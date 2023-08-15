import { RouterProvider } from "react-router-dom";
import { route } from "./Pages/Routes";
import ClientContextProvider from "./context/ClientContext";
import { Toaster } from "react-hot-toast";
import("preline");

function App() {
  return (
    <>
      <ClientContextProvider>
        <RouterProvider router={route} />
        <Toaster />
      </ClientContextProvider>
    </>
  );
}

export default App;
