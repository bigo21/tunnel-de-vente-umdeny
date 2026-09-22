/**
 * Moteur WebGL de la vitrine du sommaire, chargé à la demande.
 *
 * Deux effets, et seulement deux :
 * - une onde légère sous le pointeur quand il survole la planche ;
 * - un fondu par déplacement quand on passe d'un film à l'autre.
 *
 * Le rendu ne tourne que pendant un survol ou une transition, puis s'arrête :
 * au repos, la vitrine ne coûte aucune image.
 */
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Texture,
  Vector2,
  WebGLRenderer,
} from "three";

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D tDepart;
  uniform sampler2D tArrivee;
  uniform float avancee;
  uniform float survol;
  uniform float temps;
  uniform vec2 pointeur;
  uniform float sourdine;
  varying vec2 vUv;

  float hasard(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float bruit(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hasard(i), hasard(i + vec2(1.0, 0.0)), u.x),
      mix(hasard(i + vec2(0.0, 1.0)), hasard(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;

    // Onde sous le pointeur, amortie avec la distance.
    vec2 ecart = uv - pointeur;
    float d = length(ecart * vec2(1.7778, 1.0));
    float onde = survol * 0.009 * sin(d * 34.0 - temps * 3.2) * smoothstep(0.42, 0.0, d);
    uv += normalize(ecart + 1e-5) * onde;

    // Fondu par déplacement : un front bruité balaie la planche de gauche à
    // droite, chaque film glissant légèrement dans le sens du front.
    float n = bruit(uv * vec2(5.0, 3.0));
    float front = smoothstep(avancee - 0.18, avancee + 0.18, uv.x * 0.62 + n * 0.38);
    vec2 glisse = vec2(0.06 * n, 0.0);
    vec4 depart = texture2D(tDepart, uv + glisse * avancee);
    vec4 arrivee = texture2D(tArrivee, uv - glisse * (1.0 - avancee));
    vec4 couleur = mix(arrivee, depart, front);

    // Planche sourde, comme en CSS : désaturée et assombrie tant que les
    // films sont provisoires ; le survol rend une part de la couleur.
    float luma = dot(couleur.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 sourde = vec3(luma) * vec3(1.02, 0.98, 0.9) * 0.8;
    couleur.rgb = mix(couleur.rgb, sourde, sourdine * (1.0 - 0.7 * survol));
    gl_FragColor = couleur;

    #include <colorspace_fragment>
  }
`;

/** Le front déborde des deux côtés pour que la planche soit entière au repos. */
const DEBUT = -0.2;
const FIN = 1.2;

export type Vitrine = {
  montrer: (image: HTMLImageElement) => void;
  pointer: (x: number, y: number, dedans: boolean) => void;
  redimensionner: () => void;
  detruire: () => void;
};

export function creerVitrine(
  toile: HTMLCanvasElement,
  premiere: HTMLImageElement,
  mouvementDoux: () => boolean,
  provisoire: boolean,
): Vitrine {
  const rendu = new WebGLRenderer({
    canvas: toile,
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  });
  rendu.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  rendu.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const cache = new Map<string, Texture>();
  const texture = (image: HTMLImageElement) => {
    const cle = image.currentSrc || image.src;
    let t = cache.get(cle);
    if (!t) {
      t = new Texture(image);
      t.colorSpace = SRGBColorSpace;
      t.needsUpdate = true;
      cache.set(cle, t);
    }
    return t;
  };

  const uniforms = {
    tDepart: { value: texture(premiere) },
    tArrivee: { value: texture(premiere) },
    avancee: { value: FIN },
    survol: { value: 0 },
    temps: { value: 0 },
    pointeur: { value: new Vector2(0.5, 0.5) },
    sourdine: { value: provisoire ? 0.78 : 0 },
  };

  const materiau = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
  });
  const plan = new Mesh(new PlaneGeometry(2, 2), materiau);
  scene.add(plan);

  let dedans = false;
  let cibleSurvol = 0;
  const ciblePointeur = new Vector2(0.5, 0.5);
  let transition: { debut: number; duree: number } | null = null;
  let boucle = 0;
  let precedent = performance.now();

  const redimensionner = () => {
    const { width, height } = toile.getBoundingClientRect();
    rendu.setSize(width, height, false);
    dessiner();
  };

  const dessiner = () => rendu.render(scene, camera);

  const image = (maintenant: number) => {
    const dt = Math.min(0.05, (maintenant - precedent) / 1000);
    precedent = maintenant;
    uniforms.temps.value += dt;

    // Rapprochement exponentiel : doux, indépendant de la cadence d'affichage.
    const k = 1 - Math.exp(-dt * 7);
    uniforms.survol.value += (cibleSurvol - uniforms.survol.value) * k;
    uniforms.pointeur.value.lerp(ciblePointeur, k);

    if (transition) {
      const t = Math.min(1, (maintenant - transition.debut) / transition.duree);
      // Sortie exponentielle.
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      uniforms.avancee.value = DEBUT + (FIN - DEBUT) * e;
      if (t === 1) {
        transition = null;
        uniforms.tDepart.value = uniforms.tArrivee.value;
      }
    }

    dessiner();

    const auRepos =
      !transition && !dedans && uniforms.survol.value < 0.002;
    if (auRepos) {
      uniforms.survol.value = 0;
      dessiner();
      boucle = 0;
      return;
    }
    boucle = requestAnimationFrame(image);
  };

  const reveiller = () => {
    if (!boucle) {
      precedent = performance.now();
      boucle = requestAnimationFrame(image);
    }
  };

  redimensionner();

  return {
    montrer(nouvelle) {
      const suivante = texture(nouvelle);
      if (suivante === uniforms.tArrivee.value && !transition) return;
      uniforms.tDepart.value = uniforms.tArrivee.value;
      uniforms.tArrivee.value = suivante;
      if (mouvementDoux()) {
        uniforms.avancee.value = FIN;
        uniforms.tDepart.value = suivante;
        dessiner();
        return;
      }
      uniforms.avancee.value = DEBUT;
      transition = { debut: performance.now(), duree: 900 };
      reveiller();
    },
    pointer(x, y, estDedans) {
      dedans = estDedans;
      cibleSurvol = estDedans && !mouvementDoux() ? 1 : 0;
      ciblePointeur.set(x, 1 - y);
      reveiller();
    },
    redimensionner,
    detruire() {
      cancelAnimationFrame(boucle);
      cache.forEach((t) => t.dispose());
      materiau.dispose();
      plan.geometry.dispose();
      rendu.dispose();
    },
  };
}
