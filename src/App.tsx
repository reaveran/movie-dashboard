import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/modules/QueryProvider";
import router from "@/navigation/routes";

import { store } from "./store/store";

function App() {
  return (
    <QueryProvider>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </QueryProvider>
  );
}

export default App;
