import './App.css';
import Sidebar from './components/Sidebar';
import Card from './components/Card';

function App() {
  return (
    <>
    <div className='flex-row ml-20'>
      <div className='flex-row'>
      <div className='text-5xl mt-20 ml-5 font-bold'>Do you want to add another place of attraction?</div>
      <Card/>
      </div>
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <Sidebar/>
    </div>
    </div>
    </>
  );
}

export default App;
