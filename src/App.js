import Notes from './pages/Notes';
import Create from './pages/Create';
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Customers from './pages/Customers';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#0069d9'
        }
    }
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Notes />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/projects' element={<Projects />} />
                            <Route path='/customers' element={<Customers />} />
                        </Routes>
                    </Layout>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
