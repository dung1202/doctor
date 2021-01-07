
const style =
`
    <style>
    #avatar{
        margin: 0vh 10vw;
        padding: 2vw;
        background-color: skyblue;
        height: 82vh;
        border-radius: 10px;
        text-align: center;
    }
    #file{
        text-align: center;
        outline: none;
    }
    #q{
        height: 50vh;
    }
    #content{
        font-size: 2rem;
    }
    </style>
`
class Avatar extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
        <form id="avatar">
            <div id="content">
                Avata you want
            </div>
            <div id="q">

            </div>
            <input type="file" id="file">
            <button class="post">Post</button>
        </form>
            ${style}
        `
    }
    
}
window.customElements.define('avatar-z', Avatar)