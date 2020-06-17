import React from 'react';
import {Header} from "./Header";
import {Content} from "./Content";
import {Footer} from "./Footer";
import './App.css';

export interface AppProps {
}

export class App extends React.Component<AppProps, {}> {

    constructor(props: AppProps) {
        super(props);
    }

    render() {

        return <div>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    }
}

export default App;
