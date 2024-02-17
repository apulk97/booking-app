import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Search />
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
