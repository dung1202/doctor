
class ServiceScreen2 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
            
                <div>
                        543543543
                </div>
           
        `
    }
}
window.customElements.define('alarm-z', ServiceScreen2)