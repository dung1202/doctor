
const style =
`
    <style>
        .screen{
            padding: 5vh 20vw;
        }
        .service{
            padding: 0vh 20vw;
            background-color: rgba(197, 197, 197, 0.8);
            text-align: center;
            margin: 0 10vw;
            height: 90vh;
            border-radius: 5px;
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
            <div class="service">
                <div class="screen">
                   35436462352
                </div>
            </div>    
            ${style}
        `
    }
}
window.customElements.define('avatar-z', Avatar)