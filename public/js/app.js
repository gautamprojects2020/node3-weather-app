console.log('Client side javascript file loaded')
fetch('http://localhost:3000/weather?postalcode=!').then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
        }
        else {
            console.log(data.forecast)
            console.log(data.place_name)
        }
    })
})
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const postalcode=search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?postalcode='+postalcode).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        } 
        else {
           
            messageOne.textContent = data.place_name
            messageTwo.textContent = data.forecast
        }
    })
})
})