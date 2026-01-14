import { Link } from "react-router-dom";
import { useTheme } from "./provider/theme-provider";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 
    supports-[backdrop-filter]:bg-background/60 flex items-center justify-between"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            className="h-20 px-5"
            src={
              theme === "light" ? "/weather-light1.png" : "/weather-dark.png"
            }
          />
        </Link>
      </div>
      <div className="px-14">
        <div
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`cursor-pointer flex items-center transition-transform duration-500
          ${isDark ? "rotate-180" : "rotate-0"} `}
        >
          {isDark ? (
            <Sun className="h-8 w-8 text-yellow-600 rotate-0 transition-all" />
          ) : (
            <Moon className="h-8 w-8 text-cyan-600 rotate-0 transition-all" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
