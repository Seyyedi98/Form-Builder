import Navbar from "@/app/_components/navbar/Navbar";
import Logo from "@/app/_components/ui/global/Logo";
import ThemeSwitcher from "@/app/_components/ui/global/ThemeSwitcher";

const layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h=[60px] px-4 py-2 items-center">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex  p-4 w-full flex-grow">{children}</main>
    </div>
  );
};

export default layout;
