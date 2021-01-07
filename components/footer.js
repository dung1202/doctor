const style =
`
    <style>
    .footer{
        text-align: center;
        margin-top: 4vh;
        font-size: 1.3rem;
        color: #626262;
    }
    .k{
        font-size: 1.1rem;
        color: #805332;
    }
    .ok{
        padding: 2vw 0;
        background: rgba(197, 197, 197, 1);
    }
    </style>
`
class Footer1 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = 
        `
        <div class='ok'>
            <div style="text-align: center;" class="k">
                Contact information:
            </div>
            <div style="text-align: center;" class="k">
                Email: DoctorSleep.contact@gmail.com
                <div>Phone number: 0866577135</div>
            </div>
            <div class="footer">
                Copyright © 2020 Doctor Sleep. All rights reserved
            </div> 
        </div>  
            ${style}
        `
    }
}
window.customElements.define('footer-z', Footer1)