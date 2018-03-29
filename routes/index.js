const express = require (`express`) //panggil express
const router = express.Router() //bikin routernya pake Router() karena bikin rute modular/dipecah


//rute pertama/home 
router.get(`/`,(req,res)=>{
    res.locals.username = req.cookies.username //variabel username di local  di isi dengan variabel username di cookies
   
    // console.log("hai")
    // // res.send("aku tiba")

    //cek kalo username di cookiesnya ada maka tetep di halaman index
    //kalo gak ada cookiesnya tampilin error "ga ada username"
    if(req.cookies.username){
        res.render("index") 
    } else{
        let bikinError = new Error ("ga ada Username")
        next(bikinError)
        // res.redirect(`/hello`) 
    }
})

//rute untuk hello yg jika usernamenya ada di cookies, redirect ke home, kalo ga ada render ke hello lagi
router.get(`/hello`,(req,res)=>{
    // 
    if(req.cookies.username){ 
        res.redirect(`/`) 
    } else{
        res.render("hello") 
    } 
})
 
//rute post hello, bodynya ditaro di locals, cookienya itu username dari yang dikasih di body
router.post(`/hello`,(req,res)=>{      
    res.locals = req.body
    res.cookie("username", req.body.username)
    res.redirect(`/`)
    // res.write + res end
})

//rute untuk goodbye yg merespon hapus cookie lalu redirect ke hello
router.get(`/goodbye`,(req,res)=>{
    res.clearCookie(`username`)
    res.redirect (`/hello`)   
 })

//diexport biar bisa dipanggil dari luar
 module.exports = router



 // app.post(`/hello`,(req,res)=>{
//     res.send("aku post") 
//     // res.write + res end
// })

// app.post(`/hello`,(req,res)=>{
//     res.redirect("/")
//     // res.write + res end
// })

// app.post(`/hello`,(req,res)=>{
//     res.send(req.body.username)
//     // res.write + res end
// })

