const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express();
//use es middleware aunque sirve el html
//send imprime
//applist el segundo argumento es opcional
//hbs template engine

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  var now = new Date().toString()
  var log = now+': '+ req.method+' '+req.url
  // console.log(now+': '+ req.method+' '+req.url)

  //para el append ahora es requerida la funcion callback de error
  fs.appendFile('server.log',log + '\n',(err) => {
    if (err) {
      console.log('Imposible agregar al archivo server.log')
    }
  })
  res.render('maintenance.hbs',{
    pageTitle: 'Mantenimiento',
    welcomeMsj: 'Volveremos pronto!'
  })
  next()
})


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})

app.get('/',(req,res)=>{
  // res.send('<h1>hello Express</h1>')
  // res.send({
  //   name: 'José',
  //   likes: [
  //     'lol',
  //     'code'
  //   ]
  // })
  res.render('home.hbs',{
    pageTitle: 'Home',
    welcomeMsj: 'Bienvenido!'
  })
})

app.get('/about',(req,res)=>{
  // res.send('About Page')
  res.render('about.hbs',{
    pageTitle: 'About'
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Error Msj'
  })
})

app.listen(8080,()=>{
  console.log('Server is Up')
})
