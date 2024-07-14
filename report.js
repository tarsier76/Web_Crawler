export { printReport }

function printReport(pages) {
    console.log('Report is starting...')
    const sortedArray = sortByNumber(pages)
    for (const key in sortedArray) {
        console.log(`Found ${sortedArray[key]} internal links to ${key}`)
    }
}

function sortByNumber(object) {
    const keyValuePairs = Object.entries(object);
    keyValuePairs.sort((a, b) => b[1] - a[1]);
    const sortedObj = Object.fromEntries(keyValuePairs);
    return sortedObj
}

