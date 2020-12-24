
class ServiceScreen3 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
          
                <div>
                    43242ewqewq34
                </div>
            
        `
    }
}
window.customElements.define('story-z', ServiceScreen3)