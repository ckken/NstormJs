seajs.config({
    // Enable plugins
    plugins: ['shim'],

    // Configure shim for non-CMD modules
    shim: {
        'jquery': {
            src: 'lib/jquery-1.9.1.min.js',
            exports: 'jQuery'
        },

        'Backstretch': {
            src: 'lib/background/Backstretch.js',
            deps: ['jquery']
        },

        'photoSwipe': {
            src: 'lib/gallery/photoswipe.js',
            deps: ['jquery']
        },
    }
});
