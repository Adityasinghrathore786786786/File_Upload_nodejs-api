const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    //fetch karna file ko
    const file = req.files.file;
    console.log("File aayegi jee ->", file);

    //save karna file ko
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    console.log("Path ->", path);

    //file ko move karna
    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (error) {
    console.log("Cannot upload file");
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder }; 
  console.log("Temp- file path", file.tempFilePath);
  options.resource_type = "auto";

  if(quality){
    options.quality = quality;
 }
  

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //step : validation

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("File-Type: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.json({
        success: false,
        message: "File format is not supported",
      });
    }

    //file format supported hai
    const response = await uploadFileToCloudinary(file, "AdiImage");
    console.log(response);

    //db mai entry save
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully uploaded",
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//video upload ka handler

exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("File-Type: ", fileType);

    //Todo: Add a upper limit of 5 mb for video file

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.json({
        success: false,
        message: "File format is not supported",
      });
    }

    //file format supported hai
    console.log("Uploading to AdiImage")
    const response = await uploadFileToCloudinary(file, "AdiImage");
    console.log(response);

    //video file ki entry database mai craete karni hai
    //db mai entry save
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl: response.secure_url,
      });
  
      res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Video Successfully uploaded",
      });
      


  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//imageSize reducer handler

exports.imageSizeReducer = async(req, res)=>{
    try {
        
         //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //step : validation

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("File-Type: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.json({
        success: false,
        message: "File format is not supported",
      });
    }

    //file format supported hai
    console.log("Uploading the image")
    const response = await uploadFileToCloudinary(file, "AdiImage", 30);
    console.log(response);

    //db mai entry save
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully uploaded",
    });



    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong2"

        })
        
    }
}