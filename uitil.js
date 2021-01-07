export function getDataFromDoc(doc) {
    const data = doc.data()
    data.id = doc.id
    return data
}

export function getDataFromDocs(data) {
    return data.docs.map(getDataFromDoc)
}
/**
 * 
 * @param {string} key 
 * @param {object} value 
 */
export function saveToLocalStorege(key, value)
{
    localStorage.setItem(key, JSON.stringify(value))
}

export function getItemToLocalStorege(key)
{
    return JSON.parse(localStorage.getItem(key))
}

export function removeItemFromLocalStorage(key)
{
    localStorage.removeItem(key)
}

/**
 * 
 * @param {*} dateStr
 * 14/12/2020 21:20 
 */
export function convertDate(dateStr)
{
    const date = new Date(dateStr)
    const day = validateNiceNumber(date.getDate())
    const month = validateNiceNumber(date.getMonth() +1)
    const year = date.getFullYear()
    const hour = validateNiceNumber(date.getHours())
    const mintes = validateNiceNumber(date.getMinutes())
    return `${day}/${month}/${year} ${hour}:${mintes}`
}

function validateNiceNumber(Number)
{
    return Number < 10 ? ('0' + Number) : (Number)
    //                     true             false
}

export async function uploadFileToFirestorage(file)
{
    //tạo đường dẫn đến file
    const fileName = file.name
    const filePath =  `file/${fileName}`
    const ref = firebase.storage().ref().child(filePath)
    await ref.put(file)
    return getFileUrl(ref)
}

function getFileUrl(fileRef) {
    return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
}
