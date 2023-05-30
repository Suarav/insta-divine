import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../style/schedule.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import Cookies from "js-cookie";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ScheduleStartButton from "../components/scheduleButton/startButton";

const SchedulePage = () => {
    const navigate = useNavigate();
    const [SchedulerData, setSchedulerData] = useState([])
    const [dailyData, setDailyData] = useState({})
    const [weeklyData, setWeeklyData] = useState({})
    const [monthlyData, setMonthlyData] = useState({})

    const handleAction = (data, name, email) => {
        navigate("/actionProfile", {
            state: {
                key: data,
                name: name,
                email: email
            }
        })
    }
    const listInstaSchedule = async () => {
        const body = {
            api_key: Cookies.get('api_key')
        }
        const res = await apiService.listInstaSchedule(body)
        res.map((i) => {
            if (i.type == "weekly") {
                setWeeklyData(i)
            }
            if (i.type == "daily") {
                setDailyData(i)
            }
            if (i.type == "monthly") {
                setMonthlyData(i)
            }
        })
        // setSchedulerData(res)
    }

    const changeStatus = async (status, type) => {
        const body = {
            api_key: Cookies.get('api_key'),
            status: status == true ? 1 : 0,
            type: type
        }
        const res = await apiService.changeStatus(body)

    }
    useEffect(() => {
        listInstaSchedule()
    }, []);
    return (
        <>
            <Navbar />
            <Sidebar />

            <div className="schedule-table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Scheduler Name</th>
                            <th scope="col">Scheduler Type</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{Object.keys(dailyData).length > 0 ? dailyData.scheduler_name : "-"}</td>
                            <td>Daily</td>
                            <td>{Object.keys(dailyData).length > 0 ? dailyData.email : "-"}</td>
                            <td>
                                {Object.keys(dailyData).length > 0 ?
                                    <BootstrapSwitchButton
                                        checked={Object.keys(dailyData).length > 0 && (dailyData.status == 1) ? true : false}
                                        onlabel='Active'
                                        offlabel='Deactive'
                                        offstyle="danger"
                                        onstyle="success"
                                        data-toggle="toggle" data-style="ios"
                                        onChange={(checked: boolean) => {
                                            changeStatus(checked, "daily")
                                        }}
                                    /> : "-"}
                            </td>
                            <td><span className="edit" onClick={() => handleAction("daily", dailyData.scheduler_name, dailyData.email)}>{Object.keys(dailyData).length > 0 ?
                                "Edit" :
                                <ScheduleStartButton />
                            }</span></td>

                        </tr>
                        <tr>

                            <td>{Object.keys(weeklyData).length > 0 ? weeklyData.scheduler_name : "-"}</td>
                            <td>Weekly</td>
                            <td>{Object.keys(weeklyData).length > 0 ? weeklyData.email : "-"}</td>
                            <td>
                                {Object.keys(weeklyData).length > 0 ?
                                    <BootstrapSwitchButton
                                        checked={Object.keys(weeklyData).length > 0 && (weeklyData.status == 1) ? true : false}
                                        onlabel='Active'
                                        offlabel='Deactive'
                                        offstyle="danger"
                                        onstyle="success"
                                        data-toggle="toggle" data-style="ios"
                                        onChange={(checked: boolean) => {
                                            changeStatus(checked, "weekly")
                                        }}
                                    /> : "-"} </td>
                            <td><span onClick={() => handleAction("weekly", weeklyData.scheduler_name, weeklyData.email)}>{Object.keys(weeklyData).length > 0 ?
                                "Edit" :
                                <ScheduleStartButton />
                            }</span></td>
                        </tr>
                        <tr>

                            <td>{Object.keys(monthlyData).length > 0 ? monthlyData.scheduler_name : "-"}</td>
                            <td>Monthly</td>
                            <td>{Object.keys(monthlyData).length > 0 ? monthlyData.email : "-"}</td>
                            <td>
                                {Object.keys(monthlyData).length > 0 ?
                                    <BootstrapSwitchButton
                                        checked={Object.keys(monthlyData).length > 0 && (monthlyData.status == 1) ? true : false}

                                        onlabel='Active'
                                        offlabel='Deactive'
                                        offstyle="danger"
                                        onstyle="success"
                                        data-toggle="toggle" data-style="ios"
                                        onChange={(checked: boolean) => {
                                            changeStatus(checked, "monthly")
                                        }}
                                    /> : "-"}</td>
                            <td><span className="edit" onClick={() => handleAction("monthly", monthlyData.scheduler_name, monthlyData.email)}>
                                {Object.keys(monthlyData).length > 0 ?
                                    "Edit" :
                                    <ScheduleStartButton />
                                }
                            </span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
















        </>
    )
}
export default SchedulePage;
