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
class Screenz extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this.screen = this.getAttribute('screen') || ''
        this._shadowRoot.innerHTML = 
        `
            <div class="service">
                <div class="screen">

                </div>
            </div>
            ${style}
        `
        console.log(this.screen)
    }
    static get observedAttributes()
    {
        console.log(0)
        return ['screen']
    }
    attributeChangedCallback(name, oldValue, newValue)
    {
        if (name === 'screen'){
            this._shadowRoot.querySelector('.screen').innerHTML = newValue
        }
    }
}
window.customElements.define('screen-z', Screenz)