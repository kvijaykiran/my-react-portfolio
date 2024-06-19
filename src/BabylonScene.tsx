import React, { useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight } from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/OBJ';

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera('camera1', -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const loadModel = async () => {
      try {
        await SceneLoader.AppendAsync(`/geometry/`, 'model.obj', scene);
        if (sceneRef.current) {
          scene.meshes.forEach(mesh => {
            mesh.scaling = new Vector3(1, 1, 1);
          });
        }
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current = null;
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BabylonScene;
