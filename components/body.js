
class ServiceScreen5 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
        
                <div >
                    43jjjj4234232
                </div>
           
        `
    }
}
window.customElements.define('body-z', ServiceScreen5)