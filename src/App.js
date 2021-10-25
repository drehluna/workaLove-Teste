import './App.css';
import Chat from './components/chat';
import TopBar from './components/topBar';
import { StarRatingProvider } from './context/starRatingContext';

function App() {
  return (
    <div className="Container">
      <TopBar />
      <Chat />
    </div>
  );
}

export default App;
