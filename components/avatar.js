class Avatar extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
            <div>
                    43544654
            </div>
        `
    }
}
window.customElements.define('avatar-z', Avatar)