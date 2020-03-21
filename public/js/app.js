//console.log("This is from client side")

const WeatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message_1=document.querySelector('#m1')
const message_2=document.querySelector('#m2')

WeatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message_1.textContent='Loading....'
    message_2.textContent=''
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            message_1.textContent=data.error

        } else {
            //console.log(data.location)
            //console.log(data.forecast)
            message_1.textContent=data.location
            message_2.textContent=data.forecast
        }
        
    })

})

})