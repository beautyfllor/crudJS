'use strict'

const imagePreview = (idFile, idImage) => {
    const file = document.getElementById(idFile).files[0]
    const preview = document.getElementById(idImage)
    const fileReader = new FileReader() //Quem vai ler o arquivo

    if (file) {
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => preview.src = fileReader.result
    }
}

export {imagePreview}