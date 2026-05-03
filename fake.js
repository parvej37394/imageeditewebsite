const widthInput = document.getElementById("img_width");
const heightInput = document.getElementById("img_height");
const qualityInput = document.getElementById("img_quality");
const resizeBtn = document.getElementById("apply_resize");

/* =========================
   IMAGE UPLOAD
========================= */

imageinput.addEventListener("change", (event) => {

    file = event.target.files[0];

    const imageplaceholder = document.querySelector(".placeholder_img");

    imageCanvas.style.display = "block";

    imageplaceholder.style.display = "none";

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {

        image = img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        // auto show width & height
        widthInput.value = img.width;
        heightInput.value = img.height;

        applyfilters();

    };

});

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

/* =========================
   APPLY FILTERS
========================= */

function applyfilters(){

    if(!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    filter = `

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


/* =========================
   RESIZE IMAGE
========================= */

resizeBtn.addEventListener("click", () => {

    if(!image) return;

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    imageCanvas.width = width;
    imageCanvas.height = height;

    applyfilters();

});


/* =========================
   DOWNLOAD IMAGE
========================= */

downloadbtn.addEventListener("click", () => {

    if(!image) return;

    const quality = parseFloat(qualityInput.value);

    const link = document.createElement("a");

    link.download = "edited-image.jpg";

    // compress image
    link.href = imageCanvas.toDataURL(
        "image/jpeg",
        quality
    );

    link.click();

});