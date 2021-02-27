class book{
    constructor(author,title,isbn){
        this.author=author;
        this.title=title;
        this.isbn=isbn;
    }
}
class UI{
    deleteItem(target){
        if(target.className==='delete'){
            const name=target.parentElement.parentElement.children[0].innerText;
            //in above target.parentElement.parentElement-> tr element and .childern[0] is first td and innerText is title of book
            target.parentElement.parentElement.remove();
            const isbn=target.parentElement.parentElement.children[2].innerText;
            store.removeBook(isbn);
            UI.showMessage(`Book ${name} is deleted successfully!`,"success");
        }
    }
    addItem(book){
        const list=document.getElementById('book-list');
        //creating tr element
        const row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a  class="delete">X</a></td>`;
        list.appendChild(row);
    }
    static showMessage(msg,cls){
        const div=document.createElement('div');//creating a div 
        div.className=`alert ${cls}`; // adding a success or fail class to div
        div.appendChild(document.createTextNode(msg)); // adding message to it
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }
    clearFields(){
        document.getElementById('author').value='';
        document.getElementById('title').value='';
        document.getElementById('isbn').value='';
    }
}

//saving to local storage
class store{
    static getBooks(){
let books;
if(localStorage.getItem('books')===null){
    books=[];
}else{
books=JSON.parse(localStorage.getItem('books'));
 }
 return books;
}
static displaybooks(){
    let books=store.getBooks();
    books.forEach(book=>{
        const ui=new UI;
        ui.addItem(book);
    })
    } 

    static addBook(book){
        let addbook=store.getBooks();
        addbook.push(book);
        localStorage.setItem('books',JSON.stringify(addbook));
    }

    static removeBook(isbnNum){
        let books=store.getBooks();
    books.forEach(function(book,index){
        if(book.isbn==isbnNum){
            console.log(index);
            books.splice(index,1)
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}
}


//DOM load event

document.addEventListener('DOMContentLoaded',store.displaybooks());
//events 
const ui=new UI();
document.getElementById('book-form').addEventListener('submit',function(e){
    const author=document.getElementById('author').value;
    const title=document.getElementById('title').value;
    const isbn=document.getElementById('isbn').value;
    const data=new book(author,title,isbn);
    const ui=new UI();
    if(author==='' || title===''||isbn===''){
        UI.showMessage('please fill out all the fields',"error");
    }else{
    //instantiate UI
    ui.addItem(data);

    store.addBook(data);

    ui.clearFields();
    UI.showMessage(` Book ${data.title} inserted successfully!`,"success");
    }
    e.preventDefault();
})
document.getElementById('book-list').addEventListener('click',function(e){
    ui.deleteItem(e.target);
    console.log('clicked');
    e.preventDefault();
});