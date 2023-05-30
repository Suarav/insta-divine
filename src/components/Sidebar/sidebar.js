import { faBars, faCreditCard, faDollarSign, faFileLines, faLock, faNetworkWired, faPlug, faRightFromBracket, faTableCells, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import '../Sidebar/sidebar.css'
const Sidebar = () => {

    return (
        <>
            <div className="s-layout__sidebar">
                <a className="s-sidebar__trigger" href="#0">
                    <FontAwesomeIcon icon={faBars} style={{ color: "#999", }} />
                </a>

                <nav className="s-sidebar__nav">
                    <ul>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/dashboard">

                                <FontAwesomeIcon className="icon-sidebar" icon={faTableCells} style={{ color: "#ffffff", }} /><em>
                                    Dashboard
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/integration">
                                <FontAwesomeIcon className="icon-sidebar" icon={faNetworkWired} style={{ color: "#ffffff", }} /><em>
                                    Integration Steps
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/subscriptions">
                                <FontAwesomeIcon className="icon-sidebar" icon={faCreditCard} style={{ color: "#ffffff", }} />
                                <em>
                                    Your Subscriptions
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/manage-subscriptions">
                                <FontAwesomeIcon className="icon-sidebar" icon={faCreditCard} style={{ color: "#ffffff", }} /><em>

                                    Manage Subscriptions

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/website-authorization">
                                <FontAwesomeIcon className="icon-sidebar" icon={faLock} style={{ color: "#ffffff", }} /><em>

                                    Website Authorization

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/manage-billing">
                                <FontAwesomeIcon className="icon-sidebar" icon={faDollarSign} style={{ color: "#ffffff", }} /><em>
                                    Manage Billing
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/profile">
                                <FontAwesomeIcon className="icon-sidebar" icon={faUser} style={{ color: "#ffffff", }} /><em>
                                    Profile Details

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/widgets/horoscope-api">
                                <FontAwesomeIcon className="icon-sidebar" icon={faBars} style={{ color: "#ffffff", }} /><em>
                                    Widgets
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/wordpress-plugin">
                                <FontAwesomeIcon className="icon-sidebar" icon={faPlug} style={{ color: "#ffffff", }} /><em>
                                    Wordpress Plugin
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://insta.divineapi.com">
                                <svg className="insta-icon svg-inline--fa fa-instagram nav-icon" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path className="insta-icon-fill" fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                <em>
                                    Instagram Stories
                                </em>
                            </Link>
                        </li>

                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/api-doc">
                                <FontAwesomeIcon className="icon-sidebar" icon={faFileLines} style={{ color: "#ffffff", }} /><em>

                                    API & Docs

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/login">
                                <FontAwesomeIcon className="icon-sidebar" icon={faRightFromBracket} style={{ color: "#ffffff" }} /><em>
                                    Logout
                                </em>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Sidebar;