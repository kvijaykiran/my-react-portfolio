import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, Camera, ArcRotateCamera, Plane } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ/objFileLoader';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

import { deg2Rad } from './Utils';
import UIElements from './components/UIElements';
// import GroundPlane from './components/GroundPlane';
import ViewingPrimitives from './components/ViewingPrimitives';
import Instrumentation from './components/Instrumentation';
import VectorsExamples from './components/VectorsExamples';
import ShadersExample1 from './components/ShadersExample1'; // wavy effect
import ShadersExample2 from './components/ShadersExample2'; // Lambert light


const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  //const baseUrl = import.meta.env.BASE_URL;
  //const objFilePath = "/my-react-portfolio/geometry/RevolvePart.obj";
  const cameraState = useSelector((state: RootState) => state.camera);
  const [scene, setScene] = useState<Scene | null>(null);
  const [guiTexture, setGuiTexture] = useState<AdvancedDynamicTexture | null>(null);
  const [camera, setCamera] = useState<ArcRotateCamera | null>(null);
  const isPerspectiveView = useSelector((state: RootState) => state.ui.isPerspectiveView);
  const fieldOfView = useSelector((state: RootState) => state.ui.fieldOfView);
  const sceneClippingH = useSelector((state: RootState) => state.ui.clipPlaneH);
  const sceneClippingV = useSelector((state: RootState) => state.ui.clipPlaneV);
  const sceneClippingF = useSelector((state: RootState) => state.ui.clipPlaneF);


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
    const arcCamera = new ArcRotateCamera(
      'camera1', 
      cameraState.rotation_y,
      cameraState.rotation_x,
      20,
      new Vector3(0, 0, 0),
      scene);
      arcCamera.minZ = 0.1;  // lowest value for minZ = 0.1
      arcCamera.attachControl(canvasRef.current, true);

    scene.activeCamera = arcCamera;
    setCamera(arcCamera);

    

    const newGuiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    setGuiTexture(newGuiTexture);

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
    if(camera) {
      camera.mode = isPerspectiveView ? Camera.PERSPECTIVE_CAMERA : Camera.ORTHOGRAPHIC_CAMERA;
      // Set left, right, top, and bottom for orthographic cameras explicitly
      if(!isPerspectiveView) {
        camera.orthoLeft = -20; // hardcoded for now but can be dependent on the extents of the bounding box of all objects in scene 
        camera.orthoRight = 20;
        const ratio = canvasRef.current.height / canvasRef.current.width;
        camera.orthoTop = camera.orthoRight * ratio;
        camera.orthoBottom = camera.orthoLeft * ratio;
        let oldRad = camera.radius;
        scene.onBeforeRenderObservable.add(() => {
          if (oldRad !== camera.radius) {
            const radChangeRatio = camera.radius/oldRad;
            camera.orthoLeft *= radChangeRatio;
            camera.orthoRight *= radChangeRatio;
            oldRad = camera.radius;
            camera.orthoTop = camera.orthoRight * ratio;
            camera.orthoBottom = camera.orthoLeft * ratio;
          }
        })
      }
    }
  }, [camera, isPerspectiveView]);

  useEffect(() => {
    if(camera) {
      camera.fov = deg2Rad(fieldOfView);
    }
  }, [camera, fieldOfView]);

  useEffect(() => {
    if(scene) {
      // Scene clipping
      scene.clipPlane = new Plane(1, 0, 0, sceneClippingH);
      scene.clipPlane2 = new Plane(0, 1, 0, sceneClippingV);
      scene.clipPlane3 = new Plane(0, 0, -1, sceneClippingF);
    }
  }, [scene, sceneClippingH, sceneClippingV, sceneClippingF]);

  return (
      <>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100vh'}} />
        {/* {sceneRef.current && <GroundPlane scene = {sceneRef.current}/>} */}
        {sceneRef.current && < ViewingPrimitives scene={sceneRef.current}/>}
        {guiTexture && < UIElements guiTexture={guiTexture}/>}
        {sceneRef.current && < Instrumentation scene = {sceneRef.current} engine = {engineRef.current}/>}
        {sceneRef.current && <VectorsExamples scene = {sceneRef.current} />}
        {sceneRef.current && engineRef.current && <ShadersExample1 scene = {sceneRef.current} engine = {engineRef.current} />}
        {sceneRef.current && engineRef.current && <ShadersExample2 scene = {sceneRef.current} engine = {engineRef.current} />}
      </>
  );
  
};

export default BabylonScene;
