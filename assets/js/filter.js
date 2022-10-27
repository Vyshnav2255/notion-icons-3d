// Get all the svgs on the page
const svgs = document.getElementsByClassName("feather")
console.log("the changes are there")

const changeColor = (color) => {
        
        // Iterate through the svgs and change the stroke color
        for(let i = 0; i < svgs.length; i++) {
            
                svgs[i].style.stroke = color

            }
    }


  // Funtion that generates the dataUrl
  const generateUrl = (element) => {

    // serialize and convert the svg into a dataUrl
    const theSerializer = new XMLSerializer()
    const preData = theSerializer.serializeToString(element)
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(preData)}`
    console.log(preData, dataUrl)

    return dataUrl
}

// Function that downloads the SVG
const downloadIcon = async (e) => {
        
        // get the svg element from the div
        const svg = await e.getElementsByTagName("svg")

        // generate the dataUrl
        const dataUrl = generateUrl(svg[0])
        
        // create a downloadable element
        const theLink = document.createElement('a')
        theLink.href = dataUrl
        theLink.download = e.id
        theLink.click()
    }

// Function that copies the svg
const copyToClipboard = async (element) => {

    // The svg
    const svg = await element.getElementsByTagName("svg")[0]

    // The button
    const btn = await element.getElementsByTagName("button")[0]
    const theText = await btn.innerText

    // Generate the dataUrl and write it to the clipboard
    const dataUrl = await generateUrl(svg)
    navigator.clipboard.writeText(dataUrl)

    // Show message
    btn.innerText = "✅ Copied!"
    setTimeout(() => btn.innerText = theText, 2500)
}
