 import { delContent } from "@/services/db";

 export async function DELETE (request) {
 	try {
		const { content_id } = await request.json()
		await delContent(content_id)
		return Response.json({ msg : "ok" })
	} catch (e) {
		console.log(e.message)
    	return new Response(e.message, {
    	status: 500
    })
	}
 }