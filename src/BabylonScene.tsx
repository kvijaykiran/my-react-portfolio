import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, DirectionalLight } from '@babylonjs/core';
//import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ/objFileLoader';
//import { computeCentroidFromBoundingBox } from './Utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setFov, setPosition_x, setPosition_y, setPosition_z, setRotation_x, setRotation_y, setRotation_z } from './redux/cameraSlice';
import GroundPlane from './components/GroundPlane';
import ViewingPrimitives from './components/ViewingPrimitives';
//import {rad2Deg} from './Utils';
import UIElements from './components/UIElements';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  //const baseUrl = import.meta.env.BASE_URL;
  //const objFilePath = "/my-react-portfolio/geometry/RevolvePart.obj";
  const dispatch = useDispatch<AppDispatch>();
  const cameraState = useSelector((state: RootState) => state.camera);
  //const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
  const pvSliderFovVal = useSelector((state: RootState) => state.ui.pvsliderfov);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Set background color
    scene.clearColor = new Color4(0.2, 0.2, 0.2, 1.0);
    scene.ambientColor = new Color3(0.2, 0.2, 0.2);

    // Set camera parameters
    //const positionVector = new Vector3(cameraState.position_x, cameraState.position_y, cameraState.position_z);
    //const positionMagnitude = positionVector.length();
    const camera = new ArcRotateCamera(
      'camera1', 
      cameraState.rotation_y,
      cameraState.rotation_x,
      20,
      new Vector3(0, 0, 0),
      scene);
    camera.minZ = 0.1;  // lowest value for minZ = 0.1
    camera.attachControl(canvasRef.current, true);

    // Update Redux state when camera position or rotation changes
    camera.onViewMatrixChangedObservable.add(() => {
      dispatch(setPosition_x(camera.position.x));
      dispatch(setPosition_y(camera.position.y));
      dispatch(setPosition_z(camera.position.z));

      dispatch(setRotation_x(camera.rotation.x));
      dispatch(setRotation_y(camera.rotation.y));
      dispatch(setRotation_z(camera.rotation.z));

      dispatch(setFov(camera.fov));
    });


    // Set lighting parameters
    const hlight = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    hlight.diffuse = new Color3(0.75, 0.75, 0.75);
	  //hlight.specular = new Color3(0, 1, 0);
	  //hlight.groundColor = new Color3(0, 1, 0);

    // set directional light
    const dlight = new DirectionalLight('dlight1', new Vector3(50, -30, 0), scene);
    dlight.diffuse = new Color3(0.75, 0.75, 0.75);
    dlight.position = new Vector3(0, 3, 0);

    /*
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
    */

    setScene(scene);

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

  }, []);


  useEffect(() => {
    if(scene) {
      const myCam = scene.getCameraByName('camera1') as ArcRotateCamera;
      if(myCam) {
        myCam.fov = pvSliderFovVal;
      }
    }
  },[scene, pvSliderFovVal]);


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
        {sceneRef.current && < ViewingPrimitives scene={sceneRef.current}/>}
        {sceneRef.current && < UIElements />}
      </>
  );
  // {sceneRef.current && < UIElements guiTexture={AdvancedDynamicTexture.CreateFullscreenUI("UI")}/>}

  // {selectedMenu === 'Front' && sceneRef.current && < ViewingPrimitives scene={sceneRef.current}/>}
  
};

export default BabylonScene;
