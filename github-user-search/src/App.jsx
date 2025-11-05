import './App.css';
import Search from './components/Search';

function App() {

  return (
    <>
      <div className="min-h-screen  text-[#f8f9fa] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-[#6c757d]">
          Search GitHub Like a Pro!
        </h1>
        <Search />
      </div>
    </>
  );
}

export default App;