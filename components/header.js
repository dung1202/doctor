// import { redirect } from '../index.js'
import { saveToLocalStorege } from '../uitil.js'
const style =
    `   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nerko+One&display=swap" rel="stylesheet">
    <style>
    .container{
        background-color: #1976D2;
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
    *{
        margin: 0;
        padding: 0;
    }
    .branch{
        font-size: 2rem;
        color: #fff;
        margin-left: 20px;
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
</style>
    `
class homeHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this._shadowDom.innerHTML =
            `   
            <div class="container">
        <div class="logo">
            <img src="https://image.flaticon.com/icons/png/512/856/856994.png" height="50px"   width="50px">
            <div class="branch">Share home</div>
        </div>
        <div class="user-info">
            <div class="avatar">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <button id="btn">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
            </button>
        </div>
    </div>
        ${style}
            `
        this._shadowDom.getElementById("btn").addEventListener('click', () =>{
            saveToLocalStorege('currentUser', null)
            // removeItemFromLocalStorage('currentUser')
            router.navigate('login')
        })
    }

}
window.customElements.define('home-header', homeHeader)