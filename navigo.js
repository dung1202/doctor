var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
import { getItemToLocalStorege } from './uitil.js'

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


router
    .on({
        'login': function () {

            redirect('login');
        },
        'home//alarm': function () {

            redirect('alarm');
        },
        'home//story': function () {

            redirect('story');
        },
        'home//chart': function () {

            redirect('chart');
        },
        'home//body': function () {

            redirect('body');
        },
        'home//avatar': function () {

            redirect('avatar');
        },
        'register': function () {

            redirect('register');
        },
        'home': async function () {
            const check = await checkAuthen()
            if (check === true) {
                redirect('home')
            }
            else {
                router.navigate('login')
            }
        },
        '*': async function () {
            const check = await checkAuthen()
            if (check === true) {
                router.navigate('home')
            }
            else {
                router.navigate('login')
            }

        }
    })
    .resolve();

function redirect(screenName) {
    if (screenName === 'register') {
        document.getElementById('app').innerHTML =
            `<register-screen></register-screen>`
    }

    if (screenName === 'login') {
        document.getElementById('app').innerHTML =
            `<login-screen></login-screeen>`
    }

    if (screenName === 'home') {
        window.k = `
        
        #n${1}{
            background-color: gray;
        }
       
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <home-page></home-page>
            </div>
            ${style}
        `
        
        
    }
    if (screenName === 'alarm') {
        window.k = `
        
        #n${2}{
            background-color: gray;
        }
       
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <alarm-z></alarm-z>
            </div>
            ${style}
        `
        
        
    }

    if (screenName === 'story') {
        window.k = `
        
        #n${3}{
            background-color: gray;
        }
       
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <story-z></story-z>
            </div>
            ${style}
        `
     
        
       
    }

    if (screenName === 'chart') {
        window.k = `
        
        #n${4}{
            background-color: gray;
        }
       
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <chart-z></chart-z>
            </div>
            ${style}
        `
        
        
       
    }

    if (screenName === 'body') {
        window.k = `
        
        #n${5}{
            background-color: gray;
        }
       
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <body-z></body-z>
            </div>
            ${style}
        `
     
        
        
    }

    if (screenName === 'avatar') {
        window.k = `
        #n${6}{
            background-color: gray;
        }
        `
        document.getElementById('app').innerHTML =
            `   
            <div id="home-container">      
                <home-screen></home-screen>
                <avatar-z></avatar-z>
            </div>
            ${style}
        `
        
        
    }
}






async function checkAuthen() {
    const user = getItemToLocalStorege('currentUser')
    if (user) {

        const res = await firebase.firestore().collection('users')
            .where('email', '==', user.email).where('password', '==', user.password).get()
        if (res.empty) {
            return false
        }
        else {
            return true
        }
    }
    else {
        return false
    }
}

window.router = router