import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUrl from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import FormData from "form-data";
// import imgur from "imgur"
import axios from "axios";
// import  { uploadFile } from 'uploadthing' // Ensure this is the correct import path
// const uploadthing = require('uploadthing');
// import  uploadthing  from "uploadthing"
import dotenv from "dotenv";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body;
    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please provide the complete data", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "This email already in use", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const hanshedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      role,
      password: hanshedPassword,
      phoneNumber,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email, role } = req.body;
    if (!password || !email || !role) {
      return res
        .status(400)
        .json({ message: "Please provide the complete data", success: false });
    } else {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return res
            .status(400)
            .json({ message: "incorrect password", success: false });
        } else {
          if (role !== user.role) {
            return res.status(400).json({
              message: "Please choose your role correctly",
              success: false,
            });
          } else {
            const tokenData = {
              userId: user._id,
            };
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });

            user = {
              _id: user._id,
              role: user.role,
              email: user.email,
              phoneNumber: user.phoneNumber,
              profile: user.profile,
              fullname: user.fullname,
            };

            const Options = {
              httpOnly: process.env.COOKIE_HTTPONLY,
              secure: process.env.COOKIE_SECURE,
              sameSite: process.env.COOKIE_SAMESITE,
              maxAge: parseInt(process.env.COOKIE_MAXAGE, 10),
            };
            return res
              .status(200)
              .cookie("token", token, Options)
              .json({ message: "login successfull", user, success: true });
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logged out successfull", success: true });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

dotenv.config();

// uploadthing.configure({
//     apiKey: process.env.UPLOADTHING_API_KEY, // Set API Key
// });

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, bio, role, skills, phoneNumber } = req.body;
//         const file = req.file;

//         // Upload the file using Uploadthing with API key authentication
//         const uploadthingResponse = await uploadthing.uploadFile(file);

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id;

//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found", success: false });
//         } else {
//             // Updating user data
//             if (fullname) user.fullname = fullname;
//             if (email) user.email = email;
//             if (phoneNumber) user.phoneNumber = phoneNumber;
//             if (bio) user.profile.bio = bio;
//             if (skills) user.profile.skills = skillsArray;
//             if (role) user.role = role;

//             // Update resume with Uploadthing URL
//             if (uploadthingResponse) {
//                 user.profile.resume = uploadthingResponse.url;
//                 user.profile.resumeOriginalName = file.originalname;
//             }

//             await user.save();
//             user = {
//                 _id: user._id,
//                 role: user.role,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 profile: user.profile,
//                 fullname: user.fullname
//             };

//             return res
//                 .status(200)
//                 .json({ message: "Profile updated successfully", user, success: true });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: error.message, success: false });
//     }
// }

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio, role, skills, phoneNumber } = req.body;
    const file = req.file;
    const fileUri = getDataUrl(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    } else {
      //updating user data
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skillsArray;
      if (role) user.role = role;

      //resume comes here later
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }

      await user.save();
      user = {
        _id: user._id,
        role: user.role,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
        fullname: user.fullname,
      };

      return res
        .status(200)
        .json({ message: "Profile updated successfully", user, success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

// const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
// imgur.setClientId(IMGUR_CLIENT_ID);

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file; // The uploaded file

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // Get user ID from middleware
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         // Update user data
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skills) user.profile.skills = skillsArray;

//         // Upload resume (PDF file) to Imgur
//         if (file) {
//             // Ensure the file is a valid image
//             const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
//             if (!validImageTypes.includes(file.mimetype)) {
//                 return res.status(400).json({
//                     message: "Only image files are allowed.",
//                     success: false
//                 });
//             }

//             // Convert file buffer to base64
//             const base64Image = file.buffer.toString('base64');

//             // Attempt to upload to Imgur
//             try {
//                 const imgurResponse = await imgur.uploadBase64(base64Image); // Upload the base64 image
//                 user.profile.resume = imgurResponse.data.link; // Save the Imgur URL
//                 user.profile.resumeOriginalName = file.originalname; // Save the original file name
//             } catch (error) {
//                 console.error("Imgur upload error:", error.response.data); // Log the error response from Imgur
//                 return res.status(500).json({
//                     message: "Error uploading to Imgur.",
//                     success: false
//                 });
//             }
//         }

//         await user.save();

//         // Prepare user data to return
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Server error.",
//             success: false
//         });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file; // The uploaded file

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // Get user ID from middleware
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         // Update user data
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skills) user.profile.skills = skillsArray;

//         // Upload resume (PDF file) to File.io
//         if (file) {
//             const formData = new FormData(); // Create a new FormData instance
//             formData.append('file', file.buffer, { filename: file.originalname }); // Append the file buffer as a blob

//             // Send the formData to File.io
//             const response = await axios.post('https://file.io', formData, {
//                 headers: {
//                     ...formData.getHeaders(), // Ensure correct headers for multipart/form-data
//                 },
//             });

//             // Save the File.io URL and original name
//             user.profile.resume = response.data.link; // Save the File.io URL
//             user.profile.resumeOriginalName = file.originalname; // Save the original file name
//         }

//         await user.save();

//         // Prepare user data to return
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Server error.",
//             success: false
//         });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file; // The uploaded file

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // Get user ID from middleware
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         // Update user data
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skills) user.profile.skills = skillsArray;

//         // Upload resume (PDF file) to PDF Host
//         if (file) {
//             const formData = new FormData(); // Create a new FormData instance
//             formData.append('file', file.buffer, { filename: file.originalname }); // Append the file buffer as a blob

//             // Send the formData to PDF Host
//             const response = await axios.post('https://pdfhost.io/api/upload', formData, {
//                 headers: {
//                     ...formData.getHeaders(), // Ensure correct headers for multipart/form-data
//                 },
//             });

//             // Save the PDF Host URL and original name
//             user.profile.resume = response.data.url; // Use the URL from PDF Host for viewing
//             user.profile.resumeOriginalName = file.originalname; // Save the original file name
//         }

//         await user.save();

//         // Prepare user data to return
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Server error.",
//             success: false
//         });
//     }
// };

export const updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.id; // Assuming the user is authenticated and userId is obtained from middleware
    const file = req.file; // Multer is handling the file

    if (!file) {
      return res
        .status(400)
        .json({ message: "Please upload a profile photo", success: false });
    }

    // Convert the uploaded file to Data URI
    const fileUri = getDataUri(file);

    // Upload the profile photo to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      access_mode: "public", // Ensure it's publicly accessible
    });

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update the user's profile photo
    user.profile.profilePhoto = cloudResponse.secure_url;

    // Save the updated user to the database
    await user.save();

    return res.status(200).json({
      message: "Profile photo updated successfully",
      success: true,
      profilePhoto: user.profile.profilePhoto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
