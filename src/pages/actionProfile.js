
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import '../style/profile.css';
import InputCheckbox from "../components/molecule/checkbox/inputCheckbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faClose, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import Model from "../components/molecule/model/Model";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import * as htmlToImage from 'html-to-image';
import apiService from "../services/apiService";
import axios from "axios";
import moment from 'moment';
import _default from "react-bootstrap/esm/NavDropdown";

import Cookies from 'js-cookie';
import SaveTempletModel from "../components/molecule/model/SaveTempletModel";

import TimeZone from "../components/Timezone/timezone";
import { useNavigate, useLocation } from "react-router-dom";

const currentDate = moment().format('YYYY-MM-DD');

const categories = [{ name: "Personal Life", value: "personal" },
{ name: "Health", value: "health" },
{ name: "Profession", value: "profession" },
{ name: "Emotions", value: "emotions" },
{ name: "Travel", value: "travel" },
{ name: "Luck", value: "luck" },
];
const ActionProfile = () => {
    const location = useLocation()
    const componentRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 70,
    })
    const [selectedStatus, setSelectedStatus] = useState(0)
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [show, setShow] = useState(false);
    const [cropModelShow, setCropModelShow] = useState(false)
    const [profileTitle, setProfileTitle] = useState("");
    const [base64String, setBase64String] = useState("");
    const [categoryBtnColor, setCategoryBtnColor] = useState("#813737");
    const [categoryBtnFontColor, setCategoryBtnFontColor] = useState("#ffffff");
    const [fontColor, setFontColorCode] = useState("#000000");
    const [backgroundImage, setBackgroungImage] = useState("");
    const [btnStyle, setBtnStyle] = useState("square-rounded")
    const [fontFamaily, setFontFamaily] = useState("Arvo")
    const [zodiacImage, setZodiacImage] = useState("/zodiac/Aries.png")
    const [isMobilePreview, setIsmobilePreview] = useState("preview-design-div")
    const [showOtherRow, setShowOtherRow] = useState(false);
    const [isBackgroundImage, setIsBackGroundImage] = useState([]);
    const [zodiacName, setZodiacName] = useState('Aries');
    const [cat1, setCat1] = useState("");
    const [cat2, setCat2] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(["personal", "health"]);
    // const [selectImage, setSelectImage] = useState([]);
    const [isDropDown, setIsdropDown] = useState(false)
    const [allTemplet, setAllTemplet] = useState([])
    const [selectedTemplateData, setselectedTemplateData] = useState({});
    const [isSaveModel, setIsSaveModel] = useState(false)
    const [templetName, setTempletName] = useState("");
    const [saveAsTemplateName, setSaveAsTemplateName] = useState("Choose a template");
    const [timeZoneValue, setTimeZoneValue] = useState("")
    const [zodiacData, setZodiacData] = useState({});
    const [dataUrl, setDataUrl] = useState("get_daily_horoscope")
    const [profileDataName, setProfileDataName] = useState("")
    const [profileDataEmail, setProfileEmail] = useState("");
    const [instaTitle, setInstaTitle] = useState("")
    const [count, setCount] = useState(0);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) {
    //             setIsdropDown(false)
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [])

    // const saveCreateTemplateShow = async () => {
    //     const res = await apiService.getTemplet()
    //     setAllTemplet(res)
    //     // setIsdropDown(false)
    // }

    // useEffect(() => {
    //     saveCreateTemplateShow()
    // }, [count]);


    const singleSchedulePage = async () => {
        const formData = new FormData();
        formData.append('api_key', Cookies.get('api_key'));
        formData.append('type', location.state.key);
        const respose = await apiService.singleSchedulePage(formData);
        setSelectedCategories(JSON.parse(respose.config).category)
        setProfileTitle(JSON.parse(respose.config).title)
        setBackgroungImage(JSON.parse(respose.config).background)
        setBtnStyle(JSON.parse(respose.config).catButtonStyle)
        setCategoryBtnColor(JSON.parse(respose.config).catButtonColor)
        setCategoryBtnFontColor(JSON.parse(respose.config).catButtonFontColor)
        setFontFamaily(JSON.parse(respose.config).fontStyle)
        setFontColorCode(JSON.parse(respose.config).fontCol)
        setProfileDataName(respose.scheduler_name)
        setProfileEmail(respose.email)
        setSelectedStatus(respose.status)
        // setSaveAsTemplateName(name)
        setIsdropDown(false)
    }
    useEffect(() => {
        singleSchedulePage()
    }, [])
    const handleProfileSave = async () => {
        const TemplateData = {
            category: selectedCategories,
            title: profileTitle,
            background: backgroundImage,
            style: "",
            profileImage: base64String,
            catButtonStyle: btnStyle,
            catButtonColor: categoryBtnColor,
            catButtonFontColor: categoryBtnFontColor,
            fontStyle: fontFamaily,
            fontColor: fontColor,
        }
        const dataBody = {
            api_key: Cookies.get('api_key'),
            scheduler_name: profileDataName,
            type: location.state.key,
            email: profileDataEmail,
            status: selectedStatus,
            config: JSON.stringify(TemplateData)
        }
        const data = await apiService.storeInstaSchedule(dataBody)
        if (data.data.success) {
            alert("Record inserted successfully")
        }
        console.log("data+++", data)
    }
    const handleTimeZoneData = (timeZoneData) => {
        setTimeZoneValue(timeZoneData)
    }
    const pageReloadApicall = async () => {
        let formData = new FormData();
        formData.append('api_key', Cookies.get('api_key'));
        // formData.append('api_key', "f4573fc71c731d5c362f0d7860945b88");
        formData.append('date', currentDate);
        formData.append('timezone', timeZoneValue);
        formData.append('sign', "Aries");
        const headers = {
            'Content-Type': 'multipart/form-data',
            "Accept": "application/json"
        }
        const res = await axios.post(`https://dev.divineapi.com/api/1.0/${dataUrl}.php`, formData, headers)
        if (res.data.success == 1) {
            setZodiacData(res.data.data.prediction)
            setCat1(res.data.data.prediction[selectedCategories[0]])
            setCat2(res.data.data.prediction[selectedCategories[1]])
            setIsLoading(false);
        }
        else {
            window.location = "https://dev.divineapi.com"
        }
    }


    useEffect(() => {
        setIsLoading(true);
        pageReloadApicall();

    }, []);




    const handleTemplate = async () => {

        const TemplateData = {
            category: selectedCategories,
            title: profileTitle,
            background: backgroundImage,
            style: "",
            profileImage: base64String,
            catButtonStyle: btnStyle,
            catButtonColor: categoryBtnColor,
            catButtonFontColor: categoryBtnFontColor,
            fontStyle: fontFamaily,
            fontColor: fontColor,
        }
        const dataBody = {
            api_key: Cookies.get('api_key'),
            name: templetName,
            config: JSON.stringify(TemplateData)
        }
        const res = await apiService.saveInstaTemplet(dataBody)
        if (res) {
            HideSavePopup()
        }
        setselectedTemplateData(TemplateData)
        // alert(JSON.stringify(TemplateData))
    }
    const ShowSavePopup = () => {
        setIsSaveModel(true)
    }
    // close SaveModel
    const HideSavePopup = () => {
        setIsSaveModel(false)
    }
    // drop down
    const handleSaveTempleteDropDown = async () => {
        if (isDropDown) {
            setIsdropDown(false)
        } else {
            setIsdropDown(true)
        }
        const res = await apiService.getTemplet()
        setAllTemplet(res)

    }
    // handleTemplete
    const handleTempleteDesign = async (id, name) => {
        const res = await apiService.getTempletData(id)
        setSelectedCategories(JSON.parse(res.config).category)
        setProfileTitle(JSON.parse(res.config).title)
        setBackgroungImage(JSON.parse(res.config).background)
        setBtnStyle(JSON.parse(res.config).catButtonStyle)
        setCategoryBtnColor(JSON.parse(res.config).catButtonColor)
        setCategoryBtnFontColor(JSON.parse(res.config).catButtonFontColor)
        setFontFamaily(JSON.parse(res.config).fontStyle)
        setFontColorCode(JSON.parse(res.config).fontCol)
        setSaveAsTemplateName(name)
        setIsdropDown(false)
    }

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(value, checked);

        if (checked) {
            if (selectedCategories.length === 2) {
                e.preventDefault();
            } else {
                setSelectedCategories([...selectedCategories, value])
            }
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== value))
        }


    }
    useEffect(() => {
        // setIsLoading(true);
        setCat1(zodiacData[selectedCategories[0]])
        setCat2(zodiacData[selectedCategories[1]])
        //  setIsLoading(false);
    }, [selectedCategories]);

    const setCanvasImage = (image, canvas, crop) => {
        if (!crop || !canvas || !image) {
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';


        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (data) => {
        setShow(true);
        if (show) {
            setFontFamaily(data)
            setShow(false);
        }
    }

    useEffect(() => {

        document.body.classList.add("profile-containt");
        // 2 select checkbox
        var limit = 2;
        $('input.categoryCheckbox').on('click', function (evt) {
            if ($('.categoryCheckbox:checked').length > limit) {
                this.checked = false;
            }
        });

        const body = document.getElementsByClassName("color-picker-box")[0];
        const input = document.getElementById("colorPicker");
        const colorCode = document.getElementById("colorCode");

        setColor();
        input.addEventListener("input", setColor);

        function setColor() {
            body.style.background = input.value;
            colorCode.innerHTML = input.value;
        }
        // category
        const getPickerClass = document.getElementsByClassName("Categorycolor-picker-box")[0];
        const CategoryInput = document.getElementById("CategoryColorPicker");
        const CategoryColorCode = document.getElementById("CategoryColorCode");
        setCategoryColor();
        CategoryInput.addEventListener("input", setCategoryColor);

        function setCategoryColor() {
            getPickerClass.style.backgroundColor = CategoryInput.value;
            CategoryColorCode.innerHTML = CategoryInput.value;
        }

        // font color
        const getFontPickerClass = document.getElementsByClassName("Fontcolor-picker-box")[0];
        const FontInput = document.getElementById("FontColorPicker");
        const FontColorCode = document.getElementById("FontColorCode");
        setFontColor();
        FontInput.addEventListener("input", setFontColor);

        function setFontColor() {
            getFontPickerClass.style.backgroundColor = FontInput.value;
            FontColorCode.innerHTML = FontInput.value;
        }

        // select only one check box
        $("input:checkbox").on('click', function () {
            var $box = $(this);
            if ($box.is(":checked")) {
                var group = "input:checkbox[name='" + $box.attr("name") + "']";
                $(group).prop("checked", false);
                $box.prop("checked", true);
            } else {
                $box.prop("checked", false);
            }
        });
    }, [])

    // background
    const inputRef = useRef(null);
    const handleCategoryCheckbox = (e, data) => {
        // const inputValue = inputRef.current?.value;
        const { value, checked } = e.target;

        // if (checked) {
        //     if (backgroundImage.length === 1) {
        //         e.preventDefault();
        //     } else {
        //         setBackgroungImage([...backgroundImage, value])
        //     }
        // } else {
        //     setBackgroungImage(backgroundImage.filter(selectimg => selectimg !== value))
        // }

        setBackgroungImage(data)
        console.log(value, checked);
    };

    const getMedia = async () => {
        const res = await apiService.getMedia()
        if (res.length > 4) {
            setIsBackGroundImage(res.slice(0, 4))
        }
    }
    useEffect(() => {
        getMedia();
    }, []);
    // more baclground
    const handleMoreBackgroundImage = async () => {
        const res = await apiService.getMedia()
        if (showOtherRow) {
            setShowOtherRow(false)
            if (res.length > 4) {
                setIsBackGroundImage(res.slice(0, 4))
            }
        } else {
            setIsBackGroundImage(res)
            setShowOtherRow(true)
        }
    }

    // zodiac
    const handleZodiac = (zodiac) => {
        setZodiacImage(zodiac)
    }
    // profile image
    const handleImageChange = (event) => {
        if (event.target.value) {
            setCropModelShow(true)
        }
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setSelectedImage(reader.result));
            reader.readAsDataURL(event.target.files[0]);
        }
        // setSelectedImage(URL.createObjectURL(event.target.files[0]))
    };
    // remove profile images
    const removeSelectedImage = () => {
        setSelectedImage("")
        setBase64String("")
    }
    // crop image
    const handleCropImage = () => {
        setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
        const canvas = previewCanvasRef.current;
        const dataURL = canvas.toDataURL();
        setBase64String(dataURL)
        setCropModelShow(false)
    }

    // button style
    const handleButtonStyle = (e) => {
        setBtnStyle(e.target.value);
    }
    const handleButtonStylesheet = () => {
        if (btnStyle == "square-fill" || btnStyle == "square-rounded" || btnStyle == "square-full-rounded") {
            return categoryBtnColor
        }
        else {
            return "transparent "
        }
    }
    const handleButtonOutLines = () => {
        if (btnStyle == "square-border" || btnStyle == "square-rounded-border" || btnStyle == "square-full-rounded-border" || btnStyle == "square-hardShadow" || btnStyle == "square-rounded-hardShadow" || btnStyle == "square-full-rounded-hardShadow" || btnStyle == "square-SoftShadow" || btnStyle == "square-rounded-SoftShadow" || btnStyle == "square-full-rounded-SoftShadow") {
            return "1px solid black"
        } else {
            return "0px solid"
        }
    }
    const handleButtonHardShadow = () => {
        if (btnStyle == "square-hardShadow" || btnStyle == "square-rounded-hardShadow" || btnStyle == "square-full-rounded-hardShadow") {
            return "6px 6px #000000"
        } else {
            return "0px"
        }
    }

    const handleButtonSoftShadow = () => {
        if (btnStyle == "square-SoftShadow" || btnStyle == "square-rounded-SoftShadow" || btnStyle == "square-full-rounded-SoftShadow") {
            return "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
        } else {
            return "0px"
        }
    }

    // for preview
    const handlepreview = () => {
        if (isMobilePreview == "preview-mobile-design-div") {
            setIsmobilePreview("preview-design-div")
        } else {
            setIsmobilePreview("preview-mobile-design-div")
        }
    }

    // download image
    const handleExportImage = async () => {

        if (selectedCategories.length < 2) {
            alert("Please Select Any Two categrioes")
        }
        else {
            let formData = new FormData();
            formData.append('api_key', Cookies.get('api_key'));
            // formData.append('api_key', "f4573fc71c731d5c362f0d7860945b88");
            if (dataUrl == "get_daily_horoscope") {

                formData.append('date', currentDate);
            }
            else if (dataUrl == "get_weekly_horoscope") {
                formData.append('week', "current");
            }
            else if (dataUrl == "get_monthly_horoscope") {
                formData.append('month', "current");
            }

            formData.append('timezone', timeZoneValue);

            const zodiacSigns = [
                "Aries",
                "Taurus",
                "Gemini",
                "Cancer",
                "Leo",
                "Virgo",
                "Libra",
                "Scorpio",
                "Sagittarius",
                "Capricorn",
                "Aquarius",
                "Pisces"
            ];
            const headers = {
                'Content-Type': 'multipart/form-data',
                "Accept": "application/json"
            }


            setIsLoading(true)
            document.getElementsByClassName("h-100 preview-componentRef-div")[0].style.borderRadius = "0px";

            setIsmobilePreview("preview-mobile-design-div")
            setIsLoading(true)

            for (let i = 0; i < 12; i++) {

                const ZodiacKey = zodiacSigns;
                // console.log("ZodiacKey", ZodiacKey[i]);
                formData.append('sign', ZodiacKey[i]);
                setZodiacName(ZodiacKey[i])
                const res = await axios.post(`https://dev.divineapi.com/api/1.0/${dataUrl}.php`, formData, headers)
                // console.log("res+++++++++++++",res)
                // console.log("selectedCategories[0]]+++++++++", selectedCategories[0])
                // console.log("selectedCategories[1]]+++++++++", selectedCategories[1])

                if (res.data.success == 1) {
                    if (dataUrl == "get_daily_horoscope") {
                        setCat1(res.data.data.prediction[selectedCategories[0]])
                        setCat2(res.data.data.prediction[selectedCategories[1]])
                    } else if (dataUrl == "get_weekly_horoscope") {
                        setCat1(res.data.data.weekly_horoscope[selectedCategories[0]])
                        setCat2(res.data.data.weekly_horoscope[selectedCategories[1]])
                    } else if (dataUrl == "get_monthly_horoscope") {
                        setCat1(res.data.data.monthly_horoscope[selectedCategories[0]])
                        setCat2(res.data.data.monthly_horoscope[selectedCategories[1]])
                    }

                    const image = await htmlToImage.toPng(componentRef.current);
                    download(image, `${ZodiacKey[i]}-${currentDate}`);



                }
                else {
                    window.location = "http://dev.divineapi.com"
                }


            }
            setIsmobilePreview("preview-design-div")
            document.getElementsByClassName("h-100 preview-componentRef-div")[0].style.borderRadius = "40px"
            setIsLoading(false)
        }


    }

    const download = (data, filename) => {
        const a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    };

    return (
        <>
            <Navbar />
            <div className="s-layout">
                {
                    isLoading && <div className="loader">
                        Loading...
                    </div>
                }
                <Sidebar />
                <div className="s-layout__content">
                    <div className="section">
                        <div className="profile-container">
                            <div className="row profile-left-container">
                                <div className="col-lg-8 col-md-12 col-sm-12">
                                    <div className="profile-horoscope-categories pt-1">
                                        <div className="position-sticky">
                                            <h4 className="text-capitalize"> {location.state?.key} insta story </h4>
                                        </div>
                                        {/* sticky */}
                                        <div className="new-profile-text-field">
                                            {/* email */}
                                            <div className="form-group">
                                                <label htmlFor="" className="timezone-title mb-2">Email</label>
                                                <input type="email" className="form-control w-50 mb-4" id="" value={profileDataEmail || location.state?.email} placeholder="name@example.com" onChange={(e) => setProfileEmail(e.target.value)} />
                                            </div>
                                            {/* name */}
                                            <div className="form-group">
                                                <label htmlFor="" className="timezone-title mb-2">Scheduler Name</label>
                                                <input type="text" className="form-control w-50 mb-4" id="" value={profileDataName || location.state?.name} placeholder="Enter name" onChange={(e) => setProfileDataName(e.target.value)} />
                                            </div>
                                            {/* select stuts */}
                                            <label className=" mb-2">Status</label>
                                            <div className="form-check d-flex w-50 justify-content-between">
                                                <div>
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" onChange={(e) => setSelectedStatus(1)} checked={selectedStatus == 1 ? true : false} />
                                                    <label className="form-check-label" for="exampleRadios1">
                                                        Active
                                                    </label>
                                                </div>
                                                <div>
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="0" onChange={(e) => setSelectedStatus(0)} checked={selectedStatus == 0 ? true : false} />
                                                    <label className="form-check-label" for="exampleRadios2">
                                                        Deactive
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <TimeZone handleTimeZoneData={handleTimeZoneData} />
                                        </div>
                                        <label className="label-categories-action-profile">
                                            <div className="title pb-3">
                                                Choose Horoscope Categories{" "}
                                                <span className="sub-title">(You can select only two)</span>
                                            </div>
                                            {/* checkbox */}
                                            <div className="checkbox d-flex flex-wrap">

                                                {
                                                    categories.map((category, index) => <div className="d-flex align-items-center pe-2" key={index}>
                                                        <InputCheckbox
                                                            className="categoryCheckbox"
                                                            label={category.name}
                                                            value={category.value}
                                                            checkBoxType="category"
                                                            checked={selectedCategories?.includes(category.value)}
                                                            onChange={handleCheckbox}
                                                        // onClick={checkBoxClick}

                                                        />
                                                    </div>)
                                                }
                                                {/*                                             
                                            <div className="d-flex align-items-center pe-2">
                                                <InputCheckbox
                                                    value="health"
                                                    className="categoryCheckbox"
                                                    label="Health"
                                                    checkBoxType="category"
                                                    checked={selectedCategories.includes("health")}
                                                    onChange={handleCheckbox}

                                                />
                                            </div>
                                            <div className="d-flex align-items-center pe-2">
                                                <InputCheckbox
                                                    defaultValue="Profession"
                                                    className="categoryCheckbox"
                                                    label="Profession"
                                                    value="profession"
                                                    checkBoxType="category"
                                                    onChange={handleCheckbox}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center pe-2">
                                                <InputCheckbox
                                                    defaultValue="Emotions"
                                                    className="categoryCheckbox"
                                                    label="Emotions"
                                                    value="emotions"
                                                    checkBoxType="category"
                                                    onChange={handleCheckbox}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center pe-2">
                                                <InputCheckbox
                                                    defaultValue="Travel"
                                                    className="categoryCheckbox"
                                                    label="Travel"
                                                    value="travel"
                                                    checkBoxType="category"
                                                    onChange={handleCheckbox}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <InputCheckbox
                                                    id={6}
                                                    defaultValue="Luck"
                                                    className="categoryCheckbox"
                                                    label="Luck"
                                                    value="luck"
                                                    checkBoxType="category"
                                                    onChange={handleCheckbox}

                                                />
                                            </div> */}
                                            </div>
                                        </label>

                                        {/* button group */}
                                        {/* <div className="buttons-group">
                                            <button className="schedule-button" onClick={handleProfileSave}>Save</button>
                                            <div className="position-reletive">
                                                <button onClick={handleSaveTempleteDropDown} className="save-as-template-button me-3" ><span> {saveAsTemplateName}</span>
                                                    <span className="ps-2" ><FontAwesomeIcon icon={faChevronDown} style={{ rotate: isDropDown && "180deg" }} /></span>
                                                </button>

                                                <div className="save-templet-dropDown position-absolute" style={{ display: isDropDown ? "block" : "none" }}>
                                                    <div className="allTemplet-list">
                                                        <div className="pb-2 fw-bold" onClick={ShowSavePopup} style={{ cursor: "pointer" }}>+ Create template</div>
                                                        {allTemplet?.map((item, index) => (
                                                            <div className="" key={index}>
                                                                <div className="p-1 allTemplet-name" onClick={() => handleTempleteDesign(item.id, item.name)}>{item.name}</div>
                                                            </div>

                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}


                                        <div className="bottom-section">
                                            {/* profile */}
                                            <div className="profile-section">
                                                <div className="title pb-3">
                                                    Profile
                                                </div>
                                                <div className="profile-inner-description">
                                                    <div className="row">
                                                        {/* avatar */}
                                                        <div className="col-lg-3 col-sm-12 d-flex justify-content-center mb-4">
                                                            <div
                                                                className="profile-avtar-circle editprofile-avatar rounded-circle d-flex align-items-center justify-content-center"
                                                                alt="Avatar"
                                                            >
                                                                <input type="file" name="file" className="avatar-upload" onChange={handleImageChange} accept="image/*" />
                                                                <div className="upload-image-icon">
                                                                    {(selectedImage == "" || selectedImage == null) ?
                                                                        <img src="/fileupload.svg" className="camera-img" /> : ""}
                                                                </div>

                                                                <div className="" style={{ width: "130px", height: "130px" }}>
                                                                    {selectedImage != "" ?

                                                                        <canvas
                                                                            ref={previewCanvasRef}
                                                                            className="avatar-uploaded-img"
                                                                            style={{
                                                                                maxWidth: "130px",
                                                                                maxHeight: "130px",
                                                                                width: Math.round(completedCrop?.width ?? 0),
                                                                                height: Math.round(completedCrop?.height ?? 0),
                                                                            }}
                                                                        />
                                                                        : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-9 col-sm-12">
                                                            <div className="profile-section-button-group h-100">

                                                                <button className="btn-Pick-an-image mb-sm-4 mb-lg-0 mb-4">
                                                                    <input type="file" name="file" className="btn-Pick-upload" accept="image/*" onChange={handleImageChange} />
                                                                    Pick an image
                                                                </button>
                                                                <button className="btn-remove" onClick={removeSelectedImage}>Remove</button>
                                                            </div>

                                                        </div>
                                                        <div className="profile-section-input pt-5">
                                                            <input type="text" onChange={(e) =>
                                                                setProfileTitle(e.target.value)} value={profileTitle} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Profile Title" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            width: Math.round(completedCrop?.width ?? 0),
                                            height: Math.round(completedCrop?.height ?? 0),
                                        }}
                                    /> */}
                                            <Modal show={cropModelShow} className="fontStyle-model" onHide={setCropModelShow}>
                                                <Modal.Header closeButton>
                                                </Modal.Header>
                                                <Modal.Body className="pe-3">
                                                    {selectedImage &&
                                                        (<ReactCrop crop={crop} aspect={1} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} locked={true}>
                                                            <img src={selectedImage} ref={imgRef} className="selctedIMage" />
                                                        </ReactCrop>)}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" className="px-4" onClick={handleCropImage}>
                                                        Crop
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            {/* Background */}
                                            <div className="Background-section ">
                                                <div className="title pb-3">
                                                    Background
                                                </div>
                                                <div className="Background-inner-description ">
                                                    <div className="row">
                                                        {isBackgroundImage.map((item, index) => (
                                                            <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={index}>
                                                                <InputCheckbox
                                                                    checkBoxName="Background[1][]"
                                                                    value={item}
                                                                    className="checkbox-input radio"
                                                                    checkBoxType="Zodiac"
                                                                    checked1={backgroundImage.includes(item)}
                                                                    onClick={(e) => handleCategoryCheckbox(e, item)}
                                                                    addSpan={<span className="checkbox-tile">
                                                                        <img src={item} className="Background-image " />
                                                                    </span>}
                                                                />
                                                            </div>
                                                        ))}

                                                    </div>

                                                    {/* showMore btn */}
                                                    <div className="w-100 d-flex justify-content-center">
                                                        <div className="showMore-background-btn position-absolute my-lg-3" onClick={handleMoreBackgroundImage}>
                                                            <FontAwesomeIcon icon={faChevronDown} className="faChevronDown-arrow" style={{ color: "#1a1a1a", rotate: showOtherRow && "180deg" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Zodiac-Style */}
                                            <div className="Zodiac-Style-section ">
                                                <div className="title pb-3">
                                                    Zodiac Style
                                                </div>
                                                <div className="Zodiac-Style-inner-description">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-sm-6 col-md-4  col-6 mb-2">
                                                            <InputCheckbox
                                                                checkBoxName="Zodiac[1][]"
                                                                onClick={() => handleZodiac("/zodiac/Aries.png")}
                                                                defaultValue="5"
                                                                className="checkbox-input radio"
                                                                checkBoxType="Zodiac"
                                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                                    <img src="/zodiac/Aries.png" width="85px" height="85px" />
                                                                </span>}
                                                            />
                                                        </div>
                                                        <div className="col-lg-4 col-sm-6 col-md-4 col-6 mb-2">
                                                            <InputCheckbox
                                                                checkBoxName="Zodiac[1][]"
                                                                defaultValue="6"
                                                                onClick={() => handleZodiac("/zodiac/Libra.png")}
                                                                className="checkbox-input radio"
                                                                checkBoxType="Zodiac"
                                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                                    <img src="/zodiac/Libra.png" width="85px" height="85px" />
                                                                </span>}
                                                            />
                                                        </div>
                                                        <div className="col-lg-4 col-sm-6 col-md-4 col-6 mb-2">
                                                            <InputCheckbox
                                                                checkBoxName="Zodiac[1][]"
                                                                defaultValue="1"
                                                                onClick={() => handleZodiac("/zodiac/Virgo.png")}
                                                                className="checkbox-input radio"
                                                                checkBoxType="Zodiac"
                                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                                    <img src="/zodiac/Virgo.png" width="85px" height="85px" />
                                                                </span>}
                                                            />
                                                        </div>
                                                        {/* <div className="col-lg-4 col-sm-6 col-md-4 col-6 mb-2">
                                                    <InputCheckbox
                                                        checkBoxName="Zodiac[1][]"
                                                        defaultValue="6"
                                                        onClick={() => handleZodiac("/zodiac/Libra.png")}
                                                        className="checkbox-input radio"
                                                        checkBoxType="Zodiac"
                                                        addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                            <img src="/zodiac/Libra.png" width="85px" height="85px" />
                                                        </span>}
                                                    />
                                                </div> */}
                                                    </div>
                                                    {/* <div className="d-flex justify-content-between flex-wrap">
                                                <InputCheckbox
                                                    checkBoxName="Zodiac[1][]"
                                                    onClick={() => handleZodiac("/zodiac/Aries.png")}
                                                    defaultValue="5"
                                                    className="checkbox-input radio"
                                                    checkBoxType="Zodiac"
                                                    addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                        <img src="/zodiac/Aries.png" width="85px" height="85px" />
                                                    </span>}
                                                />
                                                <InputCheckbox
                                                    checkBoxName="Zodiac[1][]"
                                                    defaultValue="6"
                                                    onClick={() => handleZodiac("/zodiac/Libra.png")}
                                                    className="checkbox-input radio"
                                                    checkBoxType="Zodiac"
                                                    addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                        <img src="/zodiac/Libra.png" width="85px" height="85px" />
                                                    </span>}
                                                />
                                                <InputCheckbox
                                                    checkBoxName="Zodiac[1][]"
                                                    defaultValue="1"
                                                    onClick={() => handleZodiac("/zodiac/Virgo.png")}
                                                    className="checkbox-input radio"
                                                    checkBoxType="Zodiac"
                                                    addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                        <img src="/zodiac/Virgo.png" width="85px" height="85px" />
                                                    </span>}
                                                />
                                            </div> */}
                                                    {/* <InputCheckbox
                                                checkBoxName="Zodiac[1][]"
                                                defaultValue="7"
                                                className="checkbox-input radio"
                                                checkBoxType="Zodiac"
                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                    jjlssasas
                                                </span>}
                                            />
                                            <InputCheckbox
                                                checkBoxName="Zodiac[1][]"
                                                defaultValue="8"
                                                className="checkbox-input radio"
                                                checkBoxType="Zodiac"
                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                    jjlssasas
                                                </span>}
                                            />
                                            <InputCheckbox
                                                checkBoxName="Zodiac[1][]"
                                                defaultValue="9"
                                                className="checkbox-input radio"
                                                checkBoxType="Zodiac"
                                                addSpan={<span className="checkbox-tile Zodiac-Style-div">
                                                    jjlssasas
                                                </span>}
                                            /> */}

                                                </div>
                                            </div>
                                            {/* Category-Button-Style */}
                                            <div className="Category-Button-Style-section">
                                                <div className="title pb-3">
                                                    Category Button Style
                                                </div>
                                                <div className="Category-Button-Style-description">
                                                    {/* Fill */}
                                                    <label className="pb-3">Fill</label>
                                                    <div className="d-flex justify-content-between">
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-fill"
                                                            onClick={handleButtonStyle}
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-fill"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-rounded"
                                                            onClick={handleButtonStyle}
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-rounded"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-full-rounded"
                                                            onClick={handleButtonStyle}
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-full-rounded"></div>
                                                            </span>}
                                                        />
                                                    </div>
                                                    {/* Outline */}
                                                    <label className="pb-3 Outline-title">Outline</label>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-border"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-border"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-rounded-border"
                                                            onClick={handleButtonStyle}
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-rounded-border"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-full-rounded-border"
                                                            onClick={handleButtonStyle}
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-full-rounded-border"></div>
                                                            </span>}
                                                        />
                                                    </div>
                                                    {/* Hard shadow */}
                                                    <label className="pb-3 hardShadow-title">Hard shadow</label>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <InputCheckbox
                                                            onClick={handleButtonStyle}
                                                            checkBoxName="ButtonStyle[1][]"
                                                            value="square-hardShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-hardShadow"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-rounded-hardShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-rounded-hardShadow"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-full-rounded-hardShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-full-rounded-hardShadow"></div>
                                                            </span>}
                                                        />
                                                    </div>
                                                    {/* Soft shadow */}
                                                    <label className="pb-3 softShadow-title">Soft shadow</label>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-SoftShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-SoftShadow"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-rounded-SoftShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-rounded-SoftShadow"></div>
                                                            </span>}
                                                        />
                                                        <InputCheckbox
                                                            checkBoxName="ButtonStyle[1][]"
                                                            onClick={handleButtonStyle}
                                                            value="square-full-rounded-SoftShadow"
                                                            className="checkbox-input radio"
                                                            checkBoxType="Zodiac"
                                                            addSpan={<span className="checkbox-tile ">
                                                                <div className="square square-full-rounded-SoftShadow"></div>
                                                            </span>}
                                                        />
                                                    </div>
                                                    {/* Spacial upgrade */}
                                                    {/* <label className="pb-3 Spacial-Upgrade-title">Spacial
                                                <span className="ms-2 Spacial-Upgrade">Upgrade
                                                    <FontAwesomeIcon className="ps-2" icon={faLock} style={{ Color: "#ffffff" }}></FontAwesomeIcon>
                                                </span>
                                            </label> */}
                                                    <div className="d-flex align-items-center">
                                                        {/* <div className="square square-SoftShadow me-2"></div>
                                                <div className="square square-rounded-SoftShadow me-2"></div>
                                                <div className="square square-full-rounded-SoftShadow"></div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Category Button Style */}
                                            <div className="Category-Button-Style-section">
                                                <div className="title pb-3">
                                                    Category Button Color
                                                </div>
                                                <div className="Category-Button-Style-description">
                                                    <div className="cusotom-color-picker d-flex">
                                                        <div className="color-picker-box"></div>
                                                        <label className="color-picker-detail" htmlFor="colorPicker">
                                                            <div className="color-picker-label-name">Button color</div>
                                                            <div id="colorCode">#813737</div>
                                                        </label>
                                                        <input type="color" onChange={(e) => setCategoryBtnColor(e.target.value)} className="color-input-feild" defaultValue="#813737" id="colorPicker" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Category Button font Style  */}
                                            <div className="Category-Button-Style-section">
                                                <div className="title pb-3">
                                                    Category Button Font Color
                                                </div>
                                                <div className="Category-Button-Style-description">
                                                    <div className="cusotom-color-picker d-flex">
                                                        <div className="Categorycolor-picker-box"></div>
                                                        <label className="color-picker-detail" htmlFor="CategoryColorPicker">
                                                            <div className="color-picker-label-name">Button color</div>
                                                            <div id="CategoryColorCode">{categoryBtnFontColor}</div>
                                                        </label>
                                                        <input type="color" onChange={(e) => setCategoryBtnFontColor(e.target.value)} className="color-input-feild" value={categoryBtnFontColor} id="CategoryColorPicker" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* font */}
                                            <div className="font-Style-section">
                                                <div className="title pb-3">
                                                    Font
                                                </div>
                                                <div className="font-Style-description">
                                                    {/* font-family */}
                                                    <div className="fontStyle-title pb-3">Font</div>
                                                    <div className="fontStyle-picker d-flex" onClick={handleShow}>
                                                        <div className="font-box" style={{ fontFamily: fontFamaily }} >Aa</div>
                                                        <span className="ps-3" name="Arvo" style={{ fontFamily: fontFamaily }}>{fontFamaily}</span>
                                                    </div>
                                                    {/* color */}
                                                    <div className="Color-title pb-3">Color</div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="Fontcolor-picker-box"></div>
                                                        <label className="color-picker-detail" htmlFor="FontColorPicker">
                                                            <div className="color-picker-label-name">Font color</div>
                                                            <div id="FontColorCode">#000000</div>
                                                        </label>
                                                        <input type="color" onChange={(e) => setFontColorCode(e.target.value)} className="color-input-feild" defaultValue="#000000" id="FontColorPicker" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Model isModel={show} showModel={handleShow} hideModel={handleClose} className="fontStyle-model" />
                                    </div>
                                </div>
                                {/* {isMobilePreview ? } */}
                                <div className={`col-lg-4 col-sm-12 col-md-12 ${isMobilePreview}`}>

                                    <div className="buttons-group action-profile-button-group d-flex mt-1 ms-5">
                                        <button className="schedule-button" onClick={handleProfileSave}>Save</button>
                                        <div className="position-reletive template-index">
                                            <button ref={dropdownRef} onClick={handleSaveTempleteDropDown} className="save-as-template-button me-3 "><span> {saveAsTemplateName}</span>
                                                <span className="ps-2" ><FontAwesomeIcon icon={faChevronDown} style={{ rotate: isDropDown && "180deg" }} /></span>
                                            </button>

                                            <div className="save-templet-dropDown position-absolute z-index-1000" style={{ display: isDropDown ? "block" : "none" }}>
                                                <div className="allTemplet-list">
                                                    {/* <div className="pb-2 fw-bold" onClick={ShowSavePopup} style={{ cursor: "pointer" }}>+ Create template</div> */}
                                                    {allTemplet?.map((item, index) => (
                                                        <div className="" key={index}>
                                                            <div className="p-1 allTemplet-name" onClick={() => handleTempleteDesign(item.id, item.name)}>{item.name}</div>
                                                        </div>

                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="Mobile-section d-flex justify-content-end">
                                        <div className="preview-wrap preview-wrap-action-profile">
                                            <div ref={componentRef} className="h-100 preview-componentRef-div" style={{ backgroundImage: `url(${backgroundImage}` }}>
                                                {/* close button */}
                                                <div className="preview-close-btn" onClick={handlepreview}>
                                                    <span className="close-btn"><FontAwesomeIcon icon={faClose} size='2xl' /></span>
                                                </div>
                                                <div className="Mobile-preview-scroll">
                                                    {/* profile-image */}
                                                    {base64String != "" ?
                                                        <div className="mobile-profile-circle">

                                                            <img src={base64String}
                                                                alt="Converted to base64"
                                                                className="mobile-profile-img"
                                                                width="80px"
                                                                height="80px"
                                                            /> :
                                                            {/* <p className="useName-profile-letter d-flex align-items-center justify-content-center h-100">
                                            a
                                        </p> */}
                                                        </div> : ""}
                                                    <div className="profile-useName mt-1">{profileTitle}</div>
                                                    <div className="profile-ZodiacName  d-flex align-items-center justify-content-center my-3">
                                                        <img src={zodiacImage} width="40px" height="40px" />
                                                        <span className="ps-2" style={{ color: fontColor, fontFamily: fontFamaily }}>{zodiacName}</span>
                                                    </div>
                                                    <div className="Horoscope-Categories  mt-4 mb-2" style={{
                                                        backgroundColor: handleButtonStylesheet(), color: categoryBtnFontColor,
                                                        border: handleButtonOutLines(),
                                                        boxShadow: btnStyle == "square-fill" || btnStyle == "square-rounded" || btnStyle == "square-full-rounded" || btnStyle == "square-border" || btnStyle == "square-rounded-border" || btnStyle == "square-full-rounded-border" ? "none" : btnStyle == "square-SoftShadow" || btnStyle == "square-rounded-SoftShadow" || btnStyle == "square-full-rounded-SoftShadow" ? handleButtonSoftShadow() : handleButtonHardShadow(),
                                                        fontFamily: fontFamaily,
                                                        borderRadius: btnStyle == "square-fill" ? "0px" : btnStyle == "square-rounded" ? "10px" : btnStyle == "square-full-rounded" ? "25px" : btnStyle == "square-border" ? "0px" : btnStyle == "square-rounded-border" ? "10px" : btnStyle == "square-full-rounded-border" ? "25px" : btnStyle == "square-hardShadow" ? "0px" : btnStyle == "square-rounded-hardShadow" ? "10px" : btnStyle == "square-full-rounded-hardShadow" ? "25px" : btnStyle == "square-SoftShadow" ? "0px" : btnStyle == "square-rounded-SoftShadow" ? "10px" : btnStyle == "square-full-rounded-SoftShadow" ? "25px" : ""
                                                    }}>
                                                        {categories.find(category => category.value === selectedCategories[0])?.name}
                                                    </div>
                                                    <div className="Horoscope-Categories-description" style={{ color: fontColor, fontFamily: fontFamaily }}>
                                                        {cat1 != "" ? cat1 : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}
                                                    </div>
                                                    <div className="Horoscope-Categories mt-4 mb-2" style={{
                                                        backgroundColor: handleButtonStylesheet(), color: categoryBtnFontColor,
                                                        border: handleButtonOutLines(),
                                                        boxShadow: btnStyle == "square-fill" || btnStyle == "square-rounded" || btnStyle == "square-full-rounded" || btnStyle == "square-border" || btnStyle == "square-rounded-border" || btnStyle == "square-full-rounded-border" ? "none" : btnStyle == "square-SoftShadow" || btnStyle == "square-rounded-SoftShadow" || btnStyle == "square-full-rounded-SoftShadow" ? handleButtonSoftShadow() : handleButtonHardShadow(),
                                                        fontFamily: fontFamaily,
                                                        borderRadius: btnStyle == "square-fill" ? "0px" : btnStyle == "square-rounded" ? "10px" : btnStyle == "square-full-rounded" ? "25px" : btnStyle == "square-border" ? "0px" : btnStyle == "square-rounded-border" ? "10px" : btnStyle == "square-full-rounded-border" ? "25px" : btnStyle == "square-hardShadow" ? "0px" : btnStyle == "square-rounded-hardShadow" ? "10px" : btnStyle == "square-full-rounded-hardShadow" ? "25px" : btnStyle == "square-SoftShadow" ? "0px" : btnStyle == "square-rounded-SoftShadow" ? "10px" : btnStyle == "square-full-rounded-SoftShadow" ? "25px" : ""
                                                    }}>
                                                        {categories.find(category => category.value === selectedCategories[1])?.name}
                                                    </div>
                                                    <div className="Horoscope-Categories-description" style={{ color: fontColor, fontFamily: fontFamaily }}>
                                                        {cat2 != "" ? cat2 : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="preview-button-div">
                        <button className="preview-button" onClick={handlepreview}>
                            <span>
                                <span className="pe-2"><FontAwesomeIcon icon={faEye} /></span>
                                Preview
                            </span>
                        </button>
                    </div>
                    <SaveTempletModel isModel={isSaveModel} isHideModel={HideSavePopup} saveChanges={handleTemplate} getName={(e) => setTempletName(e.target.value)} />
                </div>
            </div>
        </>
    )
}
export default ActionProfile;