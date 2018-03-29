const express = require (`express`) // menyertakan modul express
const app = express() //manggil modul express
const bodyParser = require(`body-parser`)// menyertakan library/mesin template body-parser
const port = 14042 // set port 14042
const cookieParser = require(`cookie-parser`) // menyertakan library//mesin template cookie-parser
const mainRoutes = require(`./routes/index.js`) //menyertakan file index.js dari folder routes
const cardRoutes = require(`./routes/cards.js`) //menyertakan file cards.js dari folder routes


//masang mesin template, pug
app.set(`view engine`,`pug`)
//masang framework/template body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
//expose static files
app.use(`/public`,express.static(`public`))
//import mainroutes
app.use(mainRoutes)
app.use(`/cards`, cardRoutes)


//handle error kalo ga ada rute yang cocok
app.use((req,res,next)=>{ 
    // res.locals.username = req.cookies.username
    let errornya = new Error("error ga ada rutenya")
    errornya.status = 404
    next(errornya)  
  })

//error middleware
app.use((err,req,res,next)=>{ 
    //set locals dengan nama status untuk nampilin error status
    res.locals.status = err.status
    //set locals dengan nama errorMessage
    res.locals.errorMessage = err.message //nunjukin ke error message error ga ada rutenya
    res.render('error')//nampilin halaman error
})

//jalanin servernya
app.listen(14055, ()=>{
    console.log("nyalaa di 14055")
})


//   //menggunakan middleware untuk menunjukan error dengan rute /makasih lalu akan direct ke selanjutnya yg rutenya sama
// app.use(`/makasih`,(req,res, next)=>{ 
//     console.log("one")
//     next()
      
//   })
// app.use(`/makasih`,(req,res,next)=>{ 
//      console.log("two")
//      res.send("gituu")
       
//    })
