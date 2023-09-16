import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import "index.css";

import { Provider } from "react-redux";
import store from "store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />

    </QueryClientProvider>
  </Provider>
);
