// Global imports
import {memo} from 'react';

let Header = memo((props:{name:string}) =>{
    return (
        <header className="header">
            <h1>{props.name}</h1>
        </header>
    );
});

export default Header;