const style =
    `
.author-name{
    font-weight: 600;
    margin-bottom: 5px;
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
    font-size: 16px;
}
.image{
    width: 56vw;
    height: 50vh;
}
`
import { convertDate } from '../uitil.js'
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
            const imgElm = this.img !== '' ? `<img class="image" src="${this.img}">` : ''
            this._shadowDom.innerHTML =
                `
        <div class="post-item">
            <div class="author-name">${this.author}</div>
            <div class="time">${this.time}</div>
            ${imgElm}
            <div class="content">
                ${this.content}
            </div>
        </div>
        <style>${style}</style>
        `
        }
    }
window.customElements.define('post-item', PostItem)