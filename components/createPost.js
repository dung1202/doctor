import { getItemToLocalStorege, uploadFileToFirestorage } from '../uitil.js'
const user = getItemToLocalStorege('currentUser')
// const style =
// `
//     <style>
//     #q{
//         display: flex;
//         justify-content: center;
//         border-radius: 1px;
//     }
//     #content{
//         margin-top: 60px;
//         clear:left;
//         width: 40vw;
//         height: 10vh;
//         resize: none;
//     }
//     .woa{
//         background-color: #b8c5d5;
//         margin: 0 10%;
//         height: 100vh;
//     }
//     button{
//         margin-left: 876px;
//         margin-top: 10px;
//     }
//     </style>
// `
const style =
    `
    <style>
        #create-post{
            width: 60%;
            margin: auto;
            margin-top: 20px;
            text-align: right;
        }
        #create-post textarea{
            width: 100%;
            border: 1px solid #dbdbdb;
            border-radius: 10px;
            outline: none;
            resize: none;
            height: 10vh;
        }
        .post{
            background-color: #d7c2d3;
            color: #222B5F;
            padding: 10px 15px;
            border-radius: 5px;
        }
    </style>
`
class createPost extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this._shadowDom.innerHTML =
            `
        <div class="woa">
            <form id="create-post">
                <div id="q">
                    <textarea autofocus name="content" id="content" row="6" placeholder="Bạn đang nghĩ gì"></textarea>
                    
                </div>
                <input type="file" id="file">
                <button class="post">Post</button>
            </form>
        </div>
            ${style}
        `
        const postFrom = this._shadowDom.getElementById('create-post')
        postFrom.addEventListener('submit', async (e) => {
            e.preventDefault() // chống load lại trang và gửi lên trang
            const content = postFrom.content.value
            // const content = this._shadowDom.getElementById('content').value.trim()
            if (content.trim() === '') {
                alert('vui lòng nhập nội dung bài viết')
            }
            else {
                const time = (new Date()).toISOString()
                const account = user.id
                const isshow = true
                const name = user.fullname



                const data =
                {
                    content: content,
                    authorname: name,
                    createBy: account,
                    createAt: time,
                    isshow: isshow,
                    comment: [],
                }

                const res = await firebase.firestore().collection('posts').add(data)
                const img = postFrom.file.files
                // console.log(img)
                if (img.length > 0) {
                    const image = img[0]
                    // console.log(image)
                    const url = await uploadFileToFirestorage(image)
                    this.updateListFile(url, res.id)
                }
            }
        })

    }
    updateListFile(url, id) {
        const dataUpdate = {
            files: firebase.firestore.FieldValue.arrayUnion(url)
        }
        firebase.firestore().collection('posts').doc(id).update(dataUpdate)
    }
}
window.customElements.define('create-post', createPost)
