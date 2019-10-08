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
        startDate: new Date()
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
        let asd = this.groupByDay(this.state.rages);
        let dayRage = [];
        asd.forEach((v, index) => {
            let dayz = {};
            let zxc = v.reduce((a, b) => {
                return a + b['level'];
            }, 0);
            let dater = v[0].date.split(' ')[0];
            dayz[dater] = (zxc/v.length).toFixed();
            dayRage.push(dayz);
        });

        console.log(dayRage);
        return dayRage
    }

    handleChange = date => {
        this.setState({
          startDate: date
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

        const rages = this.state.rages.map(rage => {
            return <Rage 
                key={rage.id} 
                level={rage.level} 
                text={rage.text} 
                date={rage.date} />;
        }).reverse();

        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    dayClassName={date => {
                        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

                        let dayClass = '';
                        this.dayRage().forEach(v => {
                            if (v.hasOwnProperty(date)) {
                                dayClass = 'has-rage-' + v[date]
                            }
                        });

                        return classes[dayClass]
                    }}
                />
                <button className='Asdasdasd' onClick={this.dayRage}>qweqweqwe</button>
                <section>
                    <NewRage
                        addRage={this.addRageHandler} />
                </section>
                <section className={classes.Rage}>
                    {rages}
                </section>
            </div>
        );
    }
}

export default Blog;