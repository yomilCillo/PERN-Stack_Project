import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
import ThemeSelector from "./themeSelector";

function navBar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  return (
    <div className="bg-base-100 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-60px justify-between">
          {/* Logo Section */}

          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl
                            bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  PERN STACK PROJECT
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-xs badge-primary indicator-item">
                    8
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default navBar;
