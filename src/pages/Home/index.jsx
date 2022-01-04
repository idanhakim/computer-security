import React from 'react';
import './styles.css';


export const Home = ()=>{
    return (
        <div className={'home'}>
            <h2>Home</h2>
            <h3>Authors:</h3>
            <ul>
                <li>Idan Hakim</li>
                <li>Oleg Rudoy</li>
                <li>Yafit Fridman</li>
                <li>Dor Nakash</li>
                <li>Tomer</li>
            </ul>
        </div>
    );
}