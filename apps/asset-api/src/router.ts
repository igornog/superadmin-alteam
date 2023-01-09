import express from "express";
import fileUpload from "express-fileupload";
import {v4} from "uuid";
import {saveAsset} from "./s3AssetStorage";
import {AssetService, SoloTalentAsset} from "@yjcapp/app";
import {soloTalentPgRepository} from "@yjcapp/postgres-db";

export const router = express.Router()
  .use(fileUpload())
router.post("/assets/solo/:id/:name", async (req, res) => {
  if (!req.files.file) {
    res.status(400).send("No files were uploaded");
    return;
  }
  if (Array.isArray(req.files.file)) {
    res.status(400).send("Only one file can be uploaded at a time");
    return;
  }
  const fileLocation = await assetService.createTalentAsset(req.params.id, {
    name: req.params.name,
    asset: new Blob([req.files.file.data])
  });

  // returning fileupload location
  return res.status(200).json({location: fileLocation});
});

const assetService: AssetService = {
  async createTalentAsset(talentId: string, soloTalentAsset: SoloTalentAsset): Promise<string> {
    const assetId = v4();
    const path = `users/${talentId}/${assetId}`;
    await saveAsset(path, Buffer.from(await soloTalentAsset.asset.arrayBuffer()));
    const fullAssetPath = "https://dev.assets.alteam.io/" + path;
    const talent = await soloTalentPgRepository.retrieveSoloTalent(talentId)
    const talentAssets = talent.assets ?? [];
    talentAssets.push({name: soloTalentAsset.name, link: fullAssetPath});
    await soloTalentPgRepository.updateSoloTalent({...talent, assets: talentAssets});
    return fullAssetPath;
  }
}

async function uploadSoloTalentAsset(talentId: string, file: Buffer): Promise<string> {
  const assetId = v4();
  const path = `users/${talentId}/${assetId}`;
  await saveAsset(path, file);
  return "https://dev.assets.alteam.io/" + path;
}

