
class ServiceScreen4 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
        
                <div>
                    4jjjjj42
                </div>
           
        `
    }
}
window.customElements.define('chart-z', ServiceScreen4)