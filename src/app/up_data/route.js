import { getQuotes, getEvents, delAllContent, updateContent } from "@/services/db"
import { scrap } from "@/services/scrapper"

export async function POST () {
  try {
    console.log("scrapeando cubadebate")
    const cubadebateNews = await scrap("http://www.cubadebate.cu", "#front-list > div > .title")
    console.log("scrapeando tvavila")
    const tvCav = await scrap('https://www.tvavila.icrt.cu/', "article h4")
    const quotes = await getQuotes()
    const events = await getEvents()
    await delAllContent()
    await updateContent([...cubadebateNews, ...tvCav, ...quotes, ...events])
    console.log("actualizado")
    return Response.json({ msg: "ok" })
  } catch (e) {
    console.log(e.message)
    return new Response(e.message, {
    	status: 500
    })
  }
}

