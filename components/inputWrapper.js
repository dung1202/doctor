const style =` 
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
        border-bottom: 1px;
        padding: 12px;
        box-sizing: border-box;
        margin-left: 5vw;
        outline: none;
        font-family: 'Langar', cursive;
        font-size: 0.9rem;
    }
    .input-wrapper {
        margin-bottom: 10px;
        height: 8vh;
    }

    </style>
`
//border-box la tu border vao trong

class inputWrapper extends HTMLElement
{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error') || ''
        this._shadowRoot.innerHTML = 
        `
            <div class="input-wrapper">
                <input id="input-main" type="${this.type}" placeholder="${this.placeholder}">
                <div class="error">

                </div>
            </div>
            ${style}
            
        `
        
    }
    static get observedAttributes()
    { 
        return ['error']
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (name === 'error'){
            this._shadowRoot.querySelector('.error').innerHTML = newValue
        }
    }
    // getValue(){
    //     const value = this._shadowRoot.getElementById('input-main').value
    //     return value
    // }
    // getter
    get value(){
        const value = this._shadowRoot.getElementById('input-main').value
        return value
    }
}
window.customElements.define('input-wrapper', inputWrapper)