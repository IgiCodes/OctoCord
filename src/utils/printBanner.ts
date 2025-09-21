import figlet from "figlet";
import chalk from "chalk";

export function printBanner() {
  const banner = figlet.textSync("OctoCord", {
    font: "ANSI Shadow", // there are tons of fonts, try 'Slant', 'Big', 'Ogre'
    horizontalLayout: "full",
    verticalLayout: "full",
    width: 80,
  });
  console.log(chalk.magenta(banner));
  console.log(chalk.magentaBright("OctoCord: Connect GitHub and Discord.\n"));
}