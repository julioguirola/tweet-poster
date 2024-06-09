import { TwitterApi } from "twitter-api-v2"

export default async function tweet (user, doc) {
  console.log(process.cwd())

  const client = new TwitterApi({
    appKey: user.appKey,
    appSecret: user.appSecret,
    accessToken: user.accessToken,
    accessSecret: user.accessSecret
  })

  const twitterClient = client.readWrite;

  try {
    if (doc.type == "Quote") {
      const mediaID = await Promise.all([
        await twitterClient.v1.uploadMedia("./public" + doc.url)
      ])

      await client.v2.tweet({
        text: doc.text + "\n#LatirAvileño #LatirXUn26Avileño",
        media: {media_ids: mediaID}
      })
    } else if (doc.type == "New") {
      await client.v2.tweet({
        text: `${doc.url}\n${doc.text}\n#LatirAvileño #LatirXUn26Avileño`
      })
    } else {
      await client.v2.tweet({
        text: `${doc.text}\n#LatirAvileño #LatirXUn26Avileño`
      })
    }
  } catch (e) {
    console.log(e)
  }
}


