import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import "../navbar/navbar.css"
import TimeZone from "../Timezone/timezone";
import Cookies from 'js-cookie';



const Navbar = () => {
    // const handleDropdownValue = (e) => {

    //     if (e.target.value == "weekly") {
    //         props.handleDataUrl("get_weekly_horoscope")
    //     } else if (e.target.value == "monthly") {
    //         props.handleDataUrl("get_monthly_horoscope")
    //     } else {
    //         props.handleDataUrl("get_daily_horoscope")
    //     }
    // }

    // const handleSelectTimeZone = (data) => {
    //     props.handleTimeZoneData(data)
    // }
    const handleClearCookies = () => {
        Cookies.remove("_dul_s");
        window.location = "http://dev.divineapi.com/dashboard"
    }
    return (
        <>
            <div className=" navbar-section-design">
                <div className="d-flex">
                    <div>
                        <img src="https://divineapi.com/assets/images/logo.svg" className="brand-image " />
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div className="brand-title">
                            Dashboard
                        </div>
                        <div>
                            {/* <TimeZone getTimeZone={handleSelectTimeZone} /> */}
                        </div>
                        {/* <div>
                            <div >
                                <select className="dropdown_select" onChange={handleDropdownValue} name="time" id="time">
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>

                                </select>
                            </div>
                        </div> */}
                        <div className="profile-logout-div d-flex align-items-center">
                            <div className="profile-avatar rounded-circle justify-content-center">s</div>
                            <div className="Logout-section d-flex ps-4" >
                                <span className="fw-bolder text-danger" onClick={handleClearCookies}>
                                    <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#dc3545", }} className="pe-2" />
                                    <span className="logout-title">Logout</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;