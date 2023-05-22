import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../navbar/navbar.css"
import TimeZone from "../Timezone/timezone";
const Navbar = () => {

    return (
        <>
            <div className=" navbar-section-design">
                <div className="d-flex">
                    <div>
                        <img src="https://dev.divineapi.com/assets/images/logo.svg" className="brand-image " />
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div className="brand-title">
                            Dashboard
                        </div>
                        <div>
                            <TimeZone  />
                        </div>
                        <div className="profile-logout-div d-flex align-items-center">
                            <div className="profile-avatar rounded-circle justify-content-center">s</div>
                            <div className="Logout-section d-flex ps-4">
                                <span className="fw-bolder text-danger">
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