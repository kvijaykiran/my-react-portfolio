import React, { useEffect } from 'react';
import { Scene, MeshBuilder } from '@babylonjs/core';
import { StandardMaterial } from '@babylonjs/core';
import { Color3 } from '@babylonjs/core';

interface GroundPlaneProps {
  scene: Scene;
}

const GroundPlane: React.FC<GroundPlaneProps> = ({ scene }) => {
  useEffect(() => {
    
    const ground = MeshBuilder.CreateGround('ground', {width: 20, height: 20, subdivisions: 2});
    const groundMat = new StandardMaterial('brownMat", scene');
    groundMat.diffuseColor = new Color3(115/255, 97/255, 83/255);
    groundMat.specularColor = Color3.Black();
    ground.material = groundMat;

    return () => {
      ground.dispose();
    };
  }, [scene]);

  return null;
};

export default GroundPlane;
