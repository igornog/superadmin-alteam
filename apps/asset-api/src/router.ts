import express from "express";
import fileUpload from "express-fileupload";
import { v4} from "uuid";
import {saveAsset} from "./s3AssetStorage";
export const router = express.Router()
  .use(fileUpload())
router.post("/assets/user/:id", async (req, res) => {
  if(!req.files.file) {
    res.status(400).send("No files were uploaded");
    return;
  }
  if (Array.isArray(req.files.file)) {
    res.status(400).send("Only one file can be uploaded at a time");
    return;
  }
  const fileLocation = await uploadUserAsset(req.params.id, req.files.file.data);

  // returning fileupload location
  return res.status(200).json({ location: fileLocation });
});

async function uploadUserAsset(userId: string, file: Buffer): Promise<string> {
  const assetId = v4();
  const path = `users/${userId}/${assetId}`;
  await saveAsset(path, file);
  return path
}

