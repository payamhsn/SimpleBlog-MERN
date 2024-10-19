import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="bg-bgPrimary min-h-screen flex flex-col">
        <nav>Navbar</nav>
        <div className="flex-grow">
          <Outlet />
        </div>
        <footer className="mt-auto">Footer</footer>
      </div>
    </>
  );
}

export default App;
