/* =========================================================
   3D HERO — a DNA helix rendered in three.js
   (biology backbone, circuit-blue rungs)
========================================================= */
(function () {
  const canvas = document.getElementById("helix");
  if (!canvas || typeof THREE === "undefined") return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const stage = canvas.parentElement;

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function fit() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  fit();
  window.addEventListener("resize", fit);

  // lights
  scene.add(new THREE.AmbientLight(0x224433, 1.1));
  const key = new THREE.PointLight(0xb4f461, 2.2, 30);
  key.position.set(6, 6, 8);
  scene.add(key);
  const rim = new THREE.PointLight(0x4fd1ff, 1.6, 30);
  rim.position.set(-6, -4, 6);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  // --- geometry shared across instances ---
  const sphereGeo = new THREE.SphereGeometry(0.16, 14, 14);
  const matA = new THREE.MeshStandardMaterial({ color: 0xb4f461, roughness: 0.35, metalness: 0.1, emissive: 0x264d17, emissiveIntensity: 0.4 });
  const matB = new THREE.MeshStandardMaterial({ color: 0x4fd1ff, roughness: 0.35, metalness: 0.1, emissive: 0x0d3a4d, emissiveIntensity: 0.4 });
  const rungMat = new THREE.MeshStandardMaterial({ color: 0xff6f59, roughness: 0.5, metalness: 0.05, transparent: true, opacity: 0.55 });

  const TURNS = 3.4;
  const COUNT = 46;
  const RADIUS = 2.1;
  const HEIGHT = 9;

  const strandA = [];
  const strandB = [];

  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1);
    const angle = t * Math.PI * 2 * TURNS;
    const y = (t - 0.5) * HEIGHT;

    const ax = Math.cos(angle) * RADIUS;
    const az = Math.sin(angle) * RADIUS;
    const bx = Math.cos(angle + Math.PI) * RADIUS;
    const bz = Math.sin(angle + Math.PI) * RADIUS;

    const pa = new THREE.Vector3(ax, y, az);
    const pb = new THREE.Vector3(bx, y, bz);
    strandA.push(pa);
    strandB.push(pb);

    const sa = new THREE.Mesh(sphereGeo, matA);
    sa.position.copy(pa);
    group.add(sa);

    const sb = new THREE.Mesh(sphereGeo, matB);
    sb.position.copy(pb);
    group.add(sb);

    // rung every 3rd step so it doesn't get too busy
    if (i % 3 === 0) {
      const mid = new THREE.Vector3().addVectors(pa, pb).multiplyScalar(0.5);
      const dist = pa.distanceTo(pb);
      const rungGeo = new THREE.CylinderGeometry(0.035, 0.035, dist, 8);
      const rung = new THREE.Mesh(rungGeo, rungMat);
      rung.position.copy(mid);
      rung.lookAt(pb);
      rung.rotateX(Math.PI / 2);
      group.add(rung);
    }
  }

  group.rotation.z = 0.28;

  // mouse parallax
  let targetX = 0, targetY = 0;
  window.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  let autoRotate = 0;

  function render() {
    if (!prefersReduced) {
      autoRotate += 0.0035;
    }
    group.rotation.y = autoRotate + targetX;
    group.rotation.x = targetY * 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
})();

/* =========================================================
   CERTIFICATE CARDS — subtle 3D tilt on pointer move
========================================================= */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  document.querySelectorAll(".cert-card__inner").forEach((card) => {
    const strength = 10; // degrees

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${px * strength}deg) rotateX(${-py * strength}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
  });
})();
