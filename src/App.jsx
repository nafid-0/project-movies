import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Card.jsx (or in the same file)
const Card = ({ title }) => {
const [liked, setLiked] = useState(false)
const [count, setCount] = useState(0)
    useEffect(() => {
        console.log(count);
    },[liked]);

    return (
        <div className="card" onClick={() => setCount(count + 1)}>
            <h1 className="card-title" > {title} <br/> {count ? count : null} </h1>
            <button className={liked ? 'liked' : 'like'} onClick={()=>setLiked(!liked)}>
                {liked ? '❤️' : '🤍'}
            </button>



        </div>
    )
}

const App1 = () => {
    return (
        <div>
            <Card title="wendesday"/>
            <Card title="Gangster"/>
            <Card title="lokha"/>

        </div>
    )
}

// function App1() {
//     return (
//         <div className="App">
//             <h1>hello</h1>
//             <Card title="wendesday" />
//             <Card title="gangster" />
//             <Card title="avengers" />
//         </div>
//     );
// }

export default App1;

