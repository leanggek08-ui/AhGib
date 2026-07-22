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
import ruppImg from "./university/rupp.png"
import itcImg from "./university/ITC.png"
import auppImg from "./university/aupp.png"
import numImg from "./university/num.png"
import npicImg from "./university/npic.png"
import cdriImg from "./university/cdri.png"
import nieImg from "./university/nie.png"

const universityImages = {
  "CADT": cadtImg,
  "CamEd Business School": camEdImg,
  "CamTech": camTechImg,
  "NTTI": nttiImg,
  "PARAGON": paragonImg,
  "Paññāsāstra University of Cambodia": pucImg,  
  "Royal Academy of Cambodia": racImg,
  "RULE": ruleImg,
  "UBB": ubImg,
  "University of Puthisastra": upImg,
  "RUPP": ruppImg,
  "ITC": itcImg,
  "AUPP": auppImg,
  "NUM": numImg,
  "Paragon International University:": paragonImg,
  "NPIC": npicImg,
  "Cambodian Agricultural Research and Development Institute Institut Cambodgien de la Recherche Agricole et Développement": cdriImg,
  "National Institute of Education (Cambodia) Institut National de l'Éducation": nieImg,
  "Cambodia Academy of Digital Technology": cadtImg,
  "Institute of Technology of Cambodia": itcImg,
  "Royal University of Phnom Penh": ruppImg,
};

export function getUniversityImage(universityName) {
  return universityImages[universityName] || null;
}
