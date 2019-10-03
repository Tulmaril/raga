import React, { Component } from 'react';

import NewRage from '../../components/NewRage/NewRage';
import Rage from '../../components/Rage/Rage';
import './Blog.css';

class Blog extends Component {
    state = {
        rages: JSON.parse(localStorage.getItem('ragesAppRages')) || [],
        selectedPostId: null,
        error: false
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }
    addRageToLocalStorage = (rages) => {
        localStorage.setItem("ragesAppRages", JSON.stringify(rages));
    }
    addRageHandler = (rage) => {
        if (this.state.rages.length !== 0) {
            rage.id = this.state.rages[this.state.rages.length-1].id + 1;
        } else {
            rage.id = 0;
        }
        rage.date = rage.date.toString();
        const rages = [
            ...this.state.rages, rage
        ];

        this.setState({rages: rages}, () => this.addRageToLocalStorage(rages));
    }

    render () {

        const rages = this.state.rages.map(rage => {
            return <Rage 
                key={rage.id} 
                level={rage.level} 
                text={rage.text} 
                date={rage.date} />;
        }).reverse();

        return (
            <div>
                <section>
                    <NewRage
                        addRage={this.addRageHandler} />
                </section>
                <section className="Rages">
                    {rages}
                </section>
            </div>
        );
    }
}

export default Blog;