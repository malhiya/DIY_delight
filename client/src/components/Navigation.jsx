import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Bagistry 🪴 </h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Create</a></li>
                <li><a href='/bags' role='button'>View Bags</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation