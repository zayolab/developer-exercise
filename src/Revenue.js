import React, { Component } from 'react';

import './App.css';

class Revenue extends React.Component{

    constructor(props, data) {

        super(props);
 


    }
    


    render() {

        return (
        <div>
            <table className="revenue-table">
            <thead>
                <tr>
                    <th>Revenue</th>
                </tr>
                <tr>
                    <th></th>
                    <th>One-Time</th>
                    <th>Monthly</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.tableFromParent}
            </tbody>
            </table>
         </div>
               )
    }
}

export default Revenue;