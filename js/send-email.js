(function(){
    emailjs.init({
        publicKey: "xOkTzz380oG1wp8g8",
    });
})();

function sendEmail() {
    let params = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        message : document.getElementById('message').value
    }

    emailjs.send('service_vcxuyc7','template_yxzzvx4', params).then(alert('Email sent!'));
}