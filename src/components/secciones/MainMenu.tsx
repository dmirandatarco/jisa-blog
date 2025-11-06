"use client";

import MenuHeader from "./MenuHeader";

type Props = { menuOpen: boolean; menu?: any[] };

export default function MainMenu({ menuOpen, menu = [] }: Props) {
  return (
    <div className={`flex flex-col md:flex-row md:bg-JisaCyan bg-JisaCyan text-white md:text-white w-full transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden md:flex"}`}>
      <div className="w-full max-w-7xl mx-auto">
        <nav className="text-gray-900">
          <div className="container mx-auto flex md:flex-row flex-col md:justify-center justify-start uppercase">
            <MenuHeader menu={menu} />
          </div>
        </nav>
      </div>
    </div>
  );
}
