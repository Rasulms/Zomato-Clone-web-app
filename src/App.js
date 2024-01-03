import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageRoutes from './Routes/PageRoutes';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-tabs/style/react-tabs.css'

// import Container from 'react-bootstrap/Container';

function App() {

  return (
    <main>
      <PageRoutes />
    </main>

  );
}

export default App;
