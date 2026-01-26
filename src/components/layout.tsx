import { type PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="bg-linear-to-br from-background to-muted">
        <Header />
        <main className="min-h-screen container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {children}
        </main>
        <footer className="border-t backdrop-blur py-8 sm:py-12 supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto px-4 text-center text-gray-700">
            <p className="text-sm sm:text-base">Made by Hajime</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
