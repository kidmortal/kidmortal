import warrior from "./warrior.gif";
import mage from "./mage.gif";
import thief from "./thief.gif";
import archer from "./archer.gif";

export default function getSkinUrl(skin) {
  switch (skin) {
    case "Warrior":
      return warrior;
    case "Mage":
      return mage;
    case "Thief":
      return thief;
    case "Archer":
      return archer;

      break;

    default:
      break;
  }
}
