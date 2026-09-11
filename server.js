const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/"
});

app.get("/", (req, res) => {
  res.json({
    system: "MediKiosk",
    status: "Backend running",
    module: "Medical Document Digitization"
  });
});

app.post(
  "/api/documents/upload",
  upload.single("document"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document received"
      });
    }

    console.log("Document received:");
    console.log(req.file.originalname);

    res.json({
      success: true,

      message:
        "Document successfully received by MediKiosk",

      document: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      },

      processing: {
        status: "pending",
        stage: "OCR"
      }
    });
  }
);

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `MediKiosk backend running on http://localhost:${PORT}`
  );

});