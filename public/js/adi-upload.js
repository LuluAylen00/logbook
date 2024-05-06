let form = document.querySelector('#adi-form');
let fileInput = document.querySelector('#adi');

fileInput.addEventListener("change", function(e) {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file.name.includes(".adi")) {
        form.submit();
    }
})