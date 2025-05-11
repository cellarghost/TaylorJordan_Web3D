import { Link } from "react-router"
import siteLogo from "../assets/logo.svg"
import SVG from 'react-inlinesvg'

export function NavBar() {
    return (
        <>
            <ul className="flex row ml-5">
                <li className="nav_item logo">
                    <Link to="/">
                        <img src={siteLogo} className="logo max-w-[4rem]" alt="" />
                    </Link>
                </li>
                <li className="nav_item">
                    <Link to="/about">
                        About
                    </Link>
                </li>
                <li className="nav_item">
                    <Link to="/scene">
                        3D Scene
                    </Link>
                </li>
            </ul>
            <hr className="text-grey-500 ml-[3rem] mr-[3rem]"/>
        </>
    )
}