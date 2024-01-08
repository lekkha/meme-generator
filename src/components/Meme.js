import React from "react";
import domtoimage from "dom-to-image";


export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = React.useState([])

    const [imagePickerVisible, setImagePickerVisible] = React.useState(false)

    //no dependency since we just need to take the image info in the all memes array only once 
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => setAllMeme(data.data.memes))
    }, [])


    //randomly generate memeimgae ====> CLICKING IMAGE NOW 
    // function getMemeImage() {
    //     // const memesArray = allMemeImages.data.memes ==> all memes is an array itself now
    //     const randomNumber = Math.floor(Math.random() * allMeme.length)
    //     const url = allMeme[randomNumber].url
    //     setMeme(prevMeme => ({
    //         ...prevMeme, 
    //         randomImage : url
    //     })) 
    // }


    //controlled inputs + handel change to change input dynamically  
    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))

    }


    //on clicking image obtaining url and providing this in the image tag of the memecontainer 
    const handleImageClick = (image) => {
        setMeme({
            topText: "", // Reset top text
            bottomText: "",
            randomImage: image.url,
        });
        setImagePickerVisible(false)
    }


    // Handle text drag start
    const handleTextDragStart = (event, textType) => {
        event.dataTransfer.setData("textType", textType);
    }

    // Handle text drop
    const handleTextDrop = (event) => {
        event.preventDefault();
        // Get the text type from the data transfer
        const textType = event.dataTransfer.getData("textType");
        // Get the mouse coordinates
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        // Get the position of the image container
        const imgContainer = document.querySelector(".img--contianer");
        const imgContainerRect = imgContainer.getBoundingClientRect();
        const imgContainerX = imgContainerRect.left;
        const imgContainerY = imgContainerRect.top;
        // Calculate the position of the dropped text relative to the image container
        const textX = mouseX - imgContainerX;
        const textY = mouseY - imgContainerY;
        // Update the position of the dropped text in the meme state based on text type
        setMeme((prevMeme) => ({
            ...prevMeme,
            [textType]: prevMeme[textType],
            [`${textType}Position`]: { x: textX, y: textY },
        }));
    };



    // Handle drag over
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const canvasRef = React.useRef(null);


    //intead of top bottom use margin in css
    function downloadImg() {
        const image = document.querySelector(".img--contianer");
        const canvas = canvasRef.current;

        if (image && canvas) {
            const imageRect = image.getBoundingClientRect();
            canvas.width = imageRect.width;
            canvas.height = imageRect.height;

            domtoimage
                .toJpeg(image, { quality: 0.95 })
                .then(function (dataUrl) {
                    var link = document.createElement("a");
                    link.download = "Meme.jpeg";
                    link.href = dataUrl;
                    link.click();
                });

        }
        else {
            console.error("Container or canvas is not found.");
        }
    }


    return (
        <main>
            
            <div className="form">
                <div>
                    <label className="form--label">Top Text</label>
                    <input
                        type="text"
                        className="form--input"
                        placeholder="Shut up"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                        draggable
                        onDragStart={(event) => handleTextDragStart(event, "topText")}
                    />
                </div>
                <div>
                    <label className="form--label">Bottom Text</label>
                    <input
                        type="text"
                        className="form--input"
                        placeholder="and take my money"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                        draggable
                        onDragStart={(event) => handleTextDragStart(event, "bottomText")}
                    />
                </div>
                <button
                    className="form--button"
                    onClick={() => setImagePickerVisible(true)}
                >
                    Pick an image
                </button>

                <button className="download-btn" onClick={downloadImg}>Download</button>
            </div>

            {imagePickerVisible && (<div className="image--picker">
                {
                    allMeme.map((image) => (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={`Meme option ${image.id}`}
                            onClick={() => handleImageClick(image)}
                        />
                    ))
                }
            </div>)}

            <div
                className="img--contianer"
                id="image"
                onDragOver={handleDragOver}
                onDrop={handleTextDrop}

            >
                <img src={meme.randomImage} className="meme--img" alt="generated img" />

                <h2
                    className="meme--text top"
                    draggable
                    onDragStart={(event) => handleTextDragStart(event, "topText")}
                    style={{
                        left: meme.topTextPosition ? `${meme.topTextPosition.x}px` : "20vw",
                        top: meme.topTextPosition ? `${meme.topTextPosition.y}px` : "20vh",
                    }}
                >
                    {meme.topText}
                </h2>

                <h2
                    className="meme--text bottom"
                    draggable
                    onDragStart={(event) => handleTextDragStart(event, "bottomText")}
                    style={{
                        left: meme.bottomTextPosition ? `${meme.bottomTextPosition.x}px` : "30vw",
                        top: meme.bottomTextPosition ? `${meme.bottomTextPosition.y}px` : "30vh",
                    }}
                >
                    {meme.bottomText}
                </h2>

            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />

        </main>
    )
}
