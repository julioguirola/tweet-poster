import tweet from "@/services/twitter"
import { getElmById, getUsrById, delContent } from "@/services/db"

export async function POST (req) {
  try {
  	const {content_id, user_id} = await req.json()
  	const documentToPublish = await getElmById(content_id)
	const userPublisher = await getUsrById(user_id)
	await tweet(userPublisher, documentToPublish)
	await delContent(content_id)

	return Response.json({ msg: "ok" })
  } catch (e) {
    console.log(e.message)
    return new Response(e.message, {
    	status: 500
    })
  }
}

