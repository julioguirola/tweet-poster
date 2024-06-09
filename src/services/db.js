import { MongoClient , ObjectId, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://enpa:B6PHlR6a3DAzFCe8@enpa.cb7lbqh.mongodb.net/?retryWrites=true&w=majority&appName=enpa";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getAllContent () {
  await client.connect();
  const db = client.db("xposter")
  const colContent = db.collection("content")

  const resultContent = await colContent.find({}).toArray()

  const result_mod = resultContent.map(elm => {
    const newId = elm._id.toString()
    elm._id = newId
    return elm
  })
  await client.close();
  return result_mod
}

export async function getAllUsers () {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("users")
  const users = await col.find({}).toArray()
  const result = users.map(elm => {
    const newId = elm._id.toString()
    elm._id = newId
    return elm
  })
  await client.close();
  return result
}

export async function getUsrById (id) {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("users")
  const result = await col.findOne({_id: new ObjectId(id)})
  await client.close();
  result._id = result._id.toString()
  return result
}

export async function getElmById (id) {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("content")
  const result = await col.findOne({_id: new ObjectId(id)})
  await client.close();
  result._id = result._id.toString()
  return result
}

export async function updateContent (newcontent) {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("content")
  await col.insertMany(newcontent)
  await client.close();
}

export async function delContent (id) {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("content")
  await col.deleteOne({_id: new ObjectId(id)})
  await client.close()
}

export async function delAllContent () {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("content")
  await col.deleteMany({})
  await client.close()
}

export async function getQuotes () {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("quotes")
  const quotes = await col.find({}).toArray()
  await client.close()
  return quotes 
}

export async function getEvents () {
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("events")
  const events = await col.find({}).toArray()
  await client.close()
  return events 
}

/*
await client.connect();
const db = client.db("xposter")
const col = db.collection("events")
const result = await col.find({}).toArray()
const cola = db.collection("content");
await cola.insertMany(result)
await client.close()


import { parse } from 'node-html-parser';

const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]



meses.forEach(async mes => {
  const resp = await fetch("https://www.radiorebelde.cu/efemerides/" + mes, {
      headers: {
        "User-Agent" : 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      }
  })

  const text = await resp.text()
  const root = parse(text)
  const result = root.querySelectorAll("tr")

  const events = result.map(x => {
    return x.querySelectorAll("td").map(y => {
      return y.innerText
    }).join(" ")
  })

  const efemeride = events.map(x => {
    return mes + " " + x
  })

  const efemerides = efemeride.filter((x,y) => {
    if (y != 0) return true
  })
  await client.connect();
  const db = client.db("xposter")
  const col = db.collection("events")

  await col.insertMany(efemerides.map(x => {
    return {
      text: x,
      type: "Event"
    }
  }))
})

await client.close()*/