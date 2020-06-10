import React from 'react';
import censusLogo from './assets/Census2021_whiteback.png'
import './App.css';

function App() {
    return (
        <div>
            <Header/>
            <Content/>
        </div>
    );
}

function Header() {
    return (<header>
        <div className="wrapper">
            <div className="header col-wrap">
                <div className="col">
                    <img className="logo top-logo"
                         src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg"
                         alt="Office for National Statistics"/>
                    <img className="logo top-logo" src={censusLogo}
                         alt="Census 2021 logo"/>
                </div>
            </div>
        </div>
        <div className="primary-nav print--hide page-title font-size--sm">
        </div>
    </header>);
}

function Content() {
    return (
        <div className="wrapper" role="search">
            <form className="col-wrap search__form" action="/search">
                <label className="search__label col col--md-23 col--lg-24" htmlFor="search">Search for a
                    keyword(s) or time series ID</label>
                <input type="search" autoComplete="off" className="search__input search-bar col col--md-21 col--lg-32"
                       id="search" value=""></input>
                <button type="submit" className="search__button col--md-3 col--lg-3" id="nav-search-submit">
                    <span className="visuallyhidden">Search</span>
                    <span className="icon icon-search--light"></span>
                </button>
            </form>
        </div>
    );
}


export default App;
