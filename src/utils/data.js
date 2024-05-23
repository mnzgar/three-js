const color = {
  red: 0xff0000,
  green: 0x00ff00,
  blue: 0x0000ff,
  yellow: 0xffff00,
  cyan: 0x00ffff,
  magenta: 0xff00ff,
  white: 0xffffff,
  black: 0x000000,
  grey: 0xAAAAAA
};

const features = ["Nombre:", "Número de caras:", "Regular o irregular:"];

const figuresData = {
  'f-cube': ["Cubo", "6", "Regular"],
  'f-sphere': ["Esfera", "Infinito (aproximadamente)", "Regular"],
  'f-tetrahedron': ["Tetraedro", "4", "Regular"],
  'f-cylinder': ["Cilindro", "3 (2 círculos y 1 superficie lateral)", "Irregular"],
  'f-cone': ["Cono", "2 (1 círculo y 1 superficie lateral)", "Irregular"],
  'f-torus': ["Aro", "Infinito (aproximadamente)", "Irregular"]
};

export { color, features, figuresData };
