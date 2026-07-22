import cadtImg from "./university/cadt.png"
import camEdImg from "./university/camEd.png"
import camTechImg from "./university/camTech.png"
import nttiImg from "./university/ntti.png"
import paragonImg from "./university/paragon.png"
import pucImg from "./university/puc.png"
import racImg from "./university/royal_academy_of_cambodia.png"
import ruleImg from "./university/rule.png"
import ubImg from "./university/universityOfBattambang.png"
import upImg from "./university/universityOfPuthisastra.png"

const universityImages = {
  "CADT": cadtImg,
  "CamEd Business School": camEdImg,
  "CAMTECH": camTechImg,
  "NTTI": nttiImg,
  "PARAGON": paragonImg,
  "Paññāsāstra University of Cambodia": pucImg,  
  "Royal Academy of Cambodia": racImg,
  "RULE": ruleImg,
  "UBB": ubImg,
  "University of Puthisastra": upImg,
};

export function getUniversityImage(universityName) {
  return universityImages[universityName] || null;
}
