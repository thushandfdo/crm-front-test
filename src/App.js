import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Customers from './pages/Customers';
import Test from './test/Test';
import Feedback from './pages/Feedback';
import Newsletters from './pages/Newsletters';
import Users from './pages/Users';
import Home from './pages/Home';
import EndUsers from './pages/EndUsers';

import store from './store/_storeConfig';
import { loadProjects } from './store/projectHandle';
import { loadUsers } from './store/userHandle';
import { loadCustomers } from './store/customerHandle';
import { useEffect } from 'react';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#0069d9'
        }
    }
});

function App() {
    useEffect(() => {
        store.dispatch(loadCustomers());
        store.dispatch(loadUsers());
        store.dispatch(loadProjects());
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Layout>
                        <Routes>
                            {/* <Route element={ <Layout /> }> */}
                                <Route path='/' element={<Home />} />
                                <Route path='/projects' element={<Projects />} />
                                <Route path='/customers' element={<Customers />} />
                                <Route path='/users' element={<Users />} />
                                <Route path='/end-users' element={<EndUsers />} />
                                <Route path='/feedbacks' element={<Feedback />} />
                                <Route path='/newsletters' element={<Newsletters />} />
                            {/* </Route> */}
                            <Route path='/test' element={<Test />} />
                        </Routes>
                    </Layout>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
