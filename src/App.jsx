import { useState } from "react";
import "./App.css";

function App() {
  // =========================================================
  // BASIC APPLICATION STATE
  // =========================================================

  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("");
  const [consent, setConsent] = useState(false);

  const [complaint, setComplaint] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // =========================================================
  // DOCUMENT STATE
  // =========================================================

  const [documentType, setDocumentType] = useState("");
  const [documents, setDocuments] = useState([]);

  const [processing, setProcessing] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);
  const [uploadError, setUploadError] = useState("");

  // =========================================================
  // CLINICAL QUESTIONS
  // =========================================================

  const questions = {
    EN: [
      {
        id: "onset",
        question: "When did the pain start?",
        type: "choice",
        options: [
          "Today",
          "Yesterday",
          "A few days ago",
          "More than a week ago",
        ],
      },
      {
        id: "location",
        question: "Where exactly do you feel the pain?",
        type: "choice",
        options: [
          "Centre of the chest",
          "Left side of the chest",
          "Right side of the chest",
          "Other location",
        ],
      },
      {
        id: "character",
        question: "How would you describe the pain?",
        type: "choice",
        options: [
          "Pressure",
          "Tightness",
          "Burning",
          "Sharp",
          "Dull",
        ],
      },
      {
        id: "radiation",
        question:
          "Does the pain spread to another part of your body?",
        type: "choice",
        options: [
          "No",
          "Left arm",
          "Right arm",
          "Both arms",
          "Back",
          "Jaw or neck",
        ],
      },
      {
        id: "severity",
        question: "How severe is the pain?",
        type: "scale",
        options: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ],
      },
    ],

    TA: [
      {
        id: "onset",
        question: "வலி எப்போது தொடங்கியது?",
        type: "choice",
        options: [
          "இன்று",
          "நேற்று",
          "சில நாட்களுக்கு முன்பு",
          "ஒரு வாரத்திற்கு முன்பு",
        ],
      },
      {
        id: "location",
        question: "வலி சரியாக எங்கு உள்ளது?",
        type: "choice",
        options: [
          "மார்பின் நடுப்பகுதி",
          "மார்பின் இடப்பக்கம்",
          "மார்பின் வலப்பக்கம்",
          "வேறு இடம்",
        ],
      },
      {
        id: "character",
        question: "வலியை எவ்வாறு விவரிப்பீர்கள்?",
        type: "choice",
        options: [
          "அழுத்தம்",
          "இறுக்கம்",
          "எரிச்சல்",
          "கூர்மையான வலி",
          "மந்தமான வலி",
        ],
      },
      {
        id: "radiation",
        question:
          "வலி உடலின் வேறு பகுதிக்கு பரவுகிறதா?",
        type: "choice",
        options: [
          "இல்லை",
          "இடது கை",
          "வலது கை",
          "இரண்டு கைகளும்",
          "முதுகு",
          "தாடை அல்லது கழுத்து",
        ],
      },
      {
        id: "severity",
        question: "வலியின் தீவிரம் எவ்வளவு?",
        type: "scale",
        options: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ],
      },
    ],

    HI: [
      {
        id: "onset",
        question: "दर्द कब शुरू हुआ?",
        type: "choice",
        options: [
          "आज",
          "कल",
          "कुछ दिन पहले",
          "एक सप्ताह से अधिक पहले",
        ],
      },
      {
        id: "location",
        question: "दर्द ठीक कहाँ महसूस हो रहा है?",
        type: "choice",
        options: [
          "छाती के बीच में",
          "छाती के बाईं ओर",
          "छाती के दाईं ओर",
          "अन्य स्थान",
        ],
      },
      {
        id: "character",
        question: "आप दर्द का वर्णन कैसे करेंगे?",
        type: "choice",
        options: [
          "दबाव",
          "जकड़न",
          "जलन",
          "तेज़ दर्द",
          "हल्का दर्द",
        ],
      },
      {
        id: "radiation",
        question:
          "क्या दर्द शरीर के किसी अन्य हिस्से में फैलता है?",
        type: "choice",
        options: [
          "नहीं",
          "बायां हाथ",
          "दायां हाथ",
          "दोनों हाथ",
          "पीठ",
          "जबड़ा या गर्दन",
        ],
      },
      {
        id: "severity",
        question: "दर्द की तीव्रता कितनी है?",
        type: "scale",
        options: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ],
      },
    ],
  };

  // =========================================================
  // LANGUAGE TEXT
  // =========================================================

  const labels = {
    EN: {
      history: "CLINICAL HISTORY",
      chiefComplaint: "CHIEF COMPLAINT",

      mainQuestion:
        "What brings you to the hospital today?",

      placeholder:
        "Example: I have been having chest pain since yesterday.",

      continue: "Continue",
      previous: "Previous",
      next: "Next Question",
      completed: "Complete History",

      question: "QUESTION",
      summary: "REVIEW CLINICAL HISTORY",

      emergency:
        "If you are experiencing a medical emergency, immediately notify hospital staff.",

      otherLocation:
        "Please specify the location",

      otherPlaceholder:
        "Enter the location",

      documents:
        "MEDICAL DOCUMENTS",

      documentsTitle:
        "Previous Medical Records",

      documentsDescription:
        "Upload previous prescriptions, laboratory reports or discharge summaries. MediKiosk will organize these documents for clinical review.",

      prescription:
        "Prescription",

      lab:
        "Laboratory Report",

      discharge:
        "Discharge Summary",

      otherDocument:
        "Other Medical Document",

      upload:
        "Upload Document",

      chooseFile:
        "Choose File",

      selectedDocuments:
        "SELECTED DOCUMENTS",

      noDocuments:
        "No documents uploaded yet.",

      remove:
        "Remove",

      process:
        "Process Medical Documents",

      supported:
        "Supported formats: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "Please select the document type first.",

      physicianReview:
        "This information is a patient-reported history draft. A healthcare professional must review and verify it before clinical use.",

      uploadSuccess:
        "Document successfully received by MediKiosk.",

      uploadFailed:
        "Document upload failed.",

      uploading:
        "Uploading documents...",

      documentsReceived:
        "Documents Received",

      documentsReceivedDescription:
        "The selected documents have been securely transferred to the MediKiosk processing service.",

      processingStage:
        "Processing Stage",

      backendReceived:
        "Document received",

      backendReceivedDescription:
        "The document has been received by the MediKiosk backend.",

      ocr:
        "OCR extraction",

      ocrDescription:
        "The next stage will extract printed and handwritten text.",

      extraction:
        "Clinical information extraction",

      extractionDescription:
        "Clinical entities such as medicines, diagnoses and investigation values will be identified.",

      timeline:
        "Medical timeline",

      timelineDescription:
        "Previous records will be organized chronologically.",

      continueReview:
        "Continue to Review",

      back:
        "Back",

      uploadError:
        "One or more documents could not be uploaded.",
    },

    TA: {
      history: "மருத்துவ வரலாறு",
      chiefComplaint: "முக்கிய உடல்நலப் பிரச்சனை",

      mainQuestion:
        "இன்று மருத்துவமனைக்கு வருவதற்கான முக்கிய காரணம் என்ன?",

      placeholder:
        "உதாரணம்: நேற்று முதல் எனக்கு மார்பில் வலி உள்ளது.",

      continue: "தொடரவும்",
      previous: "முந்தையது",
      next: "அடுத்த கேள்வி",
      completed: "வரலாற்றைப் பூர்த்தி செய்யவும்",

      question: "கேள்வி",
      summary: "மருத்துவ வரலாற்றைப் பார்க்கவும்",

      emergency:
        "மருத்துவ அவசரநிலை ஏற்பட்டால் உடனடியாக மருத்துவமனை ஊழியர்களுக்குத் தெரிவிக்கவும்.",

      otherLocation:
        "வலியின் இடத்தை குறிப்பிடவும்",

      otherPlaceholder:
        "இடத்தை உள்ளிடவும்",

      documents:
        "மருத்துவ ஆவணங்கள்",

      documentsTitle:
        "முந்தைய மருத்துவ பதிவுகள்",

      documentsDescription:
        "முந்தைய மருந்துச் சீட்டுகள், ஆய்வக அறிக்கைகள் அல்லது மருத்துவமனை வெளியேற்றச் சுருக்கங்களை பதிவேற்றவும்.",

      prescription:
        "மருந்துச் சீட்டு",

      lab:
        "ஆய்வக அறிக்கை",

      discharge:
        "மருத்துவமனை வெளியேற்றச் சுருக்கம்",

      otherDocument:
        "மற்ற மருத்துவ ஆவணம்",

      upload:
        "ஆவணத்தைப் பதிவேற்றவும்",

      chooseFile:
        "கோப்பைத் தேர்ந்தெடுக்கவும்",

      selectedDocuments:
        "தேர்ந்தெடுக்கப்பட்ட ஆவணங்கள்",

      noDocuments:
        "இதுவரை எந்த ஆவணமும் பதிவேற்றப்படவில்லை.",

      remove:
        "நீக்கவும்",

      process:
        "மருத்துவ ஆவணங்களைச் செயலாக்கவும்",

      supported:
        "ஆதரிக்கப்படும் வடிவங்கள்: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "முதலில் ஆவணத்தின் வகையைத் தேர்ந்தெடுக்கவும்.",

      physicianReview:
        "இந்த தகவல் நோயாளியால் வழங்கப்பட்ட மருத்துவ வரலாற்றின் வரைவு ஆகும். மருத்துவ பயன்பாட்டிற்கு முன் சுகாதார நிபுணர் சரிபார்க்க வேண்டும்.",

      uploadSuccess:
        "ஆவணம் MediKiosk-க்கு வெற்றிகரமாக பெறப்பட்டது.",

      uploadFailed:
        "ஆவணப் பதிவேற்றம் தோல்வியடைந்தது.",

      uploading:
        "ஆவணங்கள் பதிவேற்றப்படுகின்றன...",

      documentsReceived:
        "ஆவணங்கள் பெறப்பட்டன",

      documentsReceivedDescription:
        "தேர்ந்தெடுக்கப்பட்ட ஆவணங்கள் MediKiosk செயலாக்க சேவைக்கு அனுப்பப்பட்டுள்ளன.",

      processingStage:
        "செயலாக்க நிலை",

      backendReceived:
        "ஆவணம் பெறப்பட்டது",

      backendReceivedDescription:
        "ஆவணம் MediKiosk backend-ஆல் பெறப்பட்டது.",

      ocr:
        "OCR பிரித்தெடுத்தல்",

      ocrDescription:
        "அடுத்த நிலையில் அச்சிடப்பட்ட மற்றும் கையால் எழுதப்பட்ட உரை பிரித்தெடுக்கப்படும்.",

      extraction:
        "மருத்துவ தகவல் பிரித்தெடுத்தல்",

      extractionDescription:
        "மருந்துகள், நோயறிதல்கள் மற்றும் ஆய்வு மதிப்புகள் போன்ற தகவல்கள் அடையாளம் காணப்படும்.",

      timeline:
        "மருத்துவ காலவரிசை",

      timelineDescription:
        "முந்தைய பதிவுகள் காலவரிசைப்படி ஒழுங்கமைக்கப்படும்.",

      continueReview:
        "மதிப்பாய்வுக்குத் தொடரவும்",

      back:
        "மீண்டும்",

      uploadError:
        "ஒன்று அல்லது அதற்கு மேற்பட்ட ஆவணங்களைப் பதிவேற்ற முடியவில்லை.",
    },

    HI: {
      history: "क्लिनिकल इतिहास",
      chiefComplaint: "मुख्य स्वास्थ्य समस्या",

      mainQuestion:
        "आज आपको अस्पताल आने का मुख्य कारण क्या है?",

      placeholder:
        "उदाहरण: मुझे कल से सीने में दर्द हो रहा है।",

      continue: "जारी रखें",
      previous: "पिछला",
      next: "अगला प्रश्न",
      completed: "इतिहास पूरा करें",

      question: "प्रश्न",
      summary: "क्लिनिकल इतिहास देखें",

      emergency:
        "यदि आपको कोई चिकित्सीय आपात स्थिति हो रही है, तो तुरंत अस्पताल के कर्मचारियों को सूचित करें।",

      otherLocation:
        "कृपया स्थान बताएं",

      otherPlaceholder:
        "स्थान दर्ज करें",

      documents:
        "चिकित्सा दस्तावेज़",

      documentsTitle:
        "पिछले चिकित्सा रिकॉर्ड",

      documentsDescription:
        "पिछले प्रिस्क्रिप्शन, प्रयोगशाला रिपोर्ट या डिस्चार्ज सारांश अपलोड करें।",

      prescription:
        "प्रिस्क्रिप्शन",

      lab:
        "प्रयोगशाला रिपोर्ट",

      discharge:
        "डिस्चार्ज सारांश",

      otherDocument:
        "अन्य चिकित्सा दस्तावेज़",

      upload:
        "दस्तावेज़ अपलोड करें",

      chooseFile:
        "फ़ाइल चुनें",

      selectedDocuments:
        "चयनित दस्तावेज़",

      noDocuments:
        "अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया है।",

      remove:
        "हटाएं",

      process:
        "चिकित्सा दस्तावेज़ संसाधित करें",

      supported:
        "समर्थित प्रारूप: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "कृपया पहले दस्तावेज़ का प्रकार चुनें।",

      physicianReview:
        "यह जानकारी रोगी द्वारा दी गई चिकित्सा इतिहास की प्रारंभिक जानकारी है। चिकित्सीय उपयोग से पहले स्वास्थ्य विशेषज्ञ द्वारा इसकी समीक्षा और पुष्टि की जानी चाहिए।",

      uploadSuccess:
        "दस्तावेज़ MediKiosk द्वारा सफलतापूर्वक प्राप्त किया गया।",

      uploadFailed:
        "दस्तावेज़ अपलोड विफल हुआ।",

      uploading:
        "दस्तावेज़ अपलोड किए जा रहे हैं...",

      documentsReceived:
        "दस्तावेज़ प्राप्त हुए",

      documentsReceivedDescription:
        "चयनित दस्तावेज़ MediKiosk प्रसंस्करण सेवा को भेज दिए गए हैं।",

      processingStage:
        "प्रसंस्करण चरण",

      backendReceived:
        "दस्तावेज़ प्राप्त हुआ",

      backendReceivedDescription:
        "दस्तावेज़ MediKiosk backend द्वारा प्राप्त किया गया है।",

      ocr:
        "OCR निष्कर्षण",

      ocrDescription:
        "अगले चरण में मुद्रित और हस्तलिखित पाठ निकाला जाएगा।",

      extraction:
        "चिकित्सीय जानकारी निष्कर्षण",

      extractionDescription:
        "दवाओं, निदान और जांच परिणामों जैसी जानकारी की पहचान की जाएगी।",

      timeline:
        "चिकित्सा समयरेखा",

      timelineDescription:
        "पिछले रिकॉर्ड को कालानुक्रमिक क्रम में व्यवस्थित किया जाएगा।",

      continueReview:
        "समीक्षा के लिए जारी रखें",

      back:
        "वापस",

      uploadError:
        "एक या अधिक दस्तावेज़ अपलोड नहीं किए जा सके।",
    },
  };

  const t = labels[language || "EN"];

  const currentQuestions =
    questions[language || "EN"];

  const currentQuestion =
    currentQuestions[questionIndex];

  // =========================================================
  // ANSWER HANDLING
  // =========================================================

  const selectAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answer,
    }));
  };

  const isCurrentAnswerValid = () => {
    const answer =
      answers[currentQuestion?.id];

    if (!answer) {
      return false;
    }

    // Other location requires additional text.
    if (
      currentQuestion.id === "location" &&
      (
        answer === "Other location" ||
        answer === "வேறு இடம்" ||
        answer === "अन्य स्थान"
      )
    ) {
      return Boolean(
        answers.locationOther?.trim()
      );
    }

    return true;
  };

  const goNext = () => {
    if (
      questionIndex <
      currentQuestions.length - 1
    ) {
      setQuestionIndex(
        questionIndex + 1
      );
    } else {
      setStep(5);
    }
  };

  const goPrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(
        questionIndex - 1
      );
    }
  };

  // =========================================================
  // DOCUMENT SELECTION
  // =========================================================

  const handleDocumentUpload = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!documentType) {
      alert(t.documentTypeRequired);
      return;
    }

    const newDocuments = files.map(
      (file) => ({
        id:
          Date.now() +
          Math.random(),

        file,

        name: file.name,

        type: documentType,

        size: file.size,

        preview:
          file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,

        uploadStatus: "selected",
      })
    );

    setDocuments((previous) => [
      ...previous,
      ...newDocuments,
    ]);

    event.target.value = "";
  };

  // =========================================================
  // REMOVE DOCUMENT
  // =========================================================

  const removeDocument = (id) => {
    setDocuments((previous) =>
      previous.filter(
        (document) =>
          document.id !== id
      )
    );

    setUploadResults((previous) =>
      previous.filter(
        (result) =>
          result.id !== id
      )
    );
  };

  // =========================================================
  // SEND DOCUMENT TO EXPRESS BACKEND
  // =========================================================

  const processDocuments = async () => {
    if (documents.length === 0) {
      return;
    }

    setProcessing(true);
    setUploadError("");
    setUploadResults([]);

    const results = [];

    for (const document of documents) {
      try {
        const formData =
          new FormData();

        formData.append(
          "document",
          document.file
        );

        formData.append(
          "documentType",
          document.type
        );

        const response =
          await fetch(
            "http://localhost:5000/api/documents/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        if (!response.ok) {
          throw new Error(
            "Document upload failed"
          );
        }

        const data =
          await response.json();

        results.push({
          id: document.id,

          name: document.name,

          success: true,

          data,
        });

      } catch (error) {
        console.error(
          "MediKiosk upload error:",
          error
        );

        results.push({
          id: document.id,

          name: document.name,

          success: false,

          error:
            error.message ||
            t.uploadFailed,
        });
      }
    }

    setUploadResults(results);

    const hasFailure =
      results.some(
        (result) =>
          !result.success
      );

    if (hasFailure) {
      setUploadError(
        t.uploadError
      );
    }

    setDocuments((previous) =>
      previous.map(
        (document) => {
          const result =
            results.find(
              (item) =>
                item.id ===
                document.id
            );

          return {
            ...document,

            uploadStatus:
              result?.success
                ? "uploaded"
                : "failed",
          };
        }
      )
    );

    setProcessing(false);

    setStep(7);
  };

  // =========================================================
  // HELPER
  // =========================================================

  const isOtherLocation =
    currentQuestion?.id ===
      "location" &&
    (
      answers.location ===
        "Other location" ||
      answers.location ===
        "வேறு இடம்" ||
      answers.location ===
        "अन्य स्थान"
    );

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="app">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">
            M
          </div>

          <div>

            <div className="brand-name">
              MediKiosk
            </div>

            <div className="brand-subtitle">
              Digital Clinical Intake System
            </div>

          </div>

        </div>

        <div className="facility">
          PATIENT SERVICES
        </div>

      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="progress-section">

        <div className="progress-container">

          <div
            className={
              step >= 1
                ? "progress-step active"
                : "progress-step"
            }
          >
            <span>01</span>
            <p>Registration</p>
          </div>

          <div className="progress-line"></div>

          <div
            className={
              step >= 2
                ? "progress-step active"
                : "progress-step"
            }
          >
            <span>02</span>
            <p>Language & Consent</p>
          </div>

          <div className="progress-line"></div>

          <div
            className={
              step >= 3
                ? "progress-step active"
                : "progress-step"
            }
          >
            <span>03</span>
            <p>Clinical History</p>
          </div>

          <div className="progress-line"></div>

          <div
            className={
              step >= 6
                ? "progress-step active"
                : "progress-step"
            }
          >
            <span>04</span>
            <p>Documents</p>
          </div>

        </div>

      </div>

      <main className="main-content">

        {/* ===================================================
            STEP 1 — INTRODUCTION
        =================================================== */}

        {step === 1 && (
          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  PATIENT INTAKE
                </div>

                <h1>
                  Welcome to MediKiosk
                </h1>

                <p>
                  Complete your clinical history
                  before meeting your healthcare
                  provider.
                </p>

              </div>

              <div className="medical-symbol">
                +
              </div>

            </div>

            <div className="divider"></div>

            <div className="information-grid">

              <div className="information-item">

                <div className="information-number">
                  01
                </div>

                <div>

                  <h3>
                    Guided History
                  </h3>

                  <p>
                    Answer structured questions
                    about your current health
                    condition.
                  </p>

                </div>

              </div>

              <div className="information-item">

                <div className="information-number">
                  02
                </div>

                <div>

                  <h3>
                    Medical Documents
                  </h3>

                  <p>
                    Previous medical documents
                    can be digitized and organized.
                  </p>

                </div>

              </div>

              <div className="information-item">

                <div className="information-number">
                  03
                </div>

                <div>

                  <h3>
                    Clinical Summary
                  </h3>

                  <p>
                    Information is organized into
                    a summary for your healthcare
                    provider.
                  </p>

                </div>

              </div>

            </div>

            <div className="notice">

              <div className="notice-title">
                IMPORTANT
              </div>

              <p>
                MediKiosk assists with collecting
                and organizing health information.
                It does not provide a medical
                diagnosis.
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() =>
                setStep(2)
              }
            >
              Begin Patient Registration
            </button>

          </section>
        )}

        {/* ===================================================
            STEP 2 — LANGUAGE & CONSENT
        =================================================== */}

        {step === 2 && (
          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  STEP 02
                </div>

                <h1>
                  Language & Consent
                </h1>

                <p>
                  Select your preferred language
                  for the clinical history process.
                </p>

              </div>

            </div>

            <div className="divider"></div>

            <h2 className="subheading">
              Preferred Language
            </h2>

            <div className="language-grid">

              <button
                className={
                  language === "EN"
                    ? "language-card selected"
                    : "language-card"
                }
                onClick={() =>
                  setLanguage("EN")
                }
              >
                <span className="language-code">
                  EN
                </span>

                <span className="language-name">
                  English
                </span>
              </button>

              <button
                className={
                  language === "TA"
                    ? "language-card selected"
                    : "language-card"
                }
                onClick={() =>
                  setLanguage("TA")
                }
              >
                <span className="language-code">
                  TA
                </span>

                <span className="language-name">
                  தமிழ்
                </span>
              </button>

              <button
                className={
                  language === "HI"
                    ? "language-card selected"
                    : "language-card"
                }
                onClick={() =>
                  setLanguage("HI")
                }
              >
                <span className="language-code">
                  HI
                </span>

                <span className="language-name">
                  हिन्दी
                </span>
              </button>

            </div>

            <div className="divider"></div>

            <h2 className="subheading">
              Patient Consent
            </h2>

            <div className="consent-panel">

              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(event) =>
                  setConsent(
                    event.target.checked
                  )
                }
              />

              <label htmlFor="consent">

                I understand that MediKiosk
                will collect information about
                my health history and previous
                medical records for the purpose
                of supporting my clinical
                consultation.

                <span>
                  I understand that the
                  information will be reviewed
                  by a healthcare professional
                  and that MediKiosk does not
                  independently diagnose or
                  prescribe treatment.
                </span>

              </label>

            </div>

            <div className="button-row">

              <button
                className="secondary-button"
                onClick={() =>
                  setStep(1)
                }
              >
                Back
              </button>

              <button
                className="primary-button"
                disabled={
                  !language ||
                  !consent
                }
                onClick={() =>
                  setStep(3)
                }
              >
                Continue to Clinical History
              </button>

            </div>

          </section>
        )}

        {/* ===================================================
            STEP 3 — CHIEF COMPLAINT
        =================================================== */}

        {step === 3 && (
          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.history}
                </div>

                <h1>
                  {t.mainQuestion}
                </h1>

                <p>
                  Please describe your main
                  health concern in your own
                  words.
                </p>

              </div>

              <div className="medical-symbol">
                +
              </div>

            </div>

            <div className="divider"></div>

            <div className="clinical-question">

              <div className="question-number">
                01
              </div>

              <div>

                <div className="question-type">
                  {t.chiefComplaint}
                </div>

                <h2>
                  {t.mainQuestion}
                </h2>

              </div>

            </div>

            <textarea
              className="clinical-input"
              value={complaint}
              onChange={(event) =>
                setComplaint(
                  event.target.value
                )
              }
              placeholder={
                t.placeholder
              }
            />

            <div className="input-options">

              <button
                className="voice-button"
                onClick={() =>
                  alert(
                    "Voice recognition will be integrated in the next phase."
                  )
                }
              >
                Voice Input
              </button>

              <button
                className="touch-button"
                disabled={
                  !complaint.trim()
                }
                onClick={() => {

                  setQuestionIndex(0);

                  setStep(4);

                }}
              >
                {t.continue}
              </button>

            </div>

            <div className="safety-note">

              <strong>
                Clinical safety:
              </strong>{" "}

              {t.emergency}

            </div>

          </section>
        )}

        {/* ===================================================
            STEP 4 — QUESTIONS
        =================================================== */}

        {step === 4 &&
          currentQuestion && (

            <section className="clinical-card">

              <div className="history-top">

                <div>

                  <div className="section-label">
                    {t.history}
                  </div>

                  <h1>
                    {t.chiefComplaint}
                  </h1>

                </div>

                <div className="question-counter">

                  {questionIndex + 1}
                  {" / "}
                  {currentQuestions.length}

                </div>

              </div>

              <div className="clinical-progress">

                <div
                  className="clinical-progress-fill"
                  style={{
                    width:
                      `${
                        ((questionIndex + 1) /
                          currentQuestions.length) *
                        100
                      }%`,
                  }}
                ></div>

              </div>

              <div className="divider"></div>

              <div className="clinical-question">

                <div className="question-number">

                  {String(
                    questionIndex + 1
                  ).padStart(2, "0")}

                </div>

                <div>

                  <div className="question-type">
                    {t.question}
                  </div>

                  <h2>
                    {currentQuestion.question}
                  </h2>

                </div>

              </div>

              {/* CHOICE QUESTIONS */}

              {currentQuestion.type ===
                "choice" && (

                <>

                  <div className="answer-grid">

                    {currentQuestion.options.map(
                      (option) => (

                        <button
                          key={option}
                          className={
                            answers[
                              currentQuestion.id
                            ] === option
                              ? "answer-card selected"
                              : "answer-card"
                          }
                          onClick={() =>
                            selectAnswer(
                              option
                            )
                          }
                        >
                          {option}
                        </button>

                      )
                    )}

                  </div>

                  {/* OTHER LOCATION */}

                  {isOtherLocation && (

                    <div className="additional-input">

                      <label>
                        {t.otherLocation}
                      </label>

                      <input
                        type="text"
                        value={
                          answers.locationOther ||
                          ""
                        }
                        onChange={(event) =>
                          setAnswers(
                            (previous) => ({
                              ...previous,

                              locationOther:
                                event.target.value,
                            })
                          )
                        }
                        placeholder={
                          t.otherPlaceholder
                        }
                      />

                    </div>

                  )}

                </>

              )}

              {/* PAIN SCALE */}

              {currentQuestion.type ===
                "scale" && (

                <div className="scale-container">

                  <div className="scale-labels">

                    <span>
                      No pain
                    </span>

                    <span>
                      Worst possible pain
                    </span>

                  </div>

                  <div className="scale-grid">

                    {currentQuestion.options.map(
                      (number) => (

                        <button
                          key={number}
                          className={
                            answers[
                              currentQuestion.id
                            ] === number
                              ? "scale-button selected"
                              : "scale-button"
                          }
                          onClick={() =>
                            selectAnswer(
                              number
                            )
                          }
                        >
                          {number}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

              <div className="button-row">

                <button
                  className="secondary-button"
                  disabled={
                    questionIndex === 0
                  }
                  onClick={goPrevious}
                >
                  {t.previous}
                </button>

                <button
                  className="primary-button"
                  disabled={
                    !isCurrentAnswerValid()
                  }
                  onClick={goNext}
                >
                  {questionIndex ===
                  currentQuestions.length - 1
                    ? t.completed
                    : t.next}
                </button>

              </div>

              <div className="safety-note">

                <strong>
                  Clinical safety:
                </strong>{" "}

                {t.emergency}

              </div>

            </section>

          )}

        {/* ===================================================
            STEP 5 — CLINICAL SUMMARY
        =================================================== */}

        {step === 5 && (

          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.history}
                </div>

                <h1>
                  {t.summary}
                </h1>

                <p>
                  Review the information collected
                  before continuing.
                </p>

              </div>

            </div>

            <div className="divider"></div>

            <div className="summary-section">

              <div className="summary-title">
                Chief Complaint
              </div>

              <div className="summary-value">
                {complaint}
              </div>

            </div>

            {currentQuestions.map(
              (question) => (

                <div
                  className="summary-row"
                  key={question.id}
                >

                  <div className="summary-question">
                    {question.question}
                  </div>

                  <div className="summary-answer">

                    {question.id ===
                      "location" &&
                    isOtherLocation
                      ? answers.locationOther
                      : answers[
                          question.id
                        ]}

                  </div>

                </div>

              )
            )}

            <div className="notice">

              <div className="notice-title">
                PHYSICIAN REVIEW
              </div>

              <p>
                {t.physicianReview}
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() =>
                setStep(6)
              }
            >
              Continue to Medical Documents
            </button>

          </section>

        )}

        {/* ===================================================
            STEP 6 — MEDICAL DOCUMENTS
        =================================================== */}

        {step === 6 && (

          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  STEP 04 • {t.documents}
                </div>

                <h1>
                  {t.documentsTitle}
                </h1>

                <p>
                  {t.documentsDescription}
                </p>

              </div>

              <div className="medical-symbol">
                +
              </div>

            </div>

            <div className="divider"></div>

            {/* DOCUMENT TYPE */}

            <div className="document-section">

              <div className="question-type">
                DOCUMENT TYPE
              </div>

              <h2>
                Select the type of document
              </h2>

              <div className="document-type-grid">

                <button
                  className={
                    documentType ===
                    "Prescription"
                      ? "document-type selected"
                      : "document-type"
                  }
                  onClick={() =>
                    setDocumentType(
                      "Prescription"
                    )
                  }
                >

                  <div className="document-icon">
                    RX
                  </div>

                  <strong>
                    {t.prescription}
                  </strong>

                  <span>
                    Prescription / medication
                    record
                  </span>

                </button>

                <button
                  className={
                    documentType ===
                    "Laboratory Report"
                      ? "document-type selected"
                      : "document-type"
                  }
                  onClick={() =>
                    setDocumentType(
                      "Laboratory Report"
                    )
                  }
                >

                  <div className="document-icon">
                    LAB
                  </div>

                  <strong>
                    {t.lab}
                  </strong>

                  <span>
                    Blood tests / investigations
                  </span>

                </button>

                <button
                  className={
                    documentType ===
                    "Discharge Summary"
                      ? "document-type selected"
                      : "document-type"
                  }
                  onClick={() =>
                    setDocumentType(
                      "Discharge Summary"
                    )
                  }
                >

                  <div className="document-icon">
                    DS
                  </div>

                  <strong>
                    {t.discharge}
                  </strong>

                  <span>
                    Hospital discharge record
                  </span>

                </button>

                <button
                  className={
                    documentType ===
                    "Other Medical Document"
                      ? "document-type selected"
                      : "document-type"
                  }
                  onClick={() =>
                    setDocumentType(
                      "Other Medical Document"
                    )
                  }
                >

                  <div className="document-icon">
                    DOC
                  </div>

                  <strong>
                    {t.otherDocument}
                  </strong>

                  <span>
                    Other relevant record
                  </span>

                </button>

              </div>

            </div>

            <div className="divider"></div>

            {/* UPLOAD */}

            <div className="upload-area">

              <div className="upload-title">
                {t.upload}
              </div>

              <div className="upload-description">
                {t.supported}
              </div>

              <label className="upload-button">

                <span>
                  +
                </span>

                {t.chooseFile}

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={
                    handleDocumentUpload
                  }
                />

              </label>

            </div>

            {/* DOCUMENT LIST */}

            <div className="document-list">

              <div className="document-list-header">

                <div>

                  <div className="question-type">
                    {t.selectedDocuments}
                  </div>

                  <h2>
                    {documents.length}
                    {" "}
                    document
                    {documents.length !== 1
                      ? "s"
                      : ""}
                  </h2>

                </div>

              </div>

              {documents.length === 0 && (

                <div className="empty-documents">
                  {t.noDocuments}
                </div>

              )}

              {documents.map(
                (document) => (

                  <div
                    className="document-card"
                    key={document.id}
                  >

                    <div className="document-preview">

                      {document.preview ? (

                        <img
                          src={
                            document.preview
                          }
                          alt={
                            document.name
                          }
                        />

                      ) : (

                        <div className="pdf-preview">
                          PDF
                        </div>

                      )}

                    </div>

                    <div className="document-info">

                      <div className="document-name">
                        {document.name}
                      </div>

                      <div className="document-meta">
                        {document.type}
                      </div>

                      <div className="document-size">
                        {(
                          document.size /
                          1024
                        ).toFixed(1)}
                        {" KB"}
                      </div>

                      {document.uploadStatus ===
                        "uploaded" && (

                        <div className="document-meta">
                          {t.uploadSuccess}
                        </div>

                      )}

                      {document.uploadStatus ===
                        "failed" && (

                        <div className="document-meta">
                          {t.uploadFailed}
                        </div>

                      )}

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeDocument(
                          document.id
                        )
                      }
                    >
                      {t.remove}
                    </button>

                  </div>

                )
              )}

            </div>

            <div className="button-row">

              <button
                className="secondary-button"
                onClick={() =>
                  setStep(5)
                }
                disabled={processing}
              >
                {t.previous}
              </button>

              <button
                className="primary-button"
                disabled={
                  documents.length === 0 ||
                  processing
                }
                onClick={
                  processDocuments
                }
              >
                {processing
                  ? t.uploading
                  : t.process}
              </button>

            </div>

          </section>

        )}

        {/* ===================================================
            STEP 7 — BACKEND PROCESSING
        =================================================== */}

        {step === 7 && (

          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  DOCUMENT PROCESSING
                </div>

                <h1>
                  {t.documentsReceived}
                </h1>

                <p>
                  {t.documentsReceivedDescription}
                </p>

              </div>

              <div className="medical-symbol">
                ✓
              </div>

            </div>

            <div className="divider"></div>

            {/* UPLOAD ERROR */}

            {uploadError && (

              <div className="notice">

                <div className="notice-title">
                  UPLOAD STATUS
                </div>

                <p>
                  {uploadError}
                </p>

              </div>

            )}

            {/* PROCESSING STATUS */}

            <div className="processing-panel">

              <div className="processing-step active">

                <span>
                  01
                </span>

                <div>

                  <strong>
                    {t.backendReceived}
                  </strong>

                  <p>
                    {t.backendReceivedDescription}
                  </p>

                </div>

              </div>

              <div className="processing-step">

                <span>
                  02
                </span>

                <div>

                  <strong>
                    {t.ocr}
                  </strong>

                  <p>
                    {t.ocrDescription}
                  </p>

                </div>

              </div>

              <div className="processing-step">

                <span>
                  03
                </span>

                <div>

                  <strong>
                    {t.extraction}
                  </strong>

                  <p>
                    {t.extractionDescription}
                  </p>

                </div>

              </div>

              <div className="processing-step">

                <span>
                  04
                </span>

                <div>

                  <strong>
                    {t.timeline}
                  </strong>

                  <p>
                    {t.timelineDescription}
                  </p>

                </div>

              </div>

            </div>

            {/* RESULTS */}

            {uploadResults.length > 0 && (

              <div className="document-list">

                <div className="question-type">
                  {t.processingStage}
                </div>

                {uploadResults.map(
                  (result) => (

                    <div
                      className="document-card"
                      key={result.id}
                    >

                      <div className="document-info">

                        <div className="document-name">
                          {result.name}
                        </div>

                        <div className="document-meta">

                          {result.success
                            ? t.uploadSuccess
                            : t.uploadFailed}

                        </div>

                        {result.success &&
                          result.data && (

                          <div className="document-size">

                            Backend status:
                            {" "}
                            {result.data.processing?.status ||
                              "received"}

                            {" • "}

                            Stage:
                            {" "}
                            {result.data.processing?.stage ||
                              "OCR"}

                          </div>

                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

            <div className="notice">

              <div className="notice-title">
                CLINICAL SAFETY
              </div>

              <p>
                Document processing produces
                information for clinical review.
                Extracted information must be
                verified by a healthcare professional
                before clinical use.
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() =>
                console.log(
                  "MediKiosk upload results:",
                  uploadResults
                )
              }
            >
              {t.continueReview}
            </button>

          </section>

        )}

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <span>
          MediKiosk • Digital Clinical Intake
        </span>

        <span>
          Clinical information requires
          healthcare professional verification.
        </span>

      </footer>

    </div>
  );
}

export default App;