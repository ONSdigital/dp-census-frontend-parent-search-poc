import React, {FormEvent} from 'react';
import {Result, ResultProps, searchResult} from "./Result";
import {MapItem} from "./MapItem";

import './App.css';

export interface ContentProps {
}

export class Content extends React.Component<ContentProps, {}> {

    state = {
        searchString: "",
        results: []
    };

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            searchString: '',
            results: []
        };
        this.setSearchInput = this.setSearchInput.bind(this);
    }

    protected setSearchInput(input: string): void {
        this.setState({searchString: input});
    }

    protected handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const submitSuccess: boolean = await this.submitForm();
        this.setState({submitSuccess});
    };

    protected async submitForm(): Promise<boolean> {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "query": {
                    "bool": {
                        "must": {
                            "match_all": {}
                        },
                        "filter": {
                            "geo_shape": {
                                "location": {
                                    "shape": {
                                        "type": "polygon",
                                        "coordinates": [[[-3.232257, 51.507306], [-3.128257, 51.500306], [-3.136840, 51.467705], [-3.2085046, 51.4520104], [-3.232257, 51.507306]]]
                                    },
                                    "relation": "within"
                                }
                            }
                        }
                    }
                }
            })
        };
        // TODO remove eleasticsearch request for wrapper API when ready
        const response = await fetch('http://localhost:9200/test_geolocation/_search?pretty', requestOptions);
        const data = await response.json();
        //this.setState(({results: data}));
        const demo: searchResult = {name: "Test entry 1"};
        this.setState(({results: demo}));

        return true;
    }

    render() {
        return <div className="wrapper" role="search">
            <form className="col-wrap search__form" action="/search" onSubmit={this.handleSubmit}>
                <label className="search__label search-label col col--md-23 col--lg-24" htmlFor="search">Search name of
                    geographical area</label>
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
            <MapItem/>
            <Result results={this.state.results}/>
        </div>
    }
}
