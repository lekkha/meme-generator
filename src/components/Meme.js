import React from "react";

export default function Meme(){
    return(
        <main>
            <div className="form">
                <div>
                    <label className="form--label">Top Text</label>
                    <input type="text" className="form--input" placeholder="Shut up" />
                </div>
                <div>
                     <label className="form--label">Bottom Text</label>
                     <input type="text" className="form--input" placeholder="and take my money" />
                </div>
                <button className="form--button">Get a new meme image</button>
            </div>
        </main>
    )
}