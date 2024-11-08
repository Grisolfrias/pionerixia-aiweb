import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Courses from './components/Courses';
import InstagramBot from './components/InstagramBot';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Story />
            <Courses />
            <InstagramBot />
            <Footer />
        </div>
    );
}

export default App;
