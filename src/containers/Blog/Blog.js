import React, { Component } from 'react';

import NewRage from '../../components/NewRage/NewRage';
import Rage from '../../components/Rage/Rage';
import classes from './Blog.css';
import DatePicker from "react-datepicker";
 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Blog extends Component {
    state = {
        rages: JSON.parse(localStorage.getItem('ragesAppRages')) || [],
        selectedPostId: null,
        error: false,
        selectedDate: null
    }
    
    addRageToLocalStorageTest = () => {
        const rages = [
            {"id":0,"level":0,"text":"wfwef","date":"10/03/2019 23:56:3","visible":true},
            {"id":1,"level":2,"text":"wefwef","date":"10/03/2019 23:56:6","visible":true},
            {"id":2,"level":0,"text":"afeawef","date":"10/07/2019 13:16:7","visible":true},
            {"id":3,"level":0,"text":"awefawef","date":"10/07/2019 13:16:9","visible":true},
            {"id":4,"level":3,"text":"awefawef","date":"10/07/2019 13:16:12","visible":true},
            {"id":5,"level":5,"text":"q2ff q23r","date":"10/08/2019 3:17:7","visible":true},
            {"id":6,"level":4,"text":"q23r q23r 2q3r2q3","date":"10/08/2019 3:17:9","visible":true},
            {"id":7,"level":2,"text":"qqqqqqqqqqq","date":"10/09/2019 2:12:31","visible":true},
            {"id":8,"level":4,"text":"wwefwef","date":"10/09/2019 2:20:13","visible":true},
            {"id":9,"level":5,"text":"awef awefwaef ","date":"10/09/2019 2:40:41","visible":true},
            {"id":10,"level":0,"text":"ыупк","date":"10/09/2019 16:28:28","visible":true}
        ];
        localStorage.setItem("ragesAppRages", JSON.stringify(rages));
    }

    formatDate = (date) => {
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }

    groupByDay = (array) => {
        const days = {};
        array.forEach(v => {
            const [date] = v.date.split(' ');
            if (!days[date]) {
                days[date] = [];
            }
            days[date].push(v);
        });
        return Object.values(days);
    }

    dayRage = () => {
        let groupedRages = this.groupByDay(this.state.rages);
        let dayRage = [];
        groupedRages.forEach((v, index) => {
            let dayz = {};
            let zxc = v.reduce((a, b) => {
                return a + b['level'];
            }, 0);
            let dater = v[0].date.split(' ')[0];
            dayz[dater] = (zxc/v.length).toFixed();
            dayRage.push(dayz);
        });
        return dayRage
    }

    handleChange = date => {
        this.setState({
            selectedDate: date
        });       
    };

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
        let  rages = null;

        if (this.state.selectedDate !== null) {
            rages = this.state.rages
                .filter(rage => {
                    return this.formatDate(this.state.selectedDate) === rage.date.split(' ')[0];
                })
                .map(rage => {
                    return <Rage 
                        key={rage.id} 
                        level={rage.level} 
                        text={rage.text} 
                        date={rage.date} />;
                }).reverse();

            if (rages.length === 0) {
                rages = (<div style={{textAlign: "center", marginTop: '20px'}}>There are no rages {this.formatDate(this.state.selectedDate)}!</div>)
            }
        } else {
            rages = this.state.rages.map(rage => {
                return <Rage 
                    key={rage.id} 
                    level={rage.level} 
                    text={rage.text} 
                    date={rage.date} />;
            }).reverse();
        }

        return (
            <div>
                <button onClick={this.addRageToLocalStorageTest}>Add test items</button>
                <section>
                    <NewRage
                        addRage={this.addRageHandler} />
                    <DatePicker
                    selected={this.state.selectedDate}
                    onChange={this.handleChange}
                    isClearable
                    dayClassName={date => {
                        date = this.formatDate(date);

                        let dayClass = '';
                        this.dayRage().forEach(v => {
                            if (v.hasOwnProperty(date)) {
                                dayClass = 'has-rage-' + v[date]
                            }
                        });

                        return classes[dayClass]
                    }}
                />
                </section>
                <section className={classes.Rage}>
                    {rages}
                </section>
            </div>
        );
    }
}

export default Blog;