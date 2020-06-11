import React from 'react';
import './App.css';

export interface ContentProps {
}

export class Content extends React.Component<ContentProps, {}> {

    state = {
        searchString: "",
    };
    constructor(props: ContentProps) {
        super(props);
        this.state = {searchString: ''};
        this.setSearchInput = this.setSearchInput.bind(this);
    }

    setSearchInput(input: string) {
        this.setState({searchString: input});    }

    render() {
        return <div className="wrapper" role="search">
            <form className="col-wrap search__form" action="/search">
                <label className="search__label search-label col col--md-23 col--lg-24" htmlFor="search">Search name of geographical area</label>
                <input type="search"
                       autoComplete="off"
                       className="search__input search-bar col col--md-21 col--lg-32"
                       id="search"
                       value={this.state.searchString}
                       onChange={(
                           ev: React.ChangeEvent<HTMLInputElement>,
                       ): void => this.setSearchInput(ev.target.value)}></input>
                <button type="submit" className="search__button col--md-3 col--lg-3" id="nav-search-submit">
                    <span className="visuallyhidden">Search</span>
                    <span className="icon icon-search--light"></span>
                </button>
            </form>
        </div>
    }
}
