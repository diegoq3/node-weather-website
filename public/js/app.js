console.log('Client side javascript file is loaded!')

/*fetch('http://puzzle.mead.io/puzzle').then((response)  => {
    response.json().then((data)=>{
        console.log(data)
    })   
})*/



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    const location = search.value
    
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                return
            }
            console.log(data)
            messageOne.textContent = data.location 
            messageTwo.textContent = data.description + ", Feels like: " + data.feelsLike + " F degrees" + ", Temperature:" + data.temperature + " F degrees"
        }) 
    })        
})