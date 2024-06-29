import React, { useEffect } from 'react';
import { Scene, MeshBuilder } from '@babylonjs/core';
import { StandardMaterial } from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';
import { Color3 } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import '../Utils';
import { deg2Rad } from '../Utils';

interface ViewingPrimitivesProps {
  scene: Scene;
}

const ViewingPrimitives: React.FC<ViewingPrimitivesProps> = ({ scene }) => {
  useEffect(() => {
    
    while(scene.meshes.length) {
        const mesh = scene.meshes[0];
        console.log(mesh.name)
        mesh.dispose();
        }


    // Skybox
    const skybox = MeshBuilder.CreateBox('Skybox', {size: 1000} , scene);
    const skyboxMat = new SkyMaterial('SkyMaterial', scene);
    skyboxMat.backFaceCulling = false;
    skyboxMat.inclination = 0;
    //setSkyConfig("material.inclination", skyboxMat.inclination, 0);
    skybox.material = skyboxMat;

    // ground mesh
    const ground = MeshBuilder.CreateGround('groundMesh', {width: 20, height: 20, subdivisions: 2});
    const groundMat = new StandardMaterial('brownMat", scene');
    groundMat.diffuseColor = new Color3(115/255, 97/255, 83/255);
    groundMat.specularColor = Color3.Black();
    ground.material = groundMat;


    // sphere mesh
    const sphere = MeshBuilder.CreateSphere('sphereMesh', { diameter: 1 }, scene);
    const sphereMat = new StandardMaterial("orangeMat", scene);
    sphereMat.diffuseColor = new Color3(1, 0.35, 0);
    //sphereMat.specularColor = Color3.Black();
    sphere.material = sphereMat;
    sphere.translate(new Vector3(0, 1, 0), 2);

    // cube mesh
    const cube1 = MeshBuilder.CreateBox('boxMesh', {size: 1, width: 1, height: 1}, scene);
    const cube1Mat = new StandardMaterial('blueMat', scene);
    cube1Mat.diffuseColor = new Color3(0, 0, 1);
    //cube1Mat.specularColor = Color3.Black();
    cube1.material = cube1Mat;
    cube1.translate(new Vector3(1, 1, 0), 4);
    cube1.rotate(new Vector3(1, 1, 1), deg2Rad(45));

    // cone
    const cone1 = MeshBuilder.CreateCylinder('cylinderMesh', {height: 2, diameterTop: 0, diameterBottom: 1}, scene);
    const cone1Mat = new StandardMaterial('yellowMat', scene);
    cone1Mat.diffuseColor = new Color3(1, 1, 0);
    //cone1Mat.specularColor = Color3.Black();
    cone1.material = cone1Mat;
    cone1.translate(new Vector3(0, 1, 1), 2);
    cone1.rotate(new Vector3(1, 0, 1), deg2Rad(30));

    // cylinder
    const cyl = MeshBuilder.CreateCylinder('cylinderMesh', {height: 2, diameterTop: 1, diameterBottom: 1}, scene);
    const cylMat = new StandardMaterial('greenMat', scene);
    cylMat.diffuseColor = new Color3(0, 1, 0);
    //cylMat.specularColor = Color3.Black();
    cyl.material = cylMat;
    cyl.translate(new Vector3(-1, 1, -1), 2);
    cyl.rotate(new Vector3(1, 0, 1), deg2Rad(-60));

    // cube red
    const cube2 = MeshBuilder.CreateBox('boxMesh', {size: 1, width: 1, height: 1}, scene);
    const cube2Mat = new StandardMaterial('redMat', scene);
    cube2Mat.diffuseColor = new Color3(1, 0, 0);
    //cube2Mat.specularColor = Color3.Black();
    cube2.material = cube2Mat;
    cube2.translate(new Vector3(-1, 1, 1), 3);
    cube2.rotate(new Vector3(1, 1, 1), deg2Rad(135));
    
    
    return () => {
      skybox.dispose();
      ground.dispose();
      sphere.dispose();
      cube1.dispose();
      cone1.dispose();
      cyl.dispose();
    };
  }, [scene]);

  return null;
};

export default ViewingPrimitives;
