//Gets specific string fragments from a 2 dimentinal array, the following works to extract pdf data from arrays / json 

//most atomic function, extracts the codes from string slices 
function ExtractFSContentsFomString(stringElement) {
    results = []
    pivotStart = 0
    checking = false
    console.log("FS CONTENTS ON: " + stringElement)
    for (idx = 0; idx < stringElement.length; idx++) {

        if (stringElement[idx] === "F" && stringElement[idx + 1] === "S" && !checking) {
            checking = true
            pivotStart = idx
            //increase to avoid S
            idx++
            console.log("FS COUNTING")
        } else {

            if ((checking && !stringElement[idx].match(/^\d+$/)) || (checking && idx == stringElement.length - 1)) {
                console.log("closurer: " + stringElement[idx])
                pivotEndings = idx
                checking = false
                subSet = stringElement.slice(pivotStart, idx)
                results = results.concat(subSet)
            }
        }
    }
    console.log('sub results: ' + results)
    return results
}


//upper level function, gets the main slices chooped and review to obtain final slice
function PDFFSExtractor(mainArray) {

    finalArray = []

    for (i = 0; i < mainArray.length; i++) {
        console.log("interating")
        for (subI = 0; subI < mainArray[i].length; subI++) {
            //checks string that may containt FS DATA
            if (String(mainArray[i][subI])) {
                var FSSubARRAYSExtracted = [];
                //eg '00 2324 FS024242'
                FSSubARRAYSExtracted = ExtractFSContentsFomString(mainArray[i][subI])
                if (FSSubARRAYSExtracted.length != 0) {
                    finalArray = finalArray.concat(FSSubARRAYSExtracted)
                }
            }
        }
    }

    return finalArray
}

//call out...
function main() {
    console.log('hello')
    console.log('final results: ' + PDFFSExtractor([[""], [0, 0, 0, 2, 3, '  3    FS000009 vF000009 FS000009', 034, 'F000009'], [], [2, 3333]]))
}

main()
