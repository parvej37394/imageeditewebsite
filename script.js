const filter = {

}


const filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturate: { value: 100, min: 0, max: 200, unit: "%" }, 
    hueRotate: { value: 0, min: 0, max: 360, unit: "deg" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    blur: { value: 0, min: 0, max: 20, unit: "px" }, // 200px is too much; 20px is better
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 0, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
};


const imageCanvas =document.querySelector("#imge-canvas");
const imageinput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d")
let  file =null;
let image = null


const filterContainer = document.querySelector(".filters")

imageinput.addEventListener("change" , (event)=> {

    file = event.target.files[0]
    const imageplaceholder =document.querySelector(".placeholder_img")
    imageplaceholder.computedStyleMap.display ="none"


    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image  = img
        imageCanvas.width =img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img , 0,0)
    }

    console.log("change even fired")
});


function creatFilterElement(name , unit  , value , min, max){
    const div = documentcreateElement("div");
    div.classList.add("filter");

    const input =document.createElement("input")
    input.type="range"
    input.min =min
    input.max = max
    input.value =value
    input.id =name

    const p = document.createElement("p");
    p.innerText =`${name}`


    div.appendChild(p)
    div.appendChild(input)


    input.addEventListener("input", (event)=>{
        console.log(input.value)
    })

    return div

}


Object.keys(filters).forEach(key => {

    const config = filters[key];
    
    const filterElement = createFilterElement(
        key ,
        config.unit ,
        config.value,
        config.min,
        config.max
    );

    

    filterContainer.appendChild(filterElement);
});