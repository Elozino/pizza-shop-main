import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
  projectId: "dt048ux7",
  dataset: "pizza",
  apiVersion: "2022-09-18",
  useCdn: true,
  token:
    "skfJ0sSrXf2yUIhS6HjD48KUfE4Q0LyEsf6rOt27XmvBGpsDFckLsGzz8mXstbeky5QUAUtaK8O5tXgti417X6SRWqtcJZCRXxt3IHLMvZlJirMal9RtjgyNx0SotKyvluOQg5EPRniGUXLHr8WO70B4PN45GBTJHRRHTY2tANxXzuQQr3ET",
});

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)