export default async function getUploadUrl({$axios,store},filename,filetype) {
  const aws = require('aws-sdk')


  const spaces = new aws.S3({
   endpoint:'nyc3.digitaloceanspaces.com',
   accessKeyId: 'A2G22IBUK6WU5PBTI2B2',
   secretAccessKey: 'aq7nq1SJmttMjgBUfs0sK/h1op8R71bHTblFbM5IeSk'
 })
  const params = {
    Bucket: 'centrino',
    Key: filename,
    Expires: 60 * 3, // Expires in 3 minutes
    ContentType: filetype,
    ACL: 'public-read', // Remove this to make the file private
  }

//    await spaces.getSignedUrlPromise('putObject', params).then((e) => {
//   store.commit('uploads/signed/SET_URL',e)
// })

  return spaces.getSignedUrl('putObject', params)




}

