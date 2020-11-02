// since the main.html has referred this in the bottom thus any script that is added in the main.html
//could also be accessed here since its accounted as if they are in the same js file.
// this way we accessed user and csrf that both were in the main.html.

var updateBtns = document.getElementsByClassName('update-cart')

for (var i =0; i<updateBtns.length;i++){
    updateBtns[i].addEventListener('click', function (){
        var productId = this.dataset.product
        var action = this.dataset.action

        console.log("productId : ",productId , "action: ",action)
        console.log("user: ",user)

        if (user == 'AnonymousUser'){
            addCookieItem(productId,action)
        }else {
            updateUserOrder(productId, action)
        }
    })
}

function addCookieItem(productId, action){
    console.log("User hasn't logged in!")

    if (action == 'add'){
        if (cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else {
            cart[productId]['quantity'] += 1
        }
    }
    if (action == 'remove'){
        cart[productId]['quantity'] -= 1
        if (cart[productId]['quantity'] <= 0){
            console.log("The item has been removed")
            delete cart[productId]
        }
    }
    console.log('Cart :', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    //this one would override any cookie value we may have in that domain path.
    location.reload()
}

function updateUserOrder(productId,action){
    console.log("The logged in user is sending data")
    var url = '/update_item/'

    fetch(url,{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId': productId, 'action': action})
    })

    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log('Data:', data)
        location.reload()
    })
}