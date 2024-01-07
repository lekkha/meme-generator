import React from "react";
// import memesData from "../memesData";

export default function Meme(){

    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "", 
        randomImage : "http://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = React.useState([])

    //no dependency since we just need to take the image info in the all memes array only once 
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
              .then((response) => response.json())
              .then((data) => setAllMeme(data.data.memes))
    }, [])

    
    //randomly generate memeimgae
    function getMemeImage() {
        // const memesArray = allMemeImages.data.memes ==> all memes is an array itself now
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImage : url
        })) 
    }
//controlled inputs + handel change to change input dynamically  
    function handleChange(event){
        const {name,value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value 
        }))

    }


    return(
        <main>
            <div className="form">
                <div>
                    <label className="form--label">Top Text</label>
                    <input 
                    type="text" 
                    className="form--input" 
                    placeholder="Shut up" 
                    name = "topText"
                    value = {meme.topText}
                    onChange={handleChange}
                    />
                </div>
                <div>
                     <label className="form--label">Bottom Text</label>
                     <input 
                     type="text" 
                     className="form--input" 
                     placeholder="and take my money" 
                     name = "bottomText"
                     value={meme.bottomText}
                     onChange={handleChange}
                     />
                </div>
                <button 
                className="form--button"
                onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
                <button className="download-btn">Download</button>
            </div>

            <div className="img--contianer">
                  <img src = {meme.randomImage} className="meme--img" />  
                  <h2 className="meme--text top">{meme.topText}</h2> 
                  <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}
