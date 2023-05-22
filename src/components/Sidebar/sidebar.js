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
                                <FontAwesomeIcon icon={faTableCells} style={{ color: "#ffffff", }} /><em>
                                    Dashboard
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/integration">
                                <FontAwesomeIcon icon={faNetworkWired} style={{ color: "#ffffff", }} /><em>
                                    Integration Steps
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/subscriptions">
                                <FontAwesomeIcon icon={faCreditCard} style={{ color: "#ffffff", }} />
                                <em>
                                    Your Subscriptions
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/manage-subscriptions">
                                <FontAwesomeIcon icon={faCreditCard} style={{ color: "#ffffff", }} /><em>

                                    Manage Subscriptions

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/website-authorization">
                                <FontAwesomeIcon icon={faLock} style={{ color: "#ffffff", }} /><em>

                                    Website Authorization

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/manage-billing">
                                <FontAwesomeIcon icon={faDollarSign} style={{ color: "#ffffff", }} /><em>
                                    Manage Billing
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/profile">
                                <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} /><em>
                                    Profile Details

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/widgets/horoscope-api">
                                <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff", }} /><em>
                                    Widgets
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/wordpress-plugin">
                                <FontAwesomeIcon icon={faPlug} style={{ color: "#ffffff", }} /><em>
                                    Wordpress Plugin
                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/api-doc">
                                <FontAwesomeIcon icon={faFileLines} style={{ color: "#fcfcfc", }} /><em>

                                    API & Docs

                                </em>
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="https://divineapi.com/login">
                                <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ffffff" }} /><em>
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