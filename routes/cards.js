const express = require (`express`) 
const router = express.Router()

//baca json yang ada di file flashCardData.json di taro di data
const data = require(`../data/flashCardData.json`).data
// const {data} = require(`../data/flashCardData.json`) bisa gini juga short hand namanya

//objeknya data 
const {cards} = data
// const cards = data.cards


//kalau ada yang buka /cards dia bakal buka ke suatu id card secara  random
router.get(`/`,(req,res)=>{
    let totalCards = cards.length
    let randomId = Math.floor(Math.random()*totalCards)
    res.redirect(`/cards/${randomId}?side=soal`)
})


//rute get untuk url yang akses/cards dengan id 
router.get(`/:id`,(req,res)=>{ //membuat parameter dengan variabel penampung namanya id

    // console.log("hai")
    // // res.send("aku tiba")
    // res.locals.variabel = "aku adalah siapa"
    // res.locals.hint = "kita pernah ketemu"
    // res.render("cards", {variabel:"aku siapa?"}) 


    const {id}= req.params //baca id dari url
    const {side}= req.query //query buat soal atau jawaban, yang dibaca setelah tanda tanya(?)
    const text= cards[id][side] //akses cards, 'text' karena bisa jawaban atau soal //panggil objeknya biar kebaca
    const {hint}= cards[id] //ambil hint dari objek cards berdasarkan id
    let templateData = {id, text, hint}//bikin objek yang isinya id, text, hint

    //jika sidenya jawaban tampilin berdasar id, yg ditampilin jawaban aja tanpa hint, lalu link buat lihat soal dengan sidenya 'soal'
    if(side == "jawaban"){
        templateData = {id,text}
        templateData.sidenya = "soal"
        templateData.SideToDisplay = "Lihat Soal"

  //jika sidenya soal tampilin berdasar id, yang ditampilin soal sama hint, lalu link buat lihat jawaban dengan sidenya 'jawaban'
    }else if(side == "soal") {
        templateData.sidenya = "jawaban"
        templateData.SideToDisplay = "Lihat Jawaban"
  //kalo bukan side yaitu nulis apapun selain soal dan jawaban, maka redirect ke soal atau jawaban berdasar id random       
    }else if(!side) {
        res.redirect(`/cards/${id}?side=soal`)
    }

    //tampilin halaman website cards  
    res.locals = templateData
    res.render("cards") 

})

//diexport biar bisa di panggil dari luar
module.exports = router


 // console.log(`${} - ${} - ${} `)
    // console.dir(data)

    // res.locals = { text,hint
    //     // soal: cards[req.params.id].soal,
    //     // hint: cards[req.params.id].hint,
    //     // jawaban: cards[req.params.id].jawaban
    // }

    // res.locals = {
    //     variabel : "aku siapa?",
    //     // hint : "kita pernah ketemu"
    //     colors : ["red","blue","grey"]
    // }
   
