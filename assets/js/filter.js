// Get all the icons on the page on script start
const icons = document.getElementsByClassName('icon-preview')

// Functions that generates the image urls with the changed attributes
const getColorChanged = (sourcePath, color) => {
    // Get the current color and replace the string
    const currentColor = sourcePath.split('/').at(-2)
    const newSource = sourcePath.replaceAll(currentColor, color)
    return newSource
}

const getAlignmentChanged = (sourcePath, alignment) => {
   // Get the current alignment and replace the string
   const currentAlignment = soucePath.split('/').at(-3)
   const newSource = sourcePath.replaceAll(currentAlignment, alignment)
   return newSource
}

// Functions that makes the changes
function changeColor(color) {
    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getColorChanges(currentSource, color)
        icon.src = newSource
    })
}

function changeAlignment(alignment) {
    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getAlignmentChanged(currentSource, alignment)
        icon.src = newSource
    })
}

// Function that copies the svg
const copyToClipboard = async (element) => {

    // The svg
    const svg = await element.getElementsByTagName("svg")[0]

    // The button
    const btn = await element.getElementsByTagName("button")[0]
    const theText = await btn.innerText

    // Generate the dataUrl and write it to the clipboard
    const dataUrl = generateUrl(svg)
    navigator.clipboard.writeText(dataUrl)

    // Show message
    btn.innerText = "✅ Copied!"
    setTimeout(() => btn.innerText = theText, 2500)

}
