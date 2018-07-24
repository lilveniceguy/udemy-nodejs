const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

//variable con objeto que tiene variables de entorno
//if port no existe, usamos el 3000
const port = process.env.PORT || 3000

var app = express()
//"use" toma una funcion que sea middleware
//send imprime directamente en el DOM
//applist el segundo argumento es opcional
//hbs template engine
//Se necesita usar use con la ruta completa __dirname
//Al declarar el express.static podemos llamar los archivos /help.html
//por ejemplo, directamente, localizado dentro de la carpeta publica
hbs.registerPartials(__dirname+'/views/partials')
//app.set llama a view engine y define que hbs será quien maneje el engine
//template de la aplicacion
//hbs se trabaja con html mustache
//las vistas del template estan dentro del view folder
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
  //Este middleware si se desconecta se antepone al contenido real,
  //pero al llamar partials dentro de su hbs genera conflicto con el hbs
  //del llamado en el request
  // res.render('maintenance.hbs',{
  //   pageTitle: 'Mantenimiento',
  //   welcomeMsj: 'Volveremos pronto!'
  // })
  next()
})

//helpers para usar en otro lado, es simplemente una funcion, lo que pueden
//ser multiples funciones, el primer parametro es el nombre de la funcion
//Estos se pueden llamar directo desde el hbs con el nombre "{{getCurrentYear}}"
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
  //app.render se encarga de renderizar el archivo hbs
  res.render('about.hbs',{
    pageTitle: 'About'
  })
})

app.get('/test',(req,res)=>{
  res.render('test.hbs',{
    pageTitle: 'tesT'
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Error Msj'
  })
})

app.listen(port,()=>{
  console.log('Server is Up on '+port)
})
