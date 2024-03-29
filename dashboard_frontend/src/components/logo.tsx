const Logo = (props:{collapsed: boolean}) => {
    return (
        <section className="logoContainer">
            <svg className="logo" xmlns="http://www.w3.org/2000/svg"
                width="100pt" height="100pt" viewBox="0 0 102.000000 99.000000"
                preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,99.000000) scale(0.100000,-0.100000)" >
                    <path d="M265 800 l-220 -128 -3 -274 -2 -273 49 -27 c27 -16 52 -28 55 -28 3
                    0 6 81 6 180 0 99 4 180 9 180 5 0 84 -43 175 -96 l166 -96 168 96 c92 53 171
                    96 175 96 4 0 7 -81 7 -180 0 -112 4 -180 10 -180 5 0 32 14 60 31 l50 31 0
                    264 0 264 -37 24 c-93 59 -423 246 -435 245 -7 0 -112 -58 -233 -129z m175
                    -196 c0 -145 1 -156 18 -148 22 10 62 10 85 0 16 -8 17 3 17 149 0 141 2 157
                    16 151 49 -19 274 -160 274 -172 0 -7 -19 -23 -42 -35 -24 -12 -99 -55 -166
                    -95 -68 -41 -131 -74 -139 -74 -29 0 -354 193 -351 208 3 12 261 171 281 172
                    4 0 7 -70 7 -156z"/>
                    </g>
                </svg>
            <h3 style={{display: props.collapsed ? "none" : "block"}}>MyTable</h3>
        </section>
    )
}

export default Logo;