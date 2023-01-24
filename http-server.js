
//**
// SIMPLE HTTP SERVER
// const http = require('http')
// const fs = require('fs') //file-system, for reading html pages

// ES module - set "type": "module" in the package.json 
import { createServer } from 'http'
import fs from 'fs' //file-system, for reading html pages

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const server = createServer(async (req, res) => {

  async function sendResponse(path) {
    try {
      let data = await readFile(path);
      res.write(data)
      res.end()
    } catch (error) {
      res.write("500: File is not be ridden")
      res.end()
    }
  }

  switch (req.url) {
    case "/":
      sendResponse('pages/index.html')
      break;
    case "/contacts":
      sendResponse('pages/contacts.html')
      break;
    default:
      res.write("404: Not found dinosaurs")
      res.end()
      break;
  }
})
server.listen(3500, () => console.log("App listening on port 3500"))
//*/