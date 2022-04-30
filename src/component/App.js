import React from "react";
import MainPage from "./MainPage";
import { Provider } from 'react-redux'
import {store} from "../redux/store";

function App() {
    return (
        <Provider store={store}>
            <MainPage />
        </Provider>
    );
}

export default App;
