let filter = {

}

const imageCanvas =document.querySelector("#imge-canvas");
const imageinput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d")
const resetbtn =document.querySelector("#reset_btn")
const downloadbtn =document.querySelector("#download_btn")
const presetContainer = document.querySelector(".presets")

let  file =null;
let image = null
const filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturate: { value: 100, min: 0, max: 200, unit: "%" }, 
    hueRotate: { value: 0, min: 0, max: 360, unit: "deg" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    blur: { value: 0, min: 0, max: 20, unit: "px" }, // 200px is too much; 20px is better
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
};

const filterContainer = document.querySelector(".filters");

// Fixed function name typo: "creat" to "create"
function createFilterElement(name, unit, value, min, max) {
    const div = document.createElement("div"); // Fixed missing dot: document.createElement
    div.classList.add("filter");

    const p = document.createElement("p");
    p.innerText = `${name}`//: ${value}${unit}`; // Label with the current value

    const input = document.createElement("input");
    input.type = "range";
    
    // Fixed: Use the correct properties for range inputs
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
       filters[name].value = input.value 
       applyfilters()
       //console.log(name ,filters[name])
        // console.log(name)
    })

    return div;
}

// Fixed: Corrected the loop and container variable

Object.keys(filters).forEach(key => {
    const config = filters[key];

    const filterElement = createFilterElement(
        key,
        config.unit,
        config.value,
        config.min,
        config.max
    );

    // Fixed: filterContainer is not an array, so remove [0]
    filterContainer.appendChild(filterElement);
});




imageinput.addEventListener("change" , (event)=> {

    file = event.target.files[0]
    const imageplaceholder =document.querySelector(".placeholder_img")
    imageCanvas.style.display = "block"
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


function applyfilters(){
    canvasCtx.filter =`

    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `;
    canvasCtx.drawImage(image ,0, 0, imageCanvas.width, imageCanvas.height);
}




const defaultFilters = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hueRotate: 0,
    grayscale: 0,
    blur: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
};

resetbtn.addEventListener("click", () => {

    Object.keys(defaultFilters).forEach(key => {

        filters[key].value = defaultFilters[key];

        const slider = document.getElementById(key);

        slider.value = defaultFilters[key];
    });

    applyfilters();
});


downloadbtn.addEventListener("click", () => {

    const link = document.createElement("a");

    // file name
    link.download = "edited-image.png";

    // canvas image
    link.href = imageCanvas.toDataURL();

    // auto click
    link.click();
});


const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotate: 0,
        grayscale: 0,
        blur: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 120,
        saturate: 80,
        hueRotate: 10,
        grayscale: 10,
        blur: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 95,
        contrast: 130,
        saturate: 60,
        hueRotate: 0,
        grayscale: 25,
        blur: 0,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 180,
        saturate: 70,
        hueRotate: 0,
        grayscale: 20,
        blur: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 105,
        contrast: 110,
        saturate: 120,
        hueRotate: 180,
        grayscale: 0,
        blur: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 110,
        contrast: 115,
        saturate: 130,
        hueRotate: 15,
        grayscale: 0,
        blur: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    blackWhite: {
        brightness: 100,
        contrast: 140,
        saturate: 0,
        hueRotate: 0,
        grayscale: 100,
        blur: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 120,
        contrast: 90,
        saturate: 120,
        hueRotate: 20,
        grayscale: 0,
        blur: 2,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 110,
        contrast: 160,
        saturate: 180,
        hueRotate: 270,
        grayscale: 0,
        blur: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 105,
        contrast: 80,
        saturate: 70,
        hueRotate: 0,
        grayscale: 10,
        blur: 0,
        sepia: 20,
        opacity: 90,
        invert: 0
    }
};

Object.keys(presets).forEach((presetName) => {

    const presetElement = document.createElement("button");

    presetElement.innerText = presetName;

    presetElement.classList.add("btn");

    presetContainer.appendChild(presetElement);

    presetElement.addEventListener("click", () => {


        const preset = presets[presetName];

        Object.keys(preset).forEach((filterName) => {

            if (filters[filterName]) {
                filters[filterName].value = preset[filterName];
            }

        });

        
        applyfilters();
        //filterContainer.innerHTML = "";
        createfilters();
        
        //applyFilters();
        filterContainer.innerHTML = "";

    });

});