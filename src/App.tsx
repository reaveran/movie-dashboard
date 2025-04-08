import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/modules/QueryProvider";
import router from "@/navigation/routes";

function App() {
  return (
    <QueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryProvider>
  );
}

export default App;
