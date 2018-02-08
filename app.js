// register service worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {

        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }

    }).catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}


navigator.serviceWorker.addEventListener('controllerchange', function (event) {
    console.log(
        '[controllerchange] A "controllerchange" event has happened ' +
        'within navigator.serviceWorker: ', event
    );

    navigator.serviceWorker.controller.addEventListener('statechange',
        function () {
            console.log('[controllerchange][statechange] ' +
                'A "statechange" has occured: ', this.state
            );
            // if (this.state === 'activated') {
            //     document.getElementById('offlineNotification')
            //         .classList.remove('hidden');
            // }
        }
    );
});