import { useState } from "react";
import "./App.css";

function App() {
  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const [step, setStep] = useState(1);

  // =========================================================
  // PATIENT REGISTRATION
  // =========================================================

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sex: "",
    tokenNumber: "",
    admissionNumber: "",
    department: "",
  });

  // =========================================================
  // LANGUAGE + CONSENT
  // =========================================================

  const [language, setLanguage] = useState("");
  const [consent, setConsent] = useState(false);

  // =========================================================
  // CHIEF COMPLAINT
  // =========================================================

  const [complaint, setComplaint] = useState("");
  const [complaintType, setComplaintType] = useState("");

  // =========================================================
  // CLINICAL QUESTIONS
  // =========================================================

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
  // LANGUAGE TEXT
  // =========================================================

  const labels = {
    EN: {
      registration: "PATIENT REGISTRATION",
      registrationTitle: "Patient Registration",
      registrationDescription:
        "Enter the patient's basic details before starting the clinical history.",

      patientName: "Patient Name",
      patientNamePlaceholder: "Enter full name",

      age: "Age",
      agePlaceholder: "Enter age",

      sex: "Sex",
      male: "Male",
      female: "Female",
      other: "Other",

      tokenNumber: "Token Number",
      tokenPlaceholder: "Hospital token number",

      admissionNumber: "Admission Number",
      admissionPlaceholder:
        "Required for admitted patients",

      department: "Department",
      departmentPlaceholder: "Select department",

      outpatient: "Outpatient",
      inpatient: "Inpatient",

      languageConsent: "LANGUAGE & CONSENT",
      languageTitle: "Language & Consent",
      languageDescription:
        "Select the preferred language and provide consent to continue.",

      preferredLanguage: "Preferred Language",
      consentTitle: "Patient Consent",

      consentText:
        "I understand that MediKiosk will collect information about my health history and previous medical records to support my clinical consultation.",

      consentText2:
        "I understand that the information will be reviewed by a healthcare professional and that MediKiosk does not independently diagnose or prescribe treatment.",

      continue: "Continue",
      back: "Back",

      clinicalHistory: "CLINICAL HISTORY",

      mainQuestion:
        "What brings you to the hospital today?",

      complaintDescription:
        "Select the main health concern or describe it in your own words.",

      chestPain: "Chest Pain",
      fever: "Fever",
      headache: "Headache",
      cough: "Cough",
      abdominalPain: "Abdominal Pain",
      otherComplaint: "Other",

      complaintPlaceholder:
        "Describe your main health concern",

      voiceInput: "Voice Input",

      nextQuestion: "Next Question",
      completeHistory: "Complete History",
      previous: "Previous",

      question: "QUESTION",
      summary: "REVIEW CLINICAL HISTORY",

      emergency:
        "If you are experiencing a medical emergency, immediately notify hospital staff.",

      otherLocation: "Please specify the location",
      otherLocationPlaceholder: "Enter the specific location",

      otherComplaintText:
        "Please describe your health concern",

      medicalDocuments: "MEDICAL DOCUMENTS",
      previousRecords: "Previous Medical Records",

      documentsDescription:
        "Upload previous prescriptions, laboratory reports or discharge summaries. MediKiosk will organize the information for clinical review.",

      prescription: "Prescription",
      laboratory: "Laboratory Report",
      discharge: "Discharge Summary",
      otherDocument: "Other Medical Document",

      selectDocumentType:
        "Select the type of document",

      chooseFile: "Choose File",

      selectedDocuments: "SELECTED DOCUMENTS",
      noDocuments: "No documents uploaded yet.",

      remove: "Remove",

      processDocuments: "Process Medical Documents",

      supported:
        "Supported formats: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "Please select the document type first.",

      uploading: "Processing documents...",

      uploadSuccess:
        "Document successfully received by MediKiosk.",

      uploadFailed:
        "Document processing failed.",

      documentsReceived:
        "DOCUMENT PROCESSING",

      documentsReceivedDescription:
        "MediKiosk has received the selected medical documents.",

      processingStage: "PROCESSING STATUS",

      backendReceived: "Document received",

      ocr: "Text extraction",

      extraction: "Clinical information extraction",

      timeline: "Medical timeline",

      continueReview: "Continue to Document Review",

      documentReview: "DOCUMENT REVIEW",

      documentReviewTitle:
        "Review Extracted Medical Information",

      documentReviewDescription:
        "The information below was extracted from the uploaded documents and is provided for healthcare professional verification.",

      extractedInformation:
        "EXTRACTED INFORMATION",

      patientHistory: "PATIENT HISTORY",

      uploadedDocuments: "UPLOADED DOCUMENTS",

      received: "Received",

      verificationRequired:
        "VERIFICATION REQUIRED",

      verificationText:
        "Extracted information is transcribed from the uploaded document. It has not been independently verified and must be reviewed by a qualified healthcare professional before clinical use.",

      noReadableText:
        "No readable text was extracted from this document.",

      clinicalSafety: "CLINICAL SAFETY",

      clinicalSafetyText:
        "MediKiosk assists with collecting and organizing health information. It does not independently diagnose or prescribe treatment.",

      continueSummary:
        "Continue to Clinical Summary",
    },

    TA: {
      registration: "நோயாளர் பதிவு",
      registrationTitle: "நோயாளர் பதிவு",
      registrationDescription:
        "மருத்துவ வரலாற்றைத் தொடங்குவதற்கு முன் நோயாளியின் அடிப்படை விவரங்களை உள்ளிடவும்.",

      patientName: "நோயாளர் பெயர்",
      patientNamePlaceholder: "முழு பெயரை உள்ளிடவும்",

      age: "வயது",
      agePlaceholder: "வயதை உள்ளிடவும்",

      sex: "பாலினம்",
      male: "ஆண்",
      female: "பெண்",
      other: "மற்றது",

      tokenNumber: "டோக்கன் எண்",
      tokenPlaceholder: "மருத்துவமனை டோக்கன் எண்",

      admissionNumber: "அனுமதி எண்",
      admissionPlaceholder:
        "அனுமதிக்கப்பட்ட நோயாளிகளுக்கு தேவையானது",

      department: "துறை",
      departmentPlaceholder: "துறையைத் தேர்ந்தெடுக்கவும்",

      outpatient: "வெளிநோயாளர்",
      inpatient: "உள்நோயாளர்",

      languageConsent: "மொழி மற்றும் ஒப்புதல்",
      languageTitle: "மொழி மற்றும் ஒப்புதல்",
      languageDescription:
        "தொடர விருப்பமான மொழியைத் தேர்ந்தெடுத்து ஒப்புதல் அளிக்கவும்.",

      preferredLanguage: "விருப்பமான மொழி",
      consentTitle: "நோயாளர் ஒப்புதல்",

      consentText:
        "எனது மருத்துவ வரலாறு மற்றும் முந்தைய மருத்துவ பதிவுகளை மருத்துவ ஆலோசனைக்கு உதவுவதற்காக MediKiosk சேகரிக்கும் என்பதை புரிந்துகொள்கிறேன்.",

      consentText2:
        "இந்த தகவல்கள் சுகாதார நிபுணரால் மதிப்பாய்வு செய்யப்படும் என்பதையும் MediKiosk தானாக நோயறிதல் அல்லது சிகிச்சை வழங்காது என்பதையும் புரிந்துகொள்கிறேன்.",

      continue: "தொடரவும்",
      back: "மீண்டும்",

      clinicalHistory: "மருத்துவ வரலாறு",

      mainQuestion:
        "இன்று மருத்துவமனைக்கு வருவதற்கான முக்கிய காரணம் என்ன?",

      complaintDescription:
        "முக்கிய உடல்நலப் பிரச்சனையைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும்.",

      chestPain: "மார்பு வலி",
      fever: "காய்ச்சல்",
      headache: "தலைவலி",
      cough: "இருமல்",
      abdominalPain: "வயிற்று வலி",
      otherComplaint: "மற்றது",

      complaintPlaceholder:
        "உங்கள் முக்கிய உடல்நலப் பிரச்சனையை விவரிக்கவும்",

      voiceInput: "குரல் உள்ளீடு",

      nextQuestion: "அடுத்த கேள்வி",
      completeHistory: "வரலாற்றைப் பூர்த்தி செய்யவும்",
      previous: "முந்தையது",

      question: "கேள்வி",
      summary: "மருத்துவ வரலாற்றைப் பார்க்கவும்",

      emergency:
        "மருத்துவ அவசரநிலை ஏற்பட்டால் உடனடியாக மருத்துவமனை ஊழியர்களுக்குத் தெரிவிக்கவும்.",

      otherLocation: "இடத்தை குறிப்பிடவும்",
      otherLocationPlaceholder:
        "குறிப்பிட்ட இடத்தை உள்ளிடவும்",

      otherComplaintText:
        "உங்கள் உடல்நலப் பிரச்சனையை விவரிக்கவும்",

      medicalDocuments: "மருத்துவ ஆவணங்கள்",
      previousRecords: "முந்தைய மருத்துவ பதிவுகள்",

      documentsDescription:
        "முந்தைய மருந்துச் சீட்டுகள், ஆய்வக அறிக்கைகள் அல்லது வெளியேற்றச் சுருக்கங்களை பதிவேற்றவும்.",

      prescription: "மருந்துச் சீட்டு",
      laboratory: "ஆய்வக அறிக்கை",
      discharge: "வெளியேற்றச் சுருக்கம்",
      otherDocument: "மற்ற மருத்துவ ஆவணம்",

      selectDocumentType:
        "ஆவணத்தின் வகையைத் தேர்ந்தெடுக்கவும்",

      chooseFile: "கோப்பைத் தேர்ந்தெடுக்கவும்",

      selectedDocuments: "தேர்ந்தெடுக்கப்பட்ட ஆவணங்கள்",
      noDocuments: "இதுவரை எந்த ஆவணமும் பதிவேற்றப்படவில்லை.",

      remove: "நீக்கவும்",

      processDocuments:
        "மருத்துவ ஆவணங்களைச் செயலாக்கவும்",

      supported:
        "ஆதரிக்கப்படும் வடிவங்கள்: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "முதலில் ஆவண வகையைத் தேர்ந்தெடுக்கவும்.",

      uploading: "ஆவணங்கள் செயலாக்கப்படுகின்றன...",

      uploadSuccess:
        "ஆவணம் MediKiosk-ஆல் வெற்றிகரமாக பெறப்பட்டது.",

      uploadFailed:
        "ஆவண செயலாக்கம் தோல்வியடைந்தது.",

      documentsReceived:
        "ஆவண செயலாக்கம்",

      documentsReceivedDescription:
        "தேர்ந்தெடுக்கப்பட்ட மருத்துவ ஆவணங்களை MediKiosk பெற்றுள்ளது.",

      processingStage: "செயலாக்க நிலை",

      backendReceived: "ஆவணம் பெறப்பட்டது",

      ocr: "உரை பிரித்தெடுத்தல்",

      extraction: "மருத்துவ தகவல் பிரித்தெடுத்தல்",

      timeline: "மருத்துவ காலவரிசை",

      continueReview:
        "ஆவண மதிப்பாய்வுக்குத் தொடரவும்",

      documentReview: "ஆவண மதிப்பாய்வு",

      documentReviewTitle:
        "பிரித்தெடுக்கப்பட்ட மருத்துவ தகவலை மதிப்பாய்வு செய்யவும்",

      documentReviewDescription:
        "கீழே உள்ள தகவல்கள் பதிவேற்றப்பட்ட ஆவணங்களிலிருந்து பிரித்தெடுக்கப்பட்டவை. சுகாதார நிபுணர் அவற்றை சரிபார்க்க வேண்டும்.",

      extractedInformation:
        "பிரித்தெடுக்கப்பட்ட தகவல்",

      patientHistory: "நோயாளர் வரலாறு",

      uploadedDocuments: "பதிவேற்றப்பட்ட ஆவணங்கள்",

      received: "பெறப்பட்டது",

      verificationRequired:
        "சரிபார்ப்பு அவசியம்",

      verificationText:
        "இந்த தகவல் பதிவேற்றப்பட்ட ஆவணத்திலிருந்து பிரித்தெடுக்கப்பட்டுள்ளது. இது தனியாக சரிபார்க்கப்படவில்லை. மருத்துவ பயன்பாட்டிற்கு முன் சுகாதார நிபுணர் சரிபார்க்க வேண்டும்.",

      noReadableText:
        "இந்த ஆவணத்திலிருந்து படிக்கக்கூடிய உரை பிரித்தெடுக்கப்படவில்லை.",

      clinicalSafety: "மருத்துவ பாதுகாப்பு",

      clinicalSafetyText:
        "MediKiosk மருத்துவ தகவல்களை சேகரித்து ஒழுங்கமைக்க உதவுகிறது. இது தானாக நோயறிதல் அல்லது சிகிச்சை வழங்காது.",

      continueSummary:
        "மருத்துவ சுருக்கத்திற்குத் தொடரவும்",
    },

    HI: {
      registration: "रोगी पंजीकरण",
      registrationTitle: "रोगी पंजीकरण",
      registrationDescription:
        "क्लिनिकल इतिहास शुरू करने से पहले रोगी की मूल जानकारी दर्ज करें।",

      patientName: "रोगी का नाम",
      patientNamePlaceholder: "पूरा नाम दर्ज करें",

      age: "आयु",
      agePlaceholder: "आयु दर्ज करें",

      sex: "लिंग",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",

      tokenNumber: "टोकन नंबर",
      tokenPlaceholder: "अस्पताल टोकन नंबर",

      admissionNumber: "प्रवेश संख्या",
      admissionPlaceholder:
        "भर्ती रोगियों के लिए आवश्यक",

      department: "विभाग",
      departmentPlaceholder: "विभाग चुनें",

      outpatient: "बाह्य रोगी",
      inpatient: "अंतरंग रोगी",

      languageConsent: "भाषा और सहमति",
      languageTitle: "भाषा और सहमति",
      languageDescription:
        "जारी रखने के लिए पसंदीदा भाषा चुनें और सहमति दें।",

      preferredLanguage: "पसंदीदा भाषा",
      consentTitle: "रोगी की सहमति",

      consentText:
        "मैं समझता/समझती हूं कि MediKiosk मेरी स्वास्थ्य जानकारी और पिछले चिकित्सा रिकॉर्ड को मेरी चिकित्सा परामर्श प्रक्रिया में सहायता के लिए एकत्र करेगा।",

      consentText2:
        "मैं समझता/समझती हूं कि जानकारी की समीक्षा स्वास्थ्य विशेषज्ञ द्वारा की जाएगी और MediKiosk स्वयं निदान या उपचार निर्धारित नहीं करता।",

      continue: "जारी रखें",
      back: "वापस",

      clinicalHistory: "क्लिनिकल इतिहास",

      mainQuestion:
        "आज अस्पताल आने का मुख्य कारण क्या है?",

      complaintDescription:
        "मुख्य स्वास्थ्य समस्या चुनें या अपने शब्दों में बताएं।",

      chestPain: "सीने में दर्द",
      fever: "बुखार",
      headache: "सिरदर्द",
      cough: "खांसी",
      abdominalPain: "पेट दर्द",
      otherComplaint: "अन्य",

      complaintPlaceholder:
        "अपनी मुख्य स्वास्थ्य समस्या बताएं",

      voiceInput: "वॉइस इनपुट",

      nextQuestion: "अगला प्रश्न",
      completeHistory: "इतिहास पूरा करें",
      previous: "पिछला",

      question: "प्रश्न",
      summary: "क्लिनिकल इतिहास की समीक्षा",

      emergency:
        "यदि आपको कोई चिकित्सीय आपात स्थिति हो रही है, तो तुरंत अस्पताल के कर्मचारियों को सूचित करें।",

      otherLocation: "कृपया स्थान बताएं",
      otherLocationPlaceholder:
        "विशिष्ट स्थान दर्ज करें",

      otherComplaintText:
        "अपनी स्वास्थ्य समस्या बताएं",

      medicalDocuments: "चिकित्सा दस्तावेज़",
      previousRecords: "पिछले चिकित्सा रिकॉर्ड",

      documentsDescription:
        "पिछले प्रिस्क्रिप्शन, प्रयोगशाला रिपोर्ट या डिस्चार्ज सारांश अपलोड करें।",

      prescription: "प्रिस्क्रिप्शन",
      laboratory: "प्रयोगशाला रिपोर्ट",
      discharge: "डिस्चार्ज सारांश",
      otherDocument: "अन्य चिकित्सा दस्तावेज़",

      selectDocumentType:
        "दस्तावेज़ का प्रकार चुनें",

      chooseFile: "फ़ाइल चुनें",

      selectedDocuments: "चयनित दस्तावेज़",
      noDocuments:
        "अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया है।",

      remove: "हटाएं",

      processDocuments:
        "चिकित्सा दस्तावेज़ संसाधित करें",

      supported:
        "समर्थित प्रारूप: PDF, JPG, JPEG, PNG",

      documentTypeRequired:
        "कृपया पहले दस्तावेज़ का प्रकार चुनें।",

      uploading:
        "दस्तावेज़ संसाधित किए जा रहे हैं...",

      uploadSuccess:
        "दस्तावेज़ MediKiosk द्वारा सफलतापूर्वक प्राप्त किया गया।",

      uploadFailed:
        "दस्तावेज़ संसाधित नहीं किया जा सका।",

      documentsReceived:
        "दस्तावेज़ प्रसंस्करण",

      documentsReceivedDescription:
        "चयनित चिकित्सा दस्तावेज़ MediKiosk द्वारा प्राप्त किए गए हैं।",

      processingStage: "प्रसंस्करण स्थिति",

      backendReceived:
        "दस्तावेज़ प्राप्त हुआ",

      ocr: "टेक्स्ट निष्कर्षण",

      extraction:
        "चिकित्सीय जानकारी निष्कर्षण",

      timeline:
        "चिकित्सा समयरेखा",

      continueReview:
        "दस्तावेज़ समीक्षा के लिए जारी रखें",

      documentReview:
        "दस्तावेज़ समीक्षा",

      documentReviewTitle:
        "निकाली गई चिकित्सा जानकारी की समीक्षा करें",

      documentReviewDescription:
        "नीचे दी गई जानकारी अपलोड किए गए दस्तावेज़ों से निकाली गई है और स्वास्थ्य विशेषज्ञ द्वारा सत्यापित की जानी चाहिए।",

      extractedInformation:
        "निकाली गई जानकारी",

      patientHistory:
        "रोगी का इतिहास",

      uploadedDocuments:
        "अपलोड किए गए दस्तावेज़",

      received: "प्राप्त",

      verificationRequired:
        "सत्यापन आवश्यक",

      verificationText:
        "यह जानकारी अपलोड किए गए दस्तावेज़ से निकाली गई है। इसे स्वतंत्र रूप से सत्यापित नहीं किया गया है और चिकित्सीय उपयोग से पहले स्वास्थ्य विशेषज्ञ द्वारा इसकी समीक्षा आवश्यक है।",

      noReadableText:
        "इस दस्तावेज़ से पढ़ने योग्य टेक्स्ट नहीं निकाला गया।",

      clinicalSafety:
        "चिकित्सीय सुरक्षा",

      clinicalSafetyText:
        "MediKiosk स्वास्थ्य जानकारी एकत्र करने और व्यवस्थित करने में सहायता करता है। यह स्वयं निदान या उपचार निर्धारित नहीं करता।",

      continueSummary:
        "क्लिनिकल सारांश के लिए जारी रखें",
    },
  };

  const t = labels[language || "EN"];

  // =========================================================
  // ADAPTIVE QUESTION BANK
  // =========================================================

  const questionBank = {
    chest: {
      EN: [
        {
          id: "onset",
          question: "When did the chest pain start?",
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
        {
          id: "associated",
          question:
            "Are you experiencing any other symptoms with the chest pain?",
          type: "choice",
          options: [
            "Shortness of breath",
            "Sweating",
            "Nausea",
            "Dizziness",
            "None",
          ],
        },
      ],

      TA: [
        {
          id: "onset",
          question: "மார்பு வலி எப்போது தொடங்கியது?",
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
        {
          id: "associated",
          question:
            "மார்பு வலியுடன் வேறு அறிகுறிகள் உள்ளதா?",
          type: "choice",
          options: [
            "மூச்சுத்திணறல்",
            "வியர்வை",
            "குமட்டல்",
            "தலைச்சுற்றல்",
            "எதுவும் இல்லை",
          ],
        },
      ],

      HI: [
        {
          id: "onset",
          question: "सीने में दर्द कब शुरू हुआ?",
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
        {
          id: "associated",
          question:
            "क्या सीने के दर्द के साथ अन्य लक्षण हैं?",
          type: "choice",
          options: [
            "सांस लेने में परेशानी",
            "पसीना",
            "मतली",
            "चक्कर",
            "कोई नहीं",
          ],
        },
      ],
    },

    fever: {
      EN: [
        {
          id: "onset",
          question: "When did the fever start?",
          type: "choice",
          options: [
            "Today",
            "1–2 days ago",
            "3–7 days ago",
            "More than a week ago",
          ],
        },
        {
          id: "pattern",
          question: "How does the fever occur?",
          type: "choice",
          options: [
            "Continuous",
            "Comes and goes",
            "Mostly at night",
            "Not sure",
          ],
        },
        {
          id: "temperature",
          question:
            "What was the highest temperature you measured?",
          type: "text",
        },
        {
          id: "chills",
          question:
            "Have you experienced chills or shivering?",
          type: "choice",
          options: [
            "Yes",
            "No",
            "Not sure",
          ],
        },
        {
          id: "associated",
          question:
            "What other symptoms are you experiencing?",
          type: "choice",
          options: [
            "Cough",
            "Body pain",
            "Headache",
            "Vomiting",
            "Diarrhoea",
            "None",
          ],
        },
      ],

      TA: [
        {
          id: "onset",
          question: "காய்ச்சல் எப்போது தொடங்கியது?",
          type: "choice",
          options: [
            "இன்று",
            "1–2 நாட்களுக்கு முன்பு",
            "3–7 நாட்களுக்கு முன்பு",
            "ஒரு வாரத்திற்கு மேல்",
          ],
        },
        {
          id: "pattern",
          question: "காய்ச்சல் எவ்வாறு வருகிறது?",
          type: "choice",
          options: [
            "தொடர்ச்சியாக",
            "விட்டு விட்டு",
            "பெரும்பாலும் இரவில்",
            "தெரியவில்லை",
          ],
        },
        {
          id: "temperature",
          question:
            "நீங்கள் அளந்த அதிகபட்ச உடல் வெப்பநிலை என்ன?",
          type: "text",
        },
        {
          id: "chills",
          question:
            "குளிர் அல்லது நடுக்கம் ஏற்பட்டதா?",
          type: "choice",
          options: [
            "ஆம்",
            "இல்லை",
            "தெரியவில்லை",
          ],
        },
        {
          id: "associated",
          question:
            "வேறு என்ன அறிகுறிகள் உள்ளன?",
          type: "choice",
          options: [
            "இருமல்",
            "உடல் வலி",
            "தலைவலி",
            "வாந்தி",
            "வயிற்றுப்போக்கு",
            "எதுவும் இல்லை",
          ],
        },
      ],

      HI: [
        {
          id: "onset",
          question: "बुखार कब शुरू हुआ?",
          type: "choice",
          options: [
            "आज",
            "1–2 दिन पहले",
            "3–7 दिन पहले",
            "एक सप्ताह से अधिक पहले",
          ],
        },
        {
          id: "pattern",
          question: "बुखार कैसे आता है?",
          type: "choice",
          options: [
            "लगातार",
            "आता-जाता है",
            "ज्यादातर रात में",
            "पता नहीं",
          ],
        },
        {
          id: "temperature",
          question:
            "आपने अधिकतम कितना तापमान मापा?",
          type: "text",
        },
        {
          id: "chills",
          question:
            "क्या ठंड या कंपकंपी हुई?",
          type: "choice",
          options: [
            "हाँ",
            "नहीं",
            "पता नहीं",
          ],
        },
        {
          id: "associated",
          question:
            "आपको और कौन से लक्षण हैं?",
          type: "choice",
          options: [
            "खांसी",
            "शरीर में दर्द",
            "सिरदर्द",
            "उल्टी",
            "दस्त",
            "कोई नहीं",
          ],
        },
      ],
    },

    headache: {
      EN: [
        {
          id: "onset",
          question: "When did the headache start?",
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
          question: "Where is the headache located?",
          type: "choice",
          options: [
            "Front of head",
            "Back of head",
            "One side",
            "Both sides",
            "Other location",
          ],
        },
        {
          id: "character",
          question: "How would you describe the headache?",
          type: "choice",
          options: [
            "Throbbing",
            "Pressure",
            "Sharp",
            "Dull",
          ],
        },
        {
          id: "severity",
          question: "How severe is the headache?",
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
        {
          id: "associated",
          question:
            "Are there any other symptoms?",
          type: "choice",
          options: [
            "Vomiting",
            "Blurred vision",
            "Dizziness",
            "Sensitivity to light",
            "None",
          ],
        },
      ],

      TA: [
        {
          id: "onset",
          question: "தலைவலி எப்போது தொடங்கியது?",
          type: "choice",
          options: [
            "இன்று",
            "நேற்று",
            "சில நாட்களுக்கு முன்பு",
            "ஒரு வாரத்திற்கு மேல்",
          ],
        },
        {
          id: "location",
          question: "தலைவலி எங்கு உள்ளது?",
          type: "choice",
          options: [
            "தலையின் முன்பகுதி",
            "தலையின் பின்பகுதி",
            "ஒரு பக்கம்",
            "இரண்டு பக்கமும்",
            "வேறு இடம்",
          ],
        },
        {
          id: "character",
          question:
            "தலைவலியை எவ்வாறு விவரிப்பீர்கள்?",
          type: "choice",
          options: [
            "துடிப்பு",
            "அழுத்தம்",
            "கூர்மையான வலி",
            "மந்தமான வலி",
          ],
        },
        {
          id: "severity",
          question:
            "தலைவலியின் தீவிரம் எவ்வளவு?",
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
        {
          id: "associated",
          question:
            "வேறு அறிகுறிகள் உள்ளதா?",
          type: "choice",
          options: [
            "வாந்தி",
            "மங்கலான பார்வை",
            "தலைச்சுற்றல்",
            "வெளிச்சத்தை தாங்க முடியாமை",
            "எதுவும் இல்லை",
          ],
        },
      ],

      HI: [
        {
          id: "onset",
          question: "सिरदर्द कब शुरू हुआ?",
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
          question: "सिरदर्द कहाँ है?",
          type: "choice",
          options: [
            "सिर के सामने",
            "सिर के पीछे",
            "एक तरफ",
            "दोनों तरफ",
            "अन्य स्थान",
          ],
        },
        {
          id: "character",
          question:
            "आप सिरदर्द का वर्णन कैसे करेंगे?",
          type: "choice",
          options: [
            "धड़कता हुआ",
            "दबाव",
            "तेज़ दर्द",
            "हल्का दर्द",
          ],
        },
        {
          id: "severity",
          question:
            "सिरदर्द कितना गंभीर है?",
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
        {
          id: "associated",
          question:
            "क्या कोई अन्य लक्षण हैं?",
          type: "choice",
          options: [
            "उल्टी",
            "धुंधला दिखाई देना",
            "चक्कर",
            "रोशनी से परेशानी",
            "कोई नहीं",
          ],
        },
      ],
    },

    cough: {
      EN: [
        {
          id: "onset",
          question: "When did the cough start?",
          type: "choice",
          options: [
            "Today",
            "A few days ago",
            "1–3 weeks ago",
            "More than 3 weeks ago",
          ],
        },
        {
          id: "type",
          question: "What type of cough do you have?",
          type: "choice",
          options: [
            "Dry cough",
            "Cough with phlegm",
            "Mostly at night",
            "Not sure",
          ],
        },
        {
          id: "phlegm",
          question:
            "If you have phlegm, what is its appearance?",
          type: "choice",
          options: [
            "Clear",
            "White",
            "Yellow",
            "Green",
            "Blood-stained",
            "No phlegm",
          ],
        },
        {
          id: "breathing",
          question:
            "Are you experiencing breathing difficulty?",
          type: "choice",
          options: [
            "Yes",
            "No",
          ],
        },
        {
          id: "associated",
          question:
            "Are there any other symptoms?",
          type: "choice",
          options: [
            "Fever",
            "Chest discomfort",
            "Runny nose",
            "Sore throat",
            "None",
          ],
        },
      ],

      TA: [
        {
          id: "onset",
          question: "இருமல் எப்போது தொடங்கியது?",
          type: "choice",
          options: [
            "இன்று",
            "சில நாட்களுக்கு முன்பு",
            "1–3 வாரங்களுக்கு முன்பு",
            "3 வாரங்களுக்கு மேல்",
          ],
        },
        {
          id: "type",
          question: "எந்த வகையான இருமல் உள்ளது?",
          type: "choice",
          options: [
            "உலர் இருமல்",
            "சளியுடன் இருமல்",
            "பெரும்பாலும் இரவில்",
            "தெரியவில்லை",
          ],
        },
        {
          id: "phlegm",
          question:
            "சளி இருந்தால் அதன் நிறம் எப்படி உள்ளது?",
          type: "choice",
          options: [
            "தெளிவு",
            "வெள்ளை",
            "மஞ்சள்",
            "பச்சை",
            "இரத்தம் கலந்தது",
            "சளி இல்லை",
          ],
        },
        {
          id: "breathing",
          question:
            "மூச்சு விடுவதில் சிரமம் உள்ளதா?",
          type: "choice",
          options: [
            "ஆம்",
            "இல்லை",
          ],
        },
        {
          id: "associated",
          question:
            "வேறு அறிகுறிகள் உள்ளதா?",
          type: "choice",
          options: [
            "காய்ச்சல்",
            "மார்பு அசௌகரியம்",
            "மூக்கு ஒழுகுதல்",
            "தொண்டை வலி",
            "எதுவும் இல்லை",
          ],
        },
      ],

      HI: [
        {
          id: "onset",
          question: "खांसी कब शुरू हुई?",
          type: "choice",
          options: [
            "आज",
            "कुछ दिन पहले",
            "1–3 सप्ताह पहले",
            "3 सप्ताह से अधिक पहले",
          ],
        },
        {
          id: "type",
          question: "आपको किस प्रकार की खांसी है?",
          type: "choice",
          options: [
            "सूखी खांसी",
            "बलगम वाली खांसी",
            "ज्यादातर रात में",
            "पता नहीं",
          ],
        },
        {
          id: "phlegm",
          question:
            "यदि बलगम है, तो उसका रंग कैसा है?",
          type: "choice",
          options: [
            "साफ",
            "सफेद",
            "पीला",
            "हरा",
            "खून मिला हुआ",
            "बलगम नहीं",
          ],
        },
        {
          id: "breathing",
          question:
            "क्या सांस लेने में परेशानी है?",
          type: "choice",
          options: [
            "हाँ",
            "नहीं",
          ],
        },
        {
          id: "associated",
          question:
            "क्या कोई अन्य लक्षण हैं?",
          type: "choice",
          options: [
            "बुखार",
            "सीने में परेशानी",
            "नाक बहना",
            "गले में दर्द",
            "कोई नहीं",
          ],
        },
      ],
    },

    abdominal: {
      EN: [
        {
          id: "onset",
          question: "When did the abdominal pain start?",
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
          question:
            "Where exactly is the abdominal pain?",
          type: "choice",
          options: [
            "Upper abdomen",
            "Lower abdomen",
            "Right side",
            "Left side",
            "Other location",
          ],
        },
        {
          id: "character",
          question:
            "How would you describe the pain?",
          type: "choice",
          options: [
            "Cramping",
            "Burning",
            "Sharp",
            "Dull",
            "Pressure",
          ],
        },
        {
          id: "severity",
          question:
            "How severe is the abdominal pain?",
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
        {
          id: "associated",
          question:
            "Are you experiencing any other symptoms?",
          type: "choice",
          options: [
            "Vomiting",
            "Diarrhoea",
            "Constipation",
            "Loss of appetite",
            "None",
          ],
        },
      ],

      TA: [
        {
          id: "onset",
          question:
            "வயிற்று வலி எப்போது தொடங்கியது?",
          type: "choice",
          options: [
            "இன்று",
            "நேற்று",
            "சில நாட்களுக்கு முன்பு",
            "ஒரு வாரத்திற்கு மேல்",
          ],
        },
        {
          id: "location",
          question:
            "வயிற்றில் சரியாக எங்கு வலி உள்ளது?",
          type: "choice",
          options: [
            "மேல் வயிறு",
            "கீழ் வயிறு",
            "வலது பக்கம்",
            "இடது பக்கம்",
            "வேறு இடம்",
          ],
        },
        {
          id: "character",
          question:
            "வலியை எவ்வாறு விவரிப்பீர்கள்?",
          type: "choice",
          options: [
            "பிடிப்பு",
            "எரிச்சல்",
            "கூர்மையான வலி",
            "மந்தமான வலி",
            "அழுத்தம்",
          ],
        },
        {
          id: "severity",
          question:
            "வயிற்று வலியின் தீவிரம் எவ்வளவு?",
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
        {
          id: "associated",
          question:
            "வேறு அறிகுறிகள் உள்ளதா?",
          type: "choice",
          options: [
            "வாந்தி",
            "வயிற்றுப்போக்கு",
            "மலச்சிக்கல்",
            "பசியின்மை",
            "எதுவும் இல்லை",
          ],
        },
      ],

      HI: [
        {
          id: "onset",
          question:
            "पेट दर्द कब शुरू हुआ?",
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
          question:
            "पेट में दर्द ठीक कहाँ है?",
          type: "choice",
          options: [
            "ऊपरी पेट",
            "निचला पेट",
            "दाईं ओर",
            "बाईं ओर",
            "अन्य स्थान",
          ],
        },
        {
          id: "character",
          question:
            "आप दर्द का वर्णन कैसे करेंगे?",
          type: "choice",
          options: [
            "ऐंठन",
            "जलन",
            "तेज़ दर्द",
            "हल्का दर्द",
            "दबाव",
          ],
        },
        {
          id: "severity",
          question:
            "पेट दर्द कितना गंभीर है?",
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
        {
          id: "associated",
          question:
            "क्या कोई अन्य लक्षण हैं?",
          type: "choice",
          options: [
            "उल्टी",
            "दस्त",
            "कब्ज",
            "भूख में कमी",
            "कोई नहीं",
          ],
        },
      ],
    },

    other: {
      EN: [
        {
          id: "onset",
          question:
            "When did this health problem start?",
          type: "choice",
          options: [
            "Today",
            "Yesterday",
            "A few days ago",
            "More than a week ago",
          ],
        },
        {
          id: "severity",
          question:
            "How severe is the problem?",
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
        {
          id: "associated",
          question:
            "Are you experiencing any other symptoms?",
          type: "text",
        },
      ],

      TA: [
        {
          id: "onset",
          question:
            "இந்த உடல்நலப் பிரச்சனை எப்போது தொடங்கியது?",
          type: "choice",
          options: [
            "இன்று",
            "நேற்று",
            "சில நாட்களுக்கு முன்பு",
            "ஒரு வாரத்திற்கு மேல்",
          ],
        },
        {
          id: "severity",
          question:
            "இந்த பிரச்சனை எவ்வளவு தீவிரமாக உள்ளது?",
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
        {
          id: "associated",
          question:
            "வேறு அறிகுறிகள் உள்ளதா?",
          type: "text",
        },
      ],

      HI: [
        {
          id: "onset",
          question:
            "यह स्वास्थ्य समस्या कब शुरू हुई?",
          type: "choice",
          options: [
            "आज",
            "कल",
            "कुछ दिन पहले",
            "एक सप्ताह से अधिक पहले",
          ],
        },
        {
          id: "severity",
          question:
            "यह समस्या कितनी गंभीर है?",
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
        {
          id: "associated",
          question:
            "क्या कोई अन्य लक्षण हैं?",
          type: "text",
        },
      ],
    },
  };

  // =========================================================
  // GET CURRENT QUESTIONS
  // =========================================================

  const getQuestionSet = () => {
    const bank = questionBank[complaintType] || questionBank.other;

    return bank[language || "EN"];
  };

  const currentQuestions = getQuestionSet();
  const currentQuestion =
    currentQuestions[questionIndex];

  // =========================================================
  // PATIENT REGISTRATION HANDLER
  // =========================================================

  const updatePatient = (field, value) => {
    setPatient((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const registrationValid =
    patient.name.trim() &&
    patient.age &&
    patient.sex &&
    patient.tokenNumber.trim() &&
    patient.department;

  // =========================================================
  // COMPLAINT SELECTION
  // =========================================================

  const complaintOptions = [
    {
      id: "chest",
      label: t.chestPain,
    },
    {
      id: "fever",
      label: t.fever,
    },
    {
      id: "headache",
      label: t.headache,
    },
    {
      id: "cough",
      label: t.cough,
    },
    {
      id: "abdominal",
      label: t.abdominalPain,
    },
    {
      id: "other",
      label: t.otherComplaint,
    },
  ];

  const chooseComplaint = (type) => {
    setComplaintType(type);

    setAnswers({});
    setQuestionIndex(0);

    if (type !== "other") {
      const selected =
        complaintOptions.find(
          (item) => item.id === type
        );

      setComplaint(selected?.label || "");
    } else {
      setComplaint("");
    }
  };

  // =========================================================
  // ANSWER HANDLING
  // =========================================================

  const selectAnswer = (answer) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answer,
    }));
  };

  const isCurrentAnswerValid = () => {
    if (!currentQuestion) {
      return false;
    }

    const answer =
      answers[currentQuestion.id];

    if (!answer || !String(answer).trim()) {
      return false;
    }

    if (
      currentQuestion.id === "location"
    ) {
      const otherValues = [
        "Other location",
        "வேறு இடம்",
        "अन्य स्थान",
      ];

      if (
        otherValues.includes(answer)
      ) {
        return Boolean(
          answers.locationOther?.trim()
        );
      }
    }

    return true;
  };

  const goNextQuestion = () => {
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

  const goPreviousQuestion = () => {
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
//=========================================================
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
      const formData = new FormData();

      formData.append(
        "document",
        document.file
      );

      formData.append(
        "documentType",
        document.type
      );

      const response = await fetch(
        "http://localhost:5000/api/documents/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(
        "MediKiosk backend response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Document upload failed"
        );
      }

      results.push({
        id: document.id,
        name: document.name,
        success: true,
        data: data,
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
        data: null,
        error:
          error.message ||
          t.uploadFailed,
      });
    }
  }

  setUploadResults(results);

  const hasFailure = results.some(
    (result) => !result.success
  );

  if (hasFailure) {
    setUploadError(
      t.uploadError
    );
  }

  setProcessing(false);

  // Go to processing result screen
  setStep(7);
};

  // =========================================================
  // LOCATION CHECK
  // =========================================================

  const isOtherLocation =
    currentQuestion?.id ===
      "location" &&
    [
      "Other location",
      "வேறு இடம்",
      "अन्य स्थान",
    ].includes(
      answers.location
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
            STEP 1 — PATIENT REGISTRATION
        =================================================== */}

        {step === 1 && (
          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.registration}
                </div>

                <h1>
                  {t.registrationTitle}
                </h1>

                <p>
                  {t.registrationDescription}
                </p>

              </div>

              <div className="medical-symbol">
                +
              </div>

            </div>

            <div className="divider"></div>

            <div
              className="registration-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              {/* NAME */}

              <div className="additional-input">

                <label>
                  {t.patientName}
                </label>

                <input
                  type="text"
                  value={patient.name}
                  onChange={(event) =>
                    updatePatient(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder={
                    t.patientNamePlaceholder
                  }
                />

              </div>

              {/* AGE */}

              <div className="additional-input">

                <label>
                  {t.age}
                </label>

                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patient.age}
                  onChange={(event) =>
                    updatePatient(
                      "age",
                      event.target.value
                    )
                  }
                  placeholder={
                    t.agePlaceholder
                  }
                />

              </div>

              {/* SEX */}

              <div className="additional-input">

                <label>
                  {t.sex}
                </label>

                <select
                  value={patient.sex}
                  onChange={(event) =>
                    updatePatient(
                      "sex",
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    {t.sex}
                  </option>

                  <option value="Male">
                    {t.male}
                  </option>

                  <option value="Female">
                    {t.female}
                  </option>

                  <option value="Other">
                    {t.other}
                  </option>

                </select>

              </div>

              {/* TOKEN */}

              <div className="additional-input">

                <label>
                  {t.tokenNumber}
                </label>

                <input
                  type="text"
                  value={
                    patient.tokenNumber
                  }
                  onChange={(event) =>
                    updatePatient(
                      "tokenNumber",
                      event.target.value
                    )
                  }
                  placeholder={
                    t.tokenPlaceholder
                  }
                />

              </div>

              {/* DEPARTMENT */}

              <div className="additional-input">

                <label>
                  {t.department}
                </label>

                <select
                  value={patient.department}
                  onChange={(event) =>
                    updatePatient(
                      "department",
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    {t.departmentPlaceholder}
                  </option>

                  <option value="General Medicine">
                    General Medicine
                  </option>

                  <option value="Emergency">
                    Emergency
                  </option>

                  <option value="Pediatrics">
                    Pediatrics
                  </option>

                  <option value="Ayurveda">
                    Ayurveda
                  </option>

                  <option value="Siddha">
                    Siddha
                  </option>

                  <option value="ENT">
                    ENT
                  </option>

                  <option value="Orthopedics">
                    Orthopedics
                  </option>

                  <option value="Cardiology">
                    Cardiology
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* ADMISSION NUMBER */}

              <div className="additional-input">

                <label>
                  {t.admissionNumber}
                </label>

                <input
                  type="text"
                  value={
                    patient.admissionNumber
                  }
                  onChange={(event) =>
                    updatePatient(
                      "admissionNumber",
                      event.target.value
                    )
                  }
                  placeholder={
                    t.admissionPlaceholder
                  }
                />

              </div>

            </div>

            <div
              className="notice"
              style={{
                marginTop: "24px",
              }}
            >

              <div className="notice-title">
                PATIENT IDENTIFICATION
              </div>

              <p>
                Token number identifies the patient's
                visit or queue position. Admission number
                identifies a hospital admission and may
                remain blank for outpatient visits.
              </p>

            </div>

            <button
              className="primary-button"
              disabled={!registrationValid}
              onClick={() =>
                setStep(2)
              }
            >
              {t.continue}
            </button>

          </section>
        )}

        {/* ===================================================
            STEP 2 — LANGUAGE + CONSENT
        =================================================== */}

        {step === 2 && (
          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.languageConsent}
                </div>

                <h1>
                  {t.languageTitle}
                </h1>

                <p>
                  {t.languageDescription}
                </p>

              </div>

            </div>

            <div className="divider"></div>

            <h2 className="subheading">
              {t.preferredLanguage}
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
              {t.consentTitle}
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

                {t.consentText}

                <span>
                  {t.consentText2}
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
                {t.back}
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
                {t.continue}
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
                  {t.clinicalHistory}
                </div>

                <h1>
                  {t.mainQuestion}
                </h1>

                <p>
                  {t.complaintDescription}
                </p>

              </div>

              <div className="medical-symbol">
                +
              </div>

            </div>

            <div className="divider"></div>

            <div className="answer-grid">

              {complaintOptions.map(
                (option) => (
                  <button
                    key={option.id}
                    className={
                      complaintType ===
                      option.id
                        ? "answer-card selected"
                        : "answer-card"
                    }
                    onClick={() =>
                      chooseComplaint(
                        option.id
                      )
                    }
                  >
                    {option.label}
                  </button>
                )
              )}

            </div>

            {complaintType ===
              "other" && (

              <div
                className="additional-input"
                style={{
                  marginTop: "20px",
                }}
              >

                <label>
                  {t.otherComplaintText}
                </label>

                <textarea
                  className="clinical-input"
                  value={complaint}
                  onChange={(event) =>
                    setComplaint(
                      event.target.value
                    )
                  }
                  placeholder={
                    t.complaintPlaceholder
                  }
                />

              </div>
            )}

            {complaintType &&
              complaintType !== "other" && (

              <div
                className="notice"
                style={{
                  marginTop: "24px",
                }}
              >

                <div className="notice-title">
                  ADAPTIVE HISTORY
                </div>

                <p>
                  MediKiosk will now ask
                  questions relevant to the
                  selected health concern.
                </p>

              </div>
            )}

            <div className="input-options">

              <button
                className="voice-button"
                onClick={() =>
                  alert(
                    "Voice recognition will be integrated with the multilingual voice service."
                  )
                }
              >
                {t.voiceInput}
              </button>

              <button
                className="touch-button"
                disabled={
                  !complaintType ||
                  !complaint.trim()
                }
                onClick={() => {
                  setAnswers({});
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
            STEP 4 — ADAPTIVE QUESTIONS
        =================================================== */}

        {step === 4 &&
          currentQuestion && (

          <section className="clinical-card">

            <div className="history-top">

              <div>

                <div className="section-label">
                  {t.clinicalHistory}
                </div>

                <h1>
                  {complaint}
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

            {/* CHOICE QUESTION */}

            {currentQuestion.type ===
              "choice" && (

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
            )}

            {/* TEXT QUESTION */}

            {currentQuestion.type ===
              "text" && (

              <textarea
                className="clinical-input"
                value={
                  answers[
                    currentQuestion.id
                  ] || ""
                }
                onChange={(event) =>
                  selectAnswer(
                    event.target.value
                  )
                }
                placeholder={
                  language === "TA"
                    ? "உங்கள் பதிலை உள்ளிடவும்"
                    : language === "HI"
                    ? "अपना उत्तर दर्ज करें"
                    : "Enter your answer"
                }
              />

            )}

            {/* SCALE */}

            {currentQuestion.type ===
              "scale" && (

              <div className="scale-container">

                <div className="scale-labels">

                  <span>
                    0 — No symptoms
                  </span>

                  <span>
                    10 — Most severe
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
                    t.otherLocationPlaceholder
                  }
                />

              </div>

            )}

            <div className="button-row">

              <button
                className="secondary-button"
                disabled={
                  questionIndex === 0
                }
                onClick={
                  goPreviousQuestion
                }
              >
                {t.previous}
              </button>

              <button
                className="primary-button"
                disabled={
                  !isCurrentAnswerValid()
                }
                onClick={
                  goNextQuestion
                }
              >
                {questionIndex ===
                currentQuestions.length - 1
                  ? t.completeHistory
                  : t.nextQuestion}
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
            STEP 5 — HISTORY SUMMARY
        =================================================== */}

        {step === 5 && (

          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.clinicalHistory}
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

            {/* PATIENT DETAILS */}

            <div className="summary-section">

              <div className="summary-title">
                PATIENT DETAILS
              </div>

              <div className="summary-value">
                {patient.name}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Age
              </div>

              <div className="summary-answer">
                {patient.age}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Sex
              </div>

              <div className="summary-answer">
                {patient.sex}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Token Number
              </div>

              <div className="summary-answer">
                {patient.tokenNumber}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Admission Number
              </div>

              <div className="summary-answer">
                {patient.admissionNumber ||
                  "Not provided"}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Department
              </div>

              <div className="summary-answer">
                {patient.department}
              </div>

            </div>

            <div className="divider"></div>

            {/* CHIEF COMPLAINT */}

            <div className="summary-section">

              <div className="summary-title">
                CHIEF COMPLAINT
              </div>

              <div className="summary-value">
                {complaint}
              </div>

            </div>

            {/* QUESTIONS */}

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
                    [
                      "Other location",
                      "வேறு இடம்",
                      "अन्य स्थान",
                    ].includes(
                      answers.location
                    )
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
                {t.clinicalSafetyText}
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
                  STEP 04 • {t.medicalDocuments}
                </div>

                <h1>
                  {t.previousRecords}
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

            <div className="document-section">

              <div className="question-type">
                DOCUMENT TYPE
              </div>

              <h2>
                {t.selectDocumentType}
              </h2>

              <div className="document-type-grid">

                {/* PRESCRIPTION */}

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
                    Medication record
                  </span>

                </button>

                {/* LAB */}

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
                    {t.laboratory}
                  </strong>

                  <span>
                    Blood tests / investigations
                  </span>

                </button>

                {/* DISCHARGE */}

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

                {/* OTHER */}

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

            {/* FILE UPLOAD */}

            <div className="upload-area">

              <div className="upload-title">
                {t.chooseFile}
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
                disabled={processing}
                onClick={() =>
                  setStep(5)
                }
              >
                {t.back}
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
                  : t.processDocuments}
              </button>

            </div>

          </section>
        )}

        {/* ===================================================
            STEP 7 — PROCESSING RESULT
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

            {uploadError && (

              <div className="notice">

                <div className="notice-title">
                  PROCESSING STATUS
                </div>

                <p>
                  {uploadError}
                </p>

              </div>

            )}

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
                    MediKiosk backend received
                    the document successfully.
                  </p>

                </div>

              </div>

              <div className="processing-step active">

                <span>
                  02
                </span>

                <div>

                  <strong>
                    {t.ocr}
                  </strong>

                  <p>
                    Text extraction has been
                    requested from the document.
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
                    Extracted information will be
                    presented for verification.
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
                    Medical records can later be
                    organized chronologically.
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

                            Backend:
                            {" "}
                            {result.data.processing?.status ||
                              result.data.extraction?.status ||
                              "completed"}

                            {" • "}

                            Stage:
                            {" "}
                            {result.data.processing?.stage ||
                              "OCR"}

                          </div>

                        )}

                        {!result.success && (

                          <div className="document-size">
                            {result.error}
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
                {t.clinicalSafety}
              </div>

              <p>
                {t.verificationText}
              </p>

            </div>

            <button
              className="primary-button"
              disabled={
                uploadResults.length === 0
              }
              onClick={() =>
                setStep(8)
              }
            >
              {t.continueReview}
            </button>

          </section>
        )}

        {/* ===================================================
            STEP 8 — DOCUMENT REVIEW + ACTUAL EXTRACTED TEXT
        =================================================== */}

        {step === 8 && (

          <section className="clinical-card">

            <div className="section-header">

              <div>

                <div className="section-label">
                  {t.documentReview}
                </div>

                <h1>
                  {t.documentReviewTitle}
                </h1>

                <p>
                  {t.documentReviewDescription}
                </p>

              </div>

              <div className="medical-symbol">
                ✓
              </div>

            </div>

            <div className="divider"></div>

            {/* PATIENT HISTORY */}

            <div className="summary-section">

              <div className="summary-title">
                {t.patientHistory}
              </div>

              <div className="summary-value">
                {patient.name}
                {" • "}
                {patient.age}
                {" • "}
                {patient.tokenNumber}
              </div>

            </div>

            <div className="summary-row">

              <div className="summary-question">
                Chief Complaint
              </div>

              <div className="summary-answer">
                {complaint}
              </div>

            </div>

            <div className="divider"></div>

            {/* UPLOADED DOCUMENTS */}

            <div className="summary-section">

              <div className="summary-title">
                {t.uploadedDocuments}
              </div>

              <div className="summary-value">
                {documents.length}
                {" "}
                document
                {documents.length !== 1
                  ? "s"
                  : ""}
              </div>

            </div>

            {/* DOCUMENT RESULTS */}

            {documents.map(
              (document) => {

                const result =
                  uploadResults.find(
                    (item) =>
                      item.id ===
                      document.id
                  );

                const extractedText =
                  result?.data?.extraction?.text ||
                  "";

                const processingMethod =
                  result?.data?.document?.processingMethod ||
                  "";

                return (

                  <div
                    key={
                      `review-${document.id}`
                    }
                    style={{
                      marginTop: "24px",
                      border:
                        "1px solid #dce3ea",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >

                    {/* DOCUMENT HEADER */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        gap: "16px",
                        marginBottom:
                          "16px",
                      }}
                    >

                      <div>

                        <div
                          className="summary-title"
                        >
                          {document.name}
                        </div>

                        <div
                          className="document-meta"
                        >
                          {document.type}
                        </div>

                      </div>

                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        {result?.success
                          ? t.received
                          : t.uploadFailed}
                      </div>

                    </div>

                    {/* EXTRACTION METHOD */}

                    {processingMethod && (

                      <div
                        className="document-size"
                        style={{
                          marginBottom:
                            "12px",
                        }}
                      >
                        Processing method:
                        {" "}
                        {processingMethod}
                      </div>

                    )}

                    {/* ACTUAL EXTRACTED TEXT */}

                    {result?.success ? (

                      <>

                        <div
                          className="question-type"
                          style={{
                            marginBottom:
                              "8px",
                          }}
                        >
                          {t.extractedInformation}
                        </div>

                        <div
                          style={{
                            whiteSpace:
                              "pre-wrap",
                            background:
                              "#f7f9fb",
                            border:
                              "1px solid #dbe3ea",
                            borderRadius:
                              "10px",
                            padding:
                              "16px",
                            maxHeight:
                              "420px",
                            overflowY:
                              "auto",
                            lineHeight:
                              "1.6",
                            fontSize:
                              "14px",
                            color:
                              "#243447",
                            fontFamily:
                              "inherit",
                          }}
                        >

                          {extractedText ||
                            t.noReadableText}

                        </div>

                        {/* VERIFICATION */}

                        <div
                          className="notice"
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >

                          <div className="notice-title">
                            {t.verificationRequired}
                          </div>

                          <p>
                            {result.data
                              ?.extraction
                              ?.note ||
                              t.verificationText}
                          </p>

                        </div>

                      </>

                    ) : (

                      <div className="notice">

                        <div className="notice-title">
                          {t.uploadFailed}
                        </div>

                        <p>
                          {result?.error ||
                            t.uploadFailed}
                        </p>

                      </div>

                    )}

                  </div>

                );
              }
            )}

            <div className="button-row">

              <button
                className="secondary-button"
                onClick={() =>
                  setStep(7)
                }
              >
                {t.back}
              </button>

              <button
                className="primary-button"
                onClick={() =>
                  alert(
                    "Clinical Summary module will be connected in the next development stage."
                  )
                }
              >
                {t.continueSummary}
              </button>

            </div>

            <div className="safety-note">

              <strong>
                {t.clinicalSafety}:
              </strong>{" "}

              {t.verificationText}

            </div>

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