import { Link } from "react-router-dom";
import { useTheme } from "./provider/theme-provider";
import { Moon, Sun } from "lucide-react";
import { CitySearch } from "./city-search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 
    supports-backdrop-filter:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        <Link to={"/"} className="flex-shrink-0">
          <img
            className="h-14 sm:h-16 md:h-20 px-2 sm:px-5"
            src={
              theme === "light" ? "/weather-light1.png" : "/weather-dark.png"
            }
            alt="Weather App Logo"
          />
        </Link>

        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="w-full sm:w-auto">
            <CitySearch />
          </div>
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`cursor-pointer flex items-center transition-transform duration-500 flex-shrink-0
            ${isDark ? "rotate-180" : "rotate-0"} `}
          >
            {isDark ? (
              <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-600 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
