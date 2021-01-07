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
            width: 70%;
            margin: auto;
            margin-top: 20px;
            text-align: right;
            
        }
        #create-post textarea{
            width: 53vw;
            border: 1px solid #dbdbdb;
            border-radius: 10px;
            outline: none;
            resize: none;
            height: 10vh;
            padding: 1vw;
            font-size: 1.2rem;
            background-color:#f5f1ecff;
        }
        @import url(https://fonts.googleapis.com/css?family=BenchNine:700);
.snip1582 {
  background-color: #c47135;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'BenchNine', Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 0px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}

.snip1582:before,
.snip1582:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}

.snip1582:before {
  border-color: #c47135;
  border-top-width: 2px;
  left: 0px;
  top: -5px;
}

.snip1582:after {
  border-bottom-width: 2px;
  border-color: #c47135;
  bottom: -5px;
  right: 0px;
}

.snip1582:hover,
.snip1582.hover {
  background-color: #c47135;
}

.snip1582:hover:before,
.snip1582.hover:before,
.snip1582:hover:after,
.snip1582.hover:after {
  height: 100%;
  width: 100%;
}


Resources
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
        
            <form id="create-post">
                <div id="q">
                    <textarea wrap="soft|hard" autofocus name="content" id="content" row="6" placeholder="What is your dream?"></textarea>
                </div>
                <button class="snip1582">Post</button>
            </form>
        
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
                    like: `0`,
                    share: `0`,
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
