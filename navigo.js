var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
import { getItemToLocalStorege } from './uitil.js'

router
    .on({
        'login': function () {
            
            redirect('login');
        },
        'register': function () {
    
            redirect('register');
        },
        'home': async function () {
            const check = await checkAuthen()
            if (check === true){
                redirect('home')}
                else{
                    router.navigate('login')
                }
        },
        '*': async function () {
            const check = await checkAuthen()
            if (check === true){
                router.navigate('home')}
                else{
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
    else
        if (screenName === 'login') {
            document.getElementById('app').innerHTML =
                `<login-screen></login-screeen>`
        }

        else
            if (screenName === 'home') {
                document.getElementById('app').innerHTML =
                    `<home-screen></home-screen>`
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