const style =
`
    <style>
    #story{
        padding: 0.5vh;
        background-color: rgba(83, 255, 215, 1); 
        margin: 0vh 10vw;
        border-radius: 10px;
        height: 100%;
        background-color:#434343ff

    }
    </style>
`
class ServiceScreen3 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
        <div id="story">
            <create-post></create-post>
            <list-post><list-post>  
        </div> 
        ${style}
        `
    }
}
window.customElements.define('story-z', ServiceScreen3)