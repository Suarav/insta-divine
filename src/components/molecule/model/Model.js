import React, { useState } from "react";
import '../model/model.css'
import Modal from 'react-bootstrap/Modal';
const Model = (props) => {

    const handleFontFamaily = (data) => {
        props.showModel(data)
    }


    return (
        <>
            <Modal show={props.isModel} onHide={props.hideModel} className={props.className}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a font</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fontStyle-section-input pe-4">
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search by font name" />
                    </div>
                    <div className="fontStyle-model-scroll">
                        <div className="fontStyle-title mt-4 mb-3 ms-1">
                            Classic
                        </div>
                        <div className="">
                            <div className="fontStyle-name" style={{ fontFamily: "Arvo" }} onClick={() => handleFontFamaily("Arvo")}>Arvo</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Verdana" }} onClick={() => handleFontFamaily("Verdana")}>Verdana</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Calistoga" }} onClick={() => handleFontFamaily("Calistoga")}>Calistoga</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Lucida Sans" }} onClick={() => handleFontFamaily("Lucida Sans")}>Lucida Sans</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Century Gothic" }} onClick={() => handleFontFamaily("Century Gothic")}>Century Gothic</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Franklin Gothic Medium" }} onClick={() => handleFontFamaily("Franklin Gothic Medium")}>Franklin Gothic Medium</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Candara" }} onClick={() => handleFontFamaily("Candara")}>Candara</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Rockwell" }} onClick={() => handleFontFamaily("Rockwell")}>Rockwell</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Lucida Console" }} onClick={() => handleFontFamaily("Lucida Console")}>Lucida Console</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Comic Sans MS" }} onClick={() => handleFontFamaily("Comic Sans MS")}>Comic Sans MS</div>
                            <div className="fontStyle-name" style={{ fontFamily: "Brush Script MT" }} onClick={() => handleFontFamaily("Brush Script MT")}>Brush Script MT</div>
                        </div>
                        {/* <div className="fontStyle-title Modern-fontStyle-title mt-4 mb-3 ms-1">
                            Modern
                        </div>
                        <div className="">
                            <div className="fontStyle-name">Barlow</div>
                            <div className="fontStyle-name">Capriola</div>
                            <div className="fontStyle-name">DM Sans</div>
                            <div className="fontStyle-name">Gothic A1</div>
                            <div className="fontStyle-name">IBM Plex Sans</div>
                            <div className="fontStyle-name">Inter</div>
                            <div className="fontStyle-name">Karla</div>
                            <div className="fontStyle-name">Lato</div>
                            <div className="fontStyle-name">Montserrat</div>
                            <div className="fontStyle-name">Oswald</div>
                            <div className="fontStyle-name">Poppins</div>
                            <div className="fontStyle-name">Quicksand</div>
                            <div className="fontStyle-name">Raleway</div>
                            <div className="fontStyle-name">Roboto</div>
                            <div className="fontStyle-name">Rubik</div>
                            <div className="fontStyle-name">Work Sans</div>
                        </div> */}
                        {/* <div className="fontStyle-title Modern-fontStyle-title mt-4 mb-3 ms-1">
                            Unique
                        </div>
                        <div className="">
                            <div className="fontStyle-name">Bebas Neue</div>
                            <div className="fontStyle-name">Courgette</div>
                            <div className="fontStyle-name">Fredoka One</div>
                            <div className="fontStyle-name">Gothic A1</div>
                            <div className="fontStyle-name">IBM Plex Sans</div>
                            <div className="fontStyle-name">Inter</div>
                            <div className="fontStyle-name">Karla</div>
                            <div className="fontStyle-name">Lato</div>
                            <div className="fontStyle-name">Montserrat</div>
                            <div className="fontStyle-name">Oswald</div>
                            <div className="fontStyle-name">Poppins</div>
                        </div> */}
                    </div>



                </Modal.Body>
            </Modal >
        </>
    )
}
export default Model;