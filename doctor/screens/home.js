
import { saveToLocalStorege } from '../uitil.js'

let style =
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
    #logo{
        display: flex;
        align-items: center;
        cursor: pointer;
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
    
    #n1, #n2, #n3, #n4, #n5
    {
        font-size: 1.8rem;
        color: #fff;
        margin-right: 5vw;
        padding: 1vh 1vw;
        border-radius: 5px;
        cursor: pointer;
    }
    #n6{
        color: #fff;
        padding: 1vh 1vw;
        border-radius: 5px;
        cursor: pointer;
    }
    #n1:hover, #n2:hover, #n3:hover, #n4:hover, #n5:hover, #n6:hover{
        background-color: gray;
    }
    
</style>
    `
const s = style
class homeHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        style = style + `<style>${k}</style>`
        const html =
        `   
            <div class="container">
                <div id="logo">
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
            ${style}
        `
        // <div id="n4">
        //                 <i class="fa fa-bar-chart" aria-hidden="true"></i>
        //             </div>
        this._shadowDom.innerHTML = html
        this._shadowDom.getElementById("btn").addEventListener('click', () =>{
            saveToLocalStorege('currentUser', null)
            // removeItemFromLocalStorage('currentUser')
            router.navigate('login')
            style = s
        })

        this._shadowDom.getElementById("logo").addEventListener('click', () =>{         
            router.navigate('home')  
            style = s  
        })


        this._shadowDom.getElementById("n1").addEventListener('click', () =>{         
            router.navigate('home')  
            style = s  
        })
        
        this._shadowDom.getElementById("n2").addEventListener('click', () =>{    
            router.navigate('home//alarm')  
            style = s
        })
        
        this._shadowDom.getElementById("n3").addEventListener('click', () =>{      
            router.navigate('home//dream') 
            style = s
        })

        // this._shadowDom.getElementById("n4").addEventListener('click', () =>{          
        //     router.navigate('home//chart')
        //     style = s 
        // })

        this._shadowDom.getElementById("n5").addEventListener('click', () =>{  
            router.navigate('home//body') 
            style = s
        })
        // this._shadowDom.getElementById("n6").addEventListener('click', () =>{
        //     router.navigate('home//avatar') 
        //     style = s
        // })
    }
}
window.customElements.define('home-screen', homeHeader)