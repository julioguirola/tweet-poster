import { getAllUsers } from "@/services/db"

export async function GET() {
 	try {
		const data = await getAllUsers()

		return Response.json({usr_data : data})
 	} catch (e) {
		console.log(e.message)
    	return new Response(e.message, {
    	status: 500
    })
 	}

}