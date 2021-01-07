const style =
    `
.author-name{
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 1.5rem;
}
.time{
    font-size: 16px;
    margin-bottom: 10px;
}
.post-item{
    border-radius: 10px;
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 15px; 
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.5rem;
    background-color:#f5f1ecff;
}
.image{
    width: 56vw;
    height: 50vh;
}
#like{
    font-size: 1.5rem;
    color: red;
    display: flex;
    cursor: pointer;
}
#share{
    font-size: 1.5rem;
    color: blue;
    margin-top: 1vh; 
    display: flex;
    cursor: pointer;
}
.flex{
    display: flex;
    justify-content: space-evenly;
    margin-top: 3vh;
}
#like1, #share1{
    margin-left: 0.5vw;
    color: black;
}
`
import { convertDate } from '../uitil.js'
import { getDataFromDoc } from '../uitil.js'
class PostItem extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.time = convertDate(this.getAttribute('time'))
        this.author = this.getAttribute('author')
        this.content = this.getAttribute('content')
        this.img = this.getAttribute('img')
        this.share = this.getAttribute('share')
        this.like = this.getAttribute('like')
        this.id = this.getAttribute('id')
        const imgElm = this.img !== '' ? `<img class="image" src="${this.img}">` : ''
        this._shadowDom.innerHTML =
            `
        <div class="post-item">
            <div class="author-name">${this.author}</div>
            <div class="time">${this.time}</div>
            <div class="content">
                ${this.content}
            </div>
            <div class="flex">
                <div id='like'>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <div id='like1'>
                        ${this.like}
                    </div>
                </div>
                <div id="share">
                    <i class="fa fa-share" aria-hidden="true"></i>
                    <div id='share1'>
                        ${this.share}
                    </div>
                </div>
            </div>
        </div>
        <style>${style}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        `
        this._shadowDom.getElementById('like').addEventListener('click', async() => {
            let b = await firebase.firestore().collection('posts').doc(this.id).get()
            b = getDataFromDoc(b)    
            this._shadowDom.getElementById('like1').innerHTML = `${Number(b.like) + 1}`
            let a = { 
                like: `${Number(b.like) + 1}`,
            }
            firebase.firestore().collection('posts').doc(this.id).update(a)
        })

        this._shadowDom.getElementById('share').addEventListener('click', async() => {
            let b = await firebase.firestore().collection('posts').doc(this.id).get()
            b = getDataFromDoc(b)    
            this._shadowDom.getElementById('share1').innerHTML = `${Number(b.share) + 1}`
            let a = { 
                share: `${Number(b.share) + 1}`,
            }
            firebase.firestore().collection('posts').doc(this.id).update(a)
        })
    }

}
window.customElements.define('post-item', PostItem)