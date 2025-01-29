import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<Home />} />
			<Route path="/about" element={<About />} />
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
