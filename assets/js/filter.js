// Get all the icons on the page on page load
let icons
window.addEventListener('load', () => {
    icons = [...document.getElementsByClassName('icon-preview')]
})

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
    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getColorChanged(currentSource, color)
        icon.src = newSource
    })
}

function changeAngle(angle) {
    // Iterate through the icons and change the source
    icons.forEach((icon) => {
        const currentSource = icon.src
        const newSource = getAngleChanged(currentSource, angle)
        icon.src = newSource
    })
}

// Function that copies the svg
const copyToClipboard = async (element) => {

    // The button
    const btn = await element.getElementsByTagName("button")[0]
    const theText = await btn.innerText

    // Generate the dataUrl and write it to the clipboard
    const theSource = await fetch(element.getElementsByTagName("img")[0].href)
    const imageBlob = await theSource.blob()
    await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: imageBlob
        })
      ])

    // Show message
    btn.innerText = "✅ Copied!"
    setTimeout(() => btn.innerText = theText, 2500)
}

// Function that downloads the SVG
const downloadIcon = async (e) => {

    // get the image's url
    const theURL = await e.getElementsByTagName("img")[0].href
    
    // create a downloadable element
    const theLink = document.createElement('a')
    theLink.href = theURL
    theLink.download = e.id + "-icon.png"
    theLink.click()
}