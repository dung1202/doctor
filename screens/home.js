import '../components/createPost.js'
class homeScreen extends HTMLElement
{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({ mode: 'open'})
    }

    connectedCallback()
    {
        this._shadowDom.innerHTML=
        `<home-header></home-header>
        <create-post></create-post>
        <list-post><list-post>
        `
    }
}
window.customElements.define('home-screen', homeScreen)

