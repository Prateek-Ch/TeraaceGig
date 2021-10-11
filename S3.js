require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const awsName= process.env.AWS_BUCKET_NAME
const awsRegion = process.env.AWS_BUCKET_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new S3({
    awsRegion,
    awsAccessKey,
    awsSecretKey
})

//uploads a file to S3
async function uploadFile(files){
    let imagePathArray = [];
    let fileNameArray = [];
    let filePath,fileName;
    for(let i = 0; i<files.length;i++){
        filePath = files[i].path;
        fileName = files[i].filename;
        imagePathArray.push(filePath);
        fileNameArray.push(fileName);
    }
    let uploadParamsArray = [];

    for(let i = 0; i<imagePathArray.length;i++){
    const fileStream = fs.createReadStream(imagePathArray[i]);
    const uploadParams = {
        Bucket: awsName,
        Body: fileStream,
        Key: fileNameArray[i],
     }
     uploadParamsArray.push(await s3.upload(uploadParams).promise());
    }
   return uploadParamsArray;
}

exports.uploadFile = uploadFile

//downloads a file from S3
function getFileStream(fileKey){
    const downloadParams = {
        Key:fileKey,
        Bucket: awsName
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream