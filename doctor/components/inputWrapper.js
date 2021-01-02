const style = ` 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
    .error{
        color: blue;
        margin-left: 5vw;
        font-family: 'Nerko One';
    }
    input{
        border-radius: 10px;
        width: 30vw;
        border: 0px solid black;
        padding: 12px;
        box-sizing: border-box;
        outline: none;
        font-family: 'Langar', cursive;
        font-size: 0.9rem;
        margin-left: 1.5vw;
    }
    .input-wrapper {
        margin-bottom: 10px;
        height: 9vh;
    }
    .flex{
        display: flex;
        margin-left: 1vw;
    }
    .icon{
        padding: 0.8vw;
        width: 1vw;
        font-size: 1.5rem;
        color: #A02C2D;
    }
    #iconl{
        padding: 1vw;
        width: 1vw;
        font-size: 1rem;
        color: white;
    }
    </style>
`
//border-box la tu border vao trong

class inputWrapper extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error') || ''
        this.icon = this.getAttribute('icon')
        this.iconl = this.getAttribute('iconl')

        if (this.iconl === '1') {
            this.iconl = ''
        }
        this._shadowRoot.innerHTML =
            `
            <div class="input-wrapper">
                <div class="flex">
                    <div class="icon">
                        ${this.icon}
                    </div>
                    <input id="input-main" type="${this.type}" placeholder="${this.placeholder}">
                    <div id="iconl">
                        ${this.iconl}
                    </div>
                </div>
                <div class="error">

                </div>
            </div>
            ${style}
            
        `
        this._shadowRoot.getElementById('iconl').addEventListener('mouseover', () => {
            this._shadowRoot.getElementById('input-main').type = 'text'
        })
        this._shadowRoot.getElementById('iconl').addEventListener('mouseout', () => {
            this._shadowRoot.getElementById('input-main').type = 'password'
        })

    }

    static get observedAttributes() {
        return ['error']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'error') {
            this._shadowRoot.querySelector('.error').innerHTML = newValue
        }
    }
    // getValue(){
    //     const value = this._shadowRoot.getElementById('input-main').value
    //     return value
    // }
    // getter
    get value() {
        const value = this._shadowRoot.getElementById('input-main').value
        return value
    }
}
window.customElements.define('input-wrapper', inputWrapper)