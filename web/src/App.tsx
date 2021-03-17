import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { SWRConfig } from "swr";

import Home from "./pages/Home";
import Payment from "./pages/Payment";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        throw err.response.data;
    }
};

function App() {
    let routes = (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/payment' exact component={Payment} />
            <Redirect to='/' />
        </Switch>
    );

    return (
        <SWRConfig value={{ fetcher, dedupingInterval: 10000 }}>
            <BrowserRouter>{routes}</BrowserRouter>
        </SWRConfig>
    );
}

export default App;
