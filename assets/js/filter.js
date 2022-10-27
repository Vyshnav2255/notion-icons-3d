// Get all the icons on the page on page load
let icons
window.addEventListener('load', () => {
    icons = [...document.getElementsByClassName('icon-preview')]
})

// Function that changes the button focus
const changeFocus = (group, button) => {

    // Choose the group of buttons
    const parentDiv = group == "color" ? document.getElementById('color-group') : document.getElementById('angle-group')

    let buttons = [...parentDiv.getElementsByTagName('button')]
    const currentButton = button + "-group"
    
    // Remove the current focus
    buttons.forEach((button) => {button.classlist.remove('active')})
    
    // Add the focus to the clicked button
    document.getElementById(currentButton).classlist.add('active')
}

// Functions that generates the image urls with the changed attributes
const getColorChanged = (sourcePath, color) => {
    // Get the current color and replace the string
    const currentColor = sourcePath.split('/').at(-2)
    const newSource = sourcePath.replaceAll(currentColor, color)
    return newSource
}

const getAngleChanged = (sourcePath, angle) => {
   // Get the current angle and replace the string
   const currentAngle = sourcePath.split('/').at(-3)
   const newSource = sourcePath.replaceAll(currentAngle, angle)
   return newSource
}

// Functions that makes the changes
function changeColor(color) {
    // Change the filter-button focus
    changeFocus('color', color)

    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getColorChanged(currentSource, color)
        icon.src = newSource
    })
}

function changeAngle(angle) {
    // Change the filter-button focus
    changeFocus('angle', angle)

    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getAngleChanged(currentSource, angle)
        icon.src = newSource
    })
}

// Function that copies the image
const copyToClipboard = async (element) => {

    // The img
    const img = await element.getElementsByTagName("img")[0]

    // The button
    const btn = await element.getElementsByTagName("button")[0]
    const theText = await btn.innerText

    // Generate the dataUrl and write it to the clipboard
    const theSource = await fetch(img.src)
    const theBlob = await theSource.blob()

    // Use the FileReader API to generate the image URL
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        const dataUrl = fileReader.result
        navigator.clipboard.writeText(dataUrl)

        // Show message
        btn.innerText = "✅ Copied!"
        setTimeout(() => btn.innerText = theText, 2500)
    }
    fileReader.readAsDataURL(theBlob)
}

// Function that downloads the SVG
const downloadIcon = async (e) => {

    // get the image's url
    const theURL = await e.getElementsByTagName("img")[0].src
    
    // create a downloadable element
    const theLink = document.createElement('a')
    theLink.href = theURL
    theLink.download = e.id + "-icon.png"
    theLink.click()
}