export function calculateFlames(name1: string, name2: string): string {
  name1 = name1.toLowerCase().replace(/\s/g, "");
  name2 = name2.toLowerCase().replace(/\s/g, "");

  let name1Array = name1.split("");
  let name2Array = name2.split("");

  for (let i = 0; i < name1Array.length; i++) {
    const index = name2Array.indexOf(name1Array[i]);
    if (index !== -1) {
      name1Array.splice(i, 1);
      name2Array.splice(index, 1);
      i--;
    }
  }

  const count = name1Array.length + name2Array.length;

  let flames = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (flames.length > 1) {
    index = (index + count - 1) % flames.length;
    flames.splice(index, 1);
  }

  const resultMap: Record<string, string> = {
    F: "Friends",
    L: "Love",
    A: "Affection",
    M: "Marriage",
    E: "Enemies",
    S: "Siblings",
  };

  return resultMap[flames[0]];
}

export default calculateFlames;

