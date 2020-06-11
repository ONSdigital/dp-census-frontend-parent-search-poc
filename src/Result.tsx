import React from 'react';
import './App.css';

export interface ResultProps {
    results: searchResult[];
}

export interface searchResult {
    name: string
}


export class Resulta extends React.Component<ResultProps, {}> {

    constructor(props: ResultProps) {
        super(props);
    }

    render() {
        console.log('hmm 0');
        const resultList = this.props.results.map(function (singleResult: searchResult) {
            console.log('hmm 1');
            return <li>{singleResult.name}</li>;
        });
        return <div>
            <ul>{resultList}</ul>
        </div>
    }
}
