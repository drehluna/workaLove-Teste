import './App.css';
import Chat from './components/chat';
import TopBar from './components/topBar';
import { StarRatingProvider } from './context/starRatingContext';

function App() {
  return (
    <div className="Container">
        <TopBar/>
        <StarRatingProvider>
        <Chat/>
        </StarRatingProvider>
    </div>
  );
}

export default App;
