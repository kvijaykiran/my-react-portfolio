import React, { useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight } from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ/objFileLoader';
import { computeCentroidFromBoundingBox } from './Utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setPosition, setRotation } from './redux/cameraSlice';

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  //const baseUrl = import.meta.env.BASE_URL;
  const objFilePath = "/my-react-portfolio/geometry/RevolvePart.obj";
  const dispatch = useDispatch<AppDispatch>();
  const cameraState = useSelector((state: RootState) => state.camera);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Set background color
    scene.clearColor = new Color4(0.2, 0.2, 0.2, 1.0);
    scene.ambientColor = new Color3(0.2, 0.2, 0.2);

    // Set camera parameters
    const positionVector = new Vector3(cameraState.position.x, cameraState.position.y, cameraState.position.z);
    const positionMagnitude = positionVector.length();
    const camera = new ArcRotateCamera(
      'camera1', 
      cameraState.rotation.y,
      cameraState.rotation.x,
      positionMagnitude,
      new Vector3(0, 0, 0),
      scene);
    camera.attachControl(canvasRef.current, true);

    // Update Redux state when camera position or rotation changes
    camera.onViewMatrixChangedObservable.add(() => {
      dispatch(setPosition(new Vector3(camera.position.x, camera.position.y, camera.position.z)));
      dispatch(setRotation(new Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z)));
    });


    // Set lighting parameters
    new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

    // Load the OBJ file - this section will need to be moved to somewhere else
    SceneLoader.ImportMesh("", objFilePath, "", scene, (meshes) => {
      if (meshes.length === 0) return;

      const mesh = meshes[0];
      const centroid = computeCentroidFromBoundingBox(mesh);

      // Position the camera to look at the centroid
      camera.setTarget(centroid);
      camera.radius = 2 * mesh.getBoundingInfo().boundingSphere.radiusWorld;

      // Optionally, center the mesh at the origin
      //mesh.position.subtractInPlace(centroid);
    });


    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current = null;
      engine.dispose();
    };
  }, [dispatch]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BabylonScene;
