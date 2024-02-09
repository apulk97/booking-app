import express from "express";
import multer from "multer";
import { addHotel, editHotel, getHotel, getHotelById } from "../controller/my-hotels";
import validateToken from "../middleware/auth";

const routers = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

routers.post("/add", validateToken, upload.array("imageFiles", 6), addHotel);
routers.get("/get", validateToken, getHotel);
routers.get("/:id", validateToken, getHotelById);
routers.put("/:id", validateToken, upload.array("imageFiles", 6), editHotel);

export default routers;
