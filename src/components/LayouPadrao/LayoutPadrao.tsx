import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Sidebar/Sidebar";
import "../Sidebar/Sidebar.css";

export default function LayoutPadrao({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {children}
        <Toaster position="top-right" />
      </main>
    </div>
  );
}
