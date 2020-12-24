
const style =
    `
    <style>
        #home-container{
            background: url('./anh nen/anhhome.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            width: 100vw;
            height: 100vh;
        }  
    </style >
    `


let i = 2;
class homeScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this._shadowDom.innerHTML =
            `<div id="home-container">      
                <home-header></home-header>
             </div>
        ${style}
        `
        
    }   
}
window.customElements.define('home-screen', homeScreen)

