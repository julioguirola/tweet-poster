import { getAllContent } from "@/services/db";

export async function GET() {
 	try {
		const data = await getAllContent()
		return Response.json({res_data : data})
 	} catch (e) {
		console.log(e.message)
    	return new Response(e.message, {
    	status: 500
    })
	}

}