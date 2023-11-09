window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login')
    }

    if(location.search.includes('payment=done')){
        let items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        showFormError("order is placed");
    }
    if(location.search.includes('paymant_fail=true')){
        showFormError("some error occured. Please try again");
    }
}

// select place order button
const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();

    
if(address.address.length){
    // send data to backend
    fetch('/stipe-checkout', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            address: address,
            email: JSON.parse(sessionStorage.user).email
        })
    })
    .then(res => res.json())
    .then(url => {
        location.href = url;
    })
    .catch(err => console.log(err))
    }
})


const getAddress = () => {
    // form validation
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;
    let pincode = document.querySelector('#pincode').value;

    if(!address.length || !street.length || !city.length || !country.length || !pincode.length){
        return showFormError("Fill all the inputs");
    } else{
        return{ address, street, city, country, pincode }
    }
}