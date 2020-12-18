import warrior from "./warrior.gif";
import mage from "./mage.gif";

export default function getSkinUrl(skin) {
  switch (skin) {
    case "Warrior":
      return warrior;
    case "Mage":
      return mage;

      break;

    default:
      break;
  }
}
