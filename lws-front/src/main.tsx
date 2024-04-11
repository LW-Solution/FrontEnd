import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./router"

import "../src/assets/scss/styles.scss";
import "bootstrap";

const router = createBrowserRouter(routes);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);