function Header(props:{name:string}){
    return (
        <header className="header">
            <h1>{props.name}</h1>
        </header>
    );
}

export default Header;