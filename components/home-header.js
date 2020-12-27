// import { redirect } from '../index.js'
import { saveToLocalStorege } from '../uitil.js'
const style =
    `   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
    .container{
        background-color: #135766;
        display: flex;
        justify-content: space-between;
        height: 64px;
        align-items: center;
        padding: 0 5%;
    }
    .logo{
        display: flex;
        align-items: center;
    }
    
    .branch{
        font-size: 2rem;
        color: #fff;
        margin-left: 1vw;
        font-family: 'Nerko One', cursive;
    }
    .user-info{
        font-size: 1.5rem;
        text-align: center;
        display: flex;
    }
    #btn{
        background-color: transparent;
        border: none;
        margin-left: 20px;
        cursor: pointer;
        outline: none;
        font-size: 1.5rem;
    }
    .user-info i{
        font-size: 1.8rem;
        color: #fff;
      }
    .function{
        display: flex;
        margin-left: 1vw;
    }
    #n1{
        background-color: gray;
        font-size: 1.8rem;
        color: #fff;
        margin-right: 5vw;
        padding: 1vh 1vw;
        border-radius: 5px;
        cursor: pointer;
    }
    #n2, #n3, #n4, #n5{
        background-color: transparent;
        font-size: 1.8rem;
        color: #fff;
        margin-right: 5vw;
        padding: 1vh 1vw;
        border-radius: 5px;
        cursor: pointer;
    }
    #n6{
        background-color: transparent;      
        color: #fff;
        padding: 1vh 1vw;
        border-radius: 5px;
        cursor: pointer;
    }

</style>
    `
class homeHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const html =
        `   
            <div class="container">
                <div class="logo">
                    <img src="https://cdn.iconscout.com/icon/free/png-512/sleep-1659469-1409991.png" height="50px"   width="50px">
                    <div class="branch">Doctor Sleep</div>
                </div>
                <div class="function">
                    <div id="n1">
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </div>
                    <div id="n2">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                    </div>
                    <div id="n3">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <div id="n4">
                        <i class="fa fa-bar-chart" aria-hidden="true"></i>
                    </div>
                    <div id="n5">
                    <i class="fa fa-universal-access" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="user-info">
                    <div id="n6">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </div>
                    <button id="btn">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <screen-z id="h"></screen-z>
            ${style}
        `
        this._shadowDom.innerHTML = html
        this._shadowDom.getElementById("btn").addEventListener('click', () =>{
            saveToLocalStorege('currentUser', null)
            // removeItemFromLocalStorage('currentUser')
            router.navigate('login')
        })

        this._shadowDom.getElementById("n1").addEventListener('click', () =>{
            this.setColor(1)   
            this.SetError('h', `<home-page></home-page>`)     
        })
        
        this._shadowDom.getElementById("n2").addEventListener('click', () =>{
            this.setColor(2)
            this.SetError('h', `<alarm-z></alarm-z>`)  
        })
        
        this._shadowDom.getElementById("n3").addEventListener('click', () =>{
            this.setColor(3)
            this.SetError('h', `<story-z></story-z>`)  
        })

        this._shadowDom.getElementById("n4").addEventListener('click', () =>{
            this.setColor(4)
            this.SetError('h', `<chart-z></chart-z>`)
        })

        this._shadowDom.getElementById("n5").addEventListener('click', () =>{
            this.setColor(5)
            this.SetError('h', `<body-z></body-z>`)
        })
        this._shadowDom.getElementById("n6").addEventListener('click', () =>{
            this.setColor(6)
            this.SetError('h', `<avatar-z></avatar-z>`)
        })
    }
    setColor(i){
        for (let j=1; j<=6; j++){
            if (i !== j)
            this._shadowDom.getElementById(`n${j}`).style.backgroundColor = "transparent"
        }
        this._shadowDom.getElementById(`n${i}`).style.backgroundColor = "gray"
    }
    SetError(id, message) {
        this._shadowDom.getElementById(id).setAttribute('screen', message)
    }
}
window.customElements.define('home-header', homeHeader)