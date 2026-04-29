const filter = {

}

const imageCanvas =document.querySelector("#imge-canvas");
const imageinput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d")
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








imageinput.addEventListener("change", (event) => {

    file = event.target.files[0];

    const imageplaceholder = document.querySelector(".placeholder_img");

    imageplaceholder.style.display = "none";

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {

        image = img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        canvasCtx.filter = "none";

        canvasCtx.drawImage(
            img,
            0,
            0,
            imageCanvas.width,
            imageCanvas.height
        );
    };

    console.log("change event fired");
});














function applyfilters() {

    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
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

    canvasCtx.drawImage(
        image,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
    );
}