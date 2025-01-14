import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader"

const scene = new THREE.Scene()
const light = new THREE.SpotLight()
light.position.set(20, 20, 20)  
scene.add(light)

const camera = new THREE.PerspectiveCamera(
  75,  
  window.innerWidth / window.innerHeight,  
  0.1,  
  1000  
)
camera.position.z = 40  

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true  // Enable smooth controls

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff, 
  wireframe: true,  
  opacity: 0.5,  
})

// PLY model
const loader = new PLYLoader()
loader.load(
  "/earth21.ply",  
  function(geometry) {
    geometry.computeVertexNormals()
    const mesh = new THREE.Mesh(geometry, material)  
    mesh.rotateX(-Math.PI / 2)  
    mesh.scale.set(0.00001, 0.00001, 0.00001)  
    scene.add(mesh)  
  },
  xhr => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded")  // Loading progress
  },
  error => {
    console.log(error)  
  }
)

// Handle window resizing
window.addEventListener("resize", onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight  // Update camera aspect ratio
  camera.updateProjectionMatrix()  // Recalculate the camera projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight) 
  render()  
}

function animate() {
  requestAnimationFrame(animate)  // Request the next frame
  controls.update()  
  render()  
}

function render() {
  renderer.render(scene, camera)
}

animate() 