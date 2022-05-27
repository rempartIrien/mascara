import CSS from "./css-types";

// See https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function hash(s: string): number {
  const strlen = s.length;
  let hash = 0;

  for (let i = 0; i < strlen; ++i) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export default function generateCssClassName(style: CSS.Properties): string {
  return "mascara-" + hash(JSON.stringify(style)).toString(32);
}
