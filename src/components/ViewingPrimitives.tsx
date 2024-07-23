import React, { useEffect } from 'react';
import { Scene, MeshBuilder } from '@babylonjs/core';
import { StandardMaterial } from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';
import { Color3 } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import '../Utils';
import { deg2Rad } from '../Utils';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { disposeMeshesByPattern, disposeLightsByPattern } from '../Utils';
import { HemisphericLight, DirectionalLight } from '@babylonjs/core';

interface ViewingPrimitivesProps {
  scene: Scene;
}

export const TurnLightsOn = (scene: Scene) => {
    // Set lighting parameters
    const hlight = new HemisphericLight('hemispheric_light', new Vector3(1, 1, 0), scene);
    hlight.diffuse = new Color3(0.75, 0.75, 0.75);
	  //hlight.specular = new Color3(0, 1, 0);
	  //hlight.groundColor = new Color3(0, 1, 0);

    // set directional light
    const dlight = new DirectionalLight('directional_light', new Vector3(50, -30, 0), scene);
    dlight.diffuse = new Color3(0.75, 0.75, 0.75);
    dlight.position = new Vector3(0, 3, 0);

}

export const CreatePrimitives = (scene: Scene) => {
      // Skybox
      const skybox = MeshBuilder.CreateBox('Skybox_Mesh', {size: 1000} , scene);
      const skyboxMat = new SkyMaterial('SkyMaterial', scene);
      skyboxMat.backFaceCulling = false;
      skyboxMat.inclination = 0;
      //setSkyConfig("material.inclination", skyboxMat.inclination, 0);
      skybox.material = skyboxMat;

      // ground mesh
      const ground = MeshBuilder.CreateGround('ground_Mesh', {width: 20, height: 20, subdivisions: 2});
      const groundMat = new StandardMaterial('brownMat", scene');
      groundMat.diffuseColor = new Color3(115/255, 97/255, 83/255);
      groundMat.specularColor = Color3.Black();
      ground.material = groundMat;
      ground.setAbsolutePosition(new Vector3(0, -5, 0));


      // sphere mesh
      const sphere = MeshBuilder.CreateSphere('sphere_Mesh', { diameter: 1 }, scene);
      const sphereMat = new StandardMaterial("orangeMat", scene);
      sphereMat.diffuseColor = new Color3(1, 0.35, 0);
      sphereMat.specularColor = Color3.Black();
      sphereMat.backFaceCulling = false;
      sphere.material = sphereMat;
      sphere.setAbsolutePosition(new Vector3(-2.26, -0.81, 4.47));

      // cube1
      const cube1 = MeshBuilder.CreateBox('cube1_Mesh', {size: 2, width: 2, height: 2}, scene);
      const cube1Mat = new StandardMaterial('blueMat', scene);
      cube1Mat.diffuseColor = new Color3(0, 0, 1);
      cube1Mat.backFaceCulling = false;
      cube1.material = cube1Mat;
      cube1.setAbsolutePosition(new Vector3(3.26, -0.37, -6.25));
      cube1.rotation = new Vector3(0, 0, 0);  // no rotation

      // cube2
      const cube2 = MeshBuilder.CreateBox('cube2_Mesh', {size: 2, width: 2, height: 2}, scene);
      const cube2Mat = new StandardMaterial('yellowMat', scene);
      cube2Mat.diffuseColor = new Color3(1, 1, 0);
      cube2Mat.backFaceCulling = false;
      cube2.material = cube2Mat;
      cube2.setAbsolutePosition(new Vector3(0, -2.33, -0.619));
      cube2.rotation = new Vector3(deg2Rad(25.1), deg2Rad(3.93), deg2Rad(-12.7));

      // cube3
      const cube3 = MeshBuilder.CreateBox('cube3_Mesh', {size: 2, width: 2, height: 2}, scene);
      const cube3Mat = new StandardMaterial('greenMat', scene);
      cube3Mat.diffuseColor = new Color3(0, 1, 0);
      cube3Mat.backFaceCulling = false;
      cube3.material = cube3Mat;
      cube3.setAbsolutePosition(new Vector3(-3.56, -1.06, -2.66));
      cube3.rotation = new Vector3(deg2Rad(52.86), deg2Rad(-17.32), deg2Rad(-12.7));


      // cube4
      const cube4 = MeshBuilder.CreateBox('cube4_Mesh', {size: 2, width: 2, height: 2}, scene);
      const cube4Mat = new StandardMaterial('redMat', scene);
      cube4Mat.diffuseColor = new Color3(1, 0, 0);
      cube4Mat.backFaceCulling = false;
      cube4.material = cube4Mat;
      cube4.setAbsolutePosition(new Vector3(1.35, 2.25, 1.21));
      cube4.rotation = new Vector3(deg2Rad(52.86), deg2Rad(-17.32), deg2Rad(-12.7));

      return [skybox, ground, cube1, cube2, cube3, cube4];
  
}


const ViewingPrimitives: React.FC<ViewingPrimitivesProps> = ({ scene }) => {
  const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);

  useEffect(() => {
    
    if(selectedMenuItem === "home_base" || selectedMenuItem == "default") {
      console.log("Came to homebase");

      scene.onBeforeRenderObservable.add(() => {
      disposeMeshesByPattern(scene, '_Mesh');
      disposeMeshesByPattern(scene, '_line');
      disposeMeshesByPattern(scene, '_dot');
      CreatePrimitives(scene);
    });
    disposeLightsByPattern(scene, "_light");
    TurnLightsOn(scene);

      return () => {
      //   cube4.dispose();
      };
    }

  }, [scene, selectedMenuItem]);


    return (
      <>
        {

        }
      </>
  );

};

export default ViewingPrimitives;
