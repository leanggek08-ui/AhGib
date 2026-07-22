import roboticImg from "./major/roboticEngineering.jpg"
import accountImg from "./major/accounting.jpg"
import aiImg from "./major/ai.jpg"
import computerScienceImg from "./major/computerScience.jpg"
import cyberSecurityImg from "./major/cyberSecurity.jpg"
import dataScienceImg from "./major/dataScience.jpg"
import softwareEngineerImg from "./major/softwareEngineer.jpg"
import businessAdministrationImg from "./major/ba.jpg"
import financeAndBankingImg from "./major/financeAndBanking.jpg"
import biotechnologyImg from "./major/biotechnology.jpg"
import civilEngineerImg from "./major/civilEngineer.jpg"
import marketingImg from "./major/marketing.jpg"
import mechanicalEngineerImg from "./major/mechanicalEngineer.jpg"
import mathImg from "./major/math.jpg"



const majorImages = {
    "Robotics Engineering": roboticImg,
    "Computer Science": computerScienceImg,
    "Software Engineering": softwareEngineerImg,
    "Data Science": dataScienceImg,
    "Artificial Intelligence": aiImg,
    "Cybersecurity": cyberSecurityImg,
    "Business Administration": businessAdministrationImg,
    "Accounting": accountImg,
    "Finance and Banking": financeAndBankingImg,
    "Marketing": marketingImg,
    "Mechanical Engineering": mechanicalEngineerImg,
    "Civil Engineering": civilEngineerImg,
    "Mathematics": mathImg,
}



export function getMajorImage(majorName) {
  return majorImages[majorName] || null;
}