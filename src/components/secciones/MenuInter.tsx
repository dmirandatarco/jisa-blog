"use client";
import MenuHeader from "./MenuHeader";

export default function MenuInter({ menuOpen, menu = [] as any[] }: { menuOpen: boolean; menu?: any[]; dataGeneral?: any; }) {
  return (
    <div className={`${menuOpen ? "block" : "hidden md:flex"}`}>
      <div id="menubar" className="w-full bg-JisaCyan sticky top-0 z-[80]">
        <div className="mx-auto md:max-w-5xl px-2">
          <nav className="flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <MenuHeader menu={menu} />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}