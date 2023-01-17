
// const express = require('express')
// const app = express()
// const port = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//   console.log(`Environment variable is  any`)
//   res.send('Hello World!  Hello,  Docker!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//**
    // SIMPLE HTTP SERVER
  // const http = require('http')
  // const fs = require('fs') //file-system, for reading html pages

  // ES module - set "type": "module" in the package.json 
  import { createServer } from 'http'
  import fs from 'fs' //file-system, for reading html pages

  const server = createServer((req, res)=>{
    switch (req.url){
      case "/":
         fs.readFile('pages/index.html', (err, data)=>{
          if(err) {
            res.write("500: File could not be ridden")
          } else {
            res.write(data)
          }
           res.end()
         })
       
        break;
      case "/contacts":
        fs.readFile('pages/contacts.html', (err, data)=>{
          if(err) {
            res.write("500: File could not be ridden")
          } else {
            res.write(data)
          }
           res.end()
         })
        break;
      default:
        res.write("404: Not found dinosaurs")
        res.end()
        break;
    }
  })
  server.listen(3500, ()=> console.log("App listening on port 3500"))
//*/