export const imageToBase64 = (image) => {
    var binary = '';
    var bytes = new Uint8Array( image.data.data );
    for (var i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode( bytes[ i ] ); //convert back to base64
    }
    const base64 = window.btoa( binary );
    return "data:" + image.type + ";base64," + base64
}