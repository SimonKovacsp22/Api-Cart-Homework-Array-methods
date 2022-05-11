

const loadBooks = async () => {
    
    try {
        const response = await fetch("https://be-strive-bookstore.herokuapp.com/books")
        const parsedBody = await response.json()

        const { data: books } = parsedBody
        console.log(books)
        outerArray = [...books]
       renderBooks(books)
       Skip()
       addToCart()

        
        
    } catch (err) {
        console.log(err)
    }
}

window.onload = () => {
    loadBooks()

    document.querySelector('.btn-dark').addEventListener('click',()=>search())


}
let outerArray = []




const renderBooks = (books) => {
    let row = document.querySelector('.library')

    row.innerHTML = ""

    books.forEach(book => {
        let col= document.createElement('div')
        col.className = ('col-12 col-sm-6 col-md-3 mb-2 px-2')
        col.innerHTML = `
        <div class="card" style="width: 18rem;" id="${book.asin}">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">category: ${book.category}</p>
          <a href="#" class="btn btn-primary">Add to Cart</a>
          <a href="#" class="btn btn-danger">Skip</a>
        </div>
      </div>
        `

        row.appendChild(col)
    });


}

const Skip = function () {
    let cards = document.querySelectorAll('.card ')
    cards.forEach((card) => {
        const btn =card.querySelector('.btn-danger')
        btn.addEventListener('click', ()=> {
          card.remove()
        })
    })
}

const addToCart = function () {
    let cart = document.querySelector('.cart > .row')
    let cards = document.querySelectorAll('.card ')
    let library = document.querySelector('.library')
    cards.forEach((card) => {
        const btn =card.querySelector('.btn-primary')
        btn.addEventListener('click', ()=> {
            cart.appendChild(card)
            
            library.removeChild(card)
            
        })
    })
}

const search = function() {
    
    let searchTerm = document.querySelector('input').value
    let filteredBooks = outerArray.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    renderBooks(filteredBooks)
}