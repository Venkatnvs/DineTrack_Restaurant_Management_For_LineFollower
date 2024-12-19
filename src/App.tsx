import { MenuBar } from '@/components/MenuBar';
import { TableGrid } from '@/components/TableGrid';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-orange-600">
            DineTrack (<small>Restaurant Manager</small>)
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Menu Items</h2>
          <MenuBar />
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Table Status</h2>
          <TableGrid />
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-900 shadow-lg p-4 mt-8 border-t border-gray-300 dark:border-gray-800">
        <div className="container mx-auto">
          <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400">
            &copy; 2024 Ms Innovations All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;