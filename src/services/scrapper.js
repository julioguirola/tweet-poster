import { parse } from 'node-html-parser';

export async function scrap (url, selector) {

  const resp = await fetch(url, {
    headers: {
      "User-Agent" : 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
    }
  })
  const text = await resp.text()
  const root = parse(text)
  const result = root.querySelectorAll(selector)

  const docsresult = result.map(elm => {
    const obj = {
      text: elm.querySelector("a").innerText,
      url: elm.querySelector("a").getAttribute("href"),
      type: "New"
    }
    return obj
  })
  return docsresult
}

// console.log(await createQuotes())
// console.log(await scrap("http://www.cubadebate.cu", "#front-list > div > .title"))
// scrap('https://www.tvavila.icrt.cu/', "article h4")