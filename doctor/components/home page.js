const style =
`
    <style>
    .service{
        margin-left: 50vh;
        margin-top: 25vh;
        color: #a02c2d;
    }
    .screen{
        font-size: 4rem;
        font-family: 'Hanalei Fill', cursive;
    }
    .q{
        font-size: 2rem;
        color: #bc85a3;
        margin-bottom: 10px;
    }
    #ok{
        padding: 1vw;
        outline: none;
        border-radius: 10px;
        border: 0px;
        background: rgb(100, 97, 224);
        font-size: 1.2rem;
        color: white;
        font-weight: 700;
        cursor: pointer;
    }
    #ok:hover{
        background: rgb(50, 10, 224);
    }
    </style>
`
class ServiceScreen1 extends HTMLElement 
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
                    Find Your Calm
                </div>
                <div class="q">
                    Sleep more. Stress less. Live better.
                </div>
                <button id="ok">Get Started</button>
            </div>    
            ${style}
        `
        this._shadowRoot.getElementById('ok').addEventListener('click', ()=>{
            router.navigate('home//alarm')
            location.reload()
        })
    }
    
}
window.customElements.define('home-page', ServiceScreen1)