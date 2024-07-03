import React, { useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, DirectionalLight } from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ/objFileLoader';
import { computeCentroidFromBoundingBox } from './Utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setPosition, setRotation } from './redux/cameraSlice';
//import CameraController from './components/CameraController';
import GroundPlane from './components/GroundPlane';
import ViewingPrimitives from './components/ViewingPrimitives';
import {deg2Rad, rad2Deg} from './Utils';
import { ShadowGenerator } from '@babylonjs/core';

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  //const baseUrl = import.meta.env.BASE_URL;
  const objFilePath = "/my-react-portfolio/geometry/RevolvePart.obj";
  const dispatch = useDispatch<AppDispatch>();
  const cameraState = useSelector((state: RootState) => state.camera);
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Set background color
    scene.clearColor = new Color4(0.2, 0.2, 0.2, 1.0);
    scene.ambientColor = new Color3(0.2, 0.2, 0.2);

    // Set camera parameters
    console.log(cameraState.position);
    console.log(rad2Deg(cameraState.rotation.x), rad2Deg(cameraState.rotation.y), rad2Deg(cameraState.rotation.z));
    const positionVector = new Vector3(cameraState.position.x, cameraState.position.y, cameraState.position.z);
    const positionMagnitude = positionVector.length();
    const camera = new ArcRotateCamera(
      'camera1', 
      cameraState.rotation.y,
      cameraState.rotation.x,
      positionMagnitude,
      new Vector3(0, 0, 0),
      scene);
    camera.minZ = 0.1;  // lowest value for minZ = 0.1
    camera.attachControl(canvasRef.current, true);
    // const camera = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 2, 10, new Vector3(0, 0, 0), scene);
    // camera.attachControl(canvasRef.current, true);


    // Update Redux state when camera position or rotation changes
    camera.onViewMatrixChangedObservable.add(() => {
      dispatch(setPosition(new Vector3(camera.position.x, camera.position.y, camera.position.z)));
      dispatch(setRotation(new Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z)));
    });


    // Set lighting parameters
    const hlight = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    hlight.diffuse = new Color3(0.75, 0.75, 0.75);
	  //hlight.specular = new Color3(0, 1, 0);
	  //lighhlight.groundColor = new Color3(0, 1, 0);

    // set directional light
    const dlight = new DirectionalLight('dligh1', new Vector3(50, -30, 0), scene);
    dlight.diffuse = new Color3(0.75, 0.75, 0.75);
    dlight.position = new Vector3(0, 3, 0);

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

    window.addEventListener('resize', () => {
      engine.resize();
    });

    engineRef.current = engine;

    return () => {
      window.removeEventListener('resize', () => engine.resize());
      engine.dispose();
    };

  }, [dispatch]);

  //return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;

  // return (
  //   <>
  //     <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
  //     {sceneRef.current && <CameraController scene={sceneRef.current} />}
  //   </>
  // );

  return (
      <>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100vh'}} />
        {sceneRef.current && <GroundPlane scene = {sceneRef.current}/>}
        {selectedMenu === 'Front' && sceneRef.current && < ViewingPrimitives scene={sceneRef.current}/>}
      </>
  );
  
};

export default BabylonScene;
