import { Footer } from "./components/Footer";
import { NavBar } from "./components/Navbar";

export default function Home() {
  
  return (
    <div className="min-h-screen transition-all duration-100 dark:bg-background-black bg-white">
      <NavBar height="h-24"/>
      <div className="py-16 max-w-3xl px-4 m-auto">
        <div className="text-black dark:text-white text-4xl font-bold mb-8">
          Welcome to My Portfolio
        </div>
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <p className="text-lg">
            This is a demo page to showcase the backdrop blur effect on the navbar.
          </p>
          <p>
            Scroll down to see how the navbar creates a beautiful blurred background effect
            while maintaining readability of the navigation items.
          </p>
          <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Beautiful Background</h2>
              <p className="text-gray-600 dark:text-gray-400">
                This colorful background will show through the blurred navbar when you scroll up
              </p>
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-green-100 to-yellow-100 dark:from-green-900 dark:to-yellow-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Another Section</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Keep scrolling to see the blur effect in action
              </p>
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Final Section</h2>
              <p className="text-gray-600 dark:text-gray-400">
                The navbar should now have a beautiful backdrop blur effect
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
