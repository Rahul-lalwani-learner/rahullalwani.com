import { NavBar } from "./components/Navbar";

export default function Home() {
  
  return (
    <div className="flex justify-center min-h-screen transition-all duration-100 dark:bg-background-black bg-white">
      <div className="w-3xl"><NavBar height="h-24"/></div>
    </div>
  );
}
