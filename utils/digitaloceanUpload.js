import aws from "aws-sdk";

export const digitaloceanFile =(file)=>{

  const aws = require('aws-sdk')
  const random= Math.floor(1000 + Math.random() * 9000);


  const spaces = new aws.S3({
    endpoint: 'fra1.digitaloceanspaces.com',
    accessKeyId: '3ZISN34MM5N5CHWJKNDG',
    secretAccessKey: 'E9nKKkt8+pNpmha+fWi47o4pl9y7h+V/I6/oV2PBB+c'
  })


  const params = {
    Bucket: 'centrino-cdn',
    Key: `centrino-cdn/${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${random}`,
    Expires: 60 * 3, // Expires in 3 minutes
    ContentType: file.type,
    ACL: 'public-read', // Remove this to make the file private
  }




 fetch(spaces.getSignedUrl('putObject', params), {
    method: 'PUT',
    body: file.blob,
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
    }
  })

  return random


}
