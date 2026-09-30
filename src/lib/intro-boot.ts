/**
 * Runs during HTML parse so the first frame is the intro, not the page.
 *
 * The veil is opt-in: the server HTML never carries `marit-intro`, so
 * crawlers, no-JS visitors and deep links always get content immediately.
 * Only a first visit to the homepage in a tab turns the veil on, and a
 * hard 3.5s cap guarantees the page is never held hostage by slow JS.
 */
export const INTRO_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;if(location.pathname!=="/")return;if(sessionStorage.getItem("marit-preloader-seen"))return;d.classList.add("marit-intro");setTimeout(function(){d.classList.remove("marit-intro")},3500)}catch(e){}})();`;
