import { TwitterApi } from "twitter-api-v2"
import * as fs from "fs/promises";
import { join as pathJoin } from "path";

const getFidelPath = () => {
  return pathJoin(process.cwd(), "public/fidel");
};

const touched = { current: false };

const touchFidelPath = () => {
  if (touched.current) return; // only need to do once
  fs.readdir(getFidelPath()); // fire and forget
  touched.current = true;
};

export default async function tweet (user, doc) {
  touchFidelPath()
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
    return
  }
}


