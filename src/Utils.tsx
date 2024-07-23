//import * as BABYLON from '@babylonjs/core';
import { Material, Scene, StandardMaterial } from '@babylonjs/core';
import { AbstractMesh, MeshBuilder } from '@babylonjs/core';
import { Color3 } from '@babylonjs/core';
import { Vector2, Vector3 } from '@babylonjs/core';
import { VertexBuffer } from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';

export const deg2Rad = (degrees: number): number => {
    return degrees * Math.PI/180;
}

export const rad2Deg = (radians: number): number => {
    return radians * 180/Math.PI;
}

export const computeCentroidFromBoundingBox = (mesh: AbstractMesh): Vector3 => {
    // Calculate the bounding box centroid
    const boundingInfo = mesh.getBoundingInfo();
    const minimum = boundingInfo.boundingBox.minimumWorld;
    const maximum = boundingInfo.boundingBox.maximumWorld;
    const centroid = minimum.add(maximum).scale(0.5);
    return centroid;
}

export const computeCentroidPrecise = (mesh: AbstractMesh): Vector3 => {
  const positions = mesh.getVerticesData(VertexBuffer.PositionKind);
  if (!positions) {
    throw new Error("Mesh has no positions");
  }
  
  const vertexCount = positions.length / 3;
  let centroid = new Vector3(0, 0, 0);

  for (let i = 0; i < vertexCount; i++) {
    centroid.x += positions[i * 3];
    centroid.y += positions[i * 3 + 1];
    centroid.z += positions[i * 3 + 2];
  }

  centroid.x /= vertexCount;
  centroid.y /= vertexCount;
  centroid.z /= vertexCount;

  return centroid;
};


// Dispose meshes by pattern
export const disposeMeshesByPattern = (scene: Scene, pattern: string) : void => {
  const meshesToDispose: AbstractMesh[] = scene.meshes.filter((mesh: AbstractMesh) => mesh.name.endsWith(pattern));
  const materialsToDispose: Set<Material> = new Set();
  const textElementsToDispose: TextBlock[] = [];

  meshesToDispose.forEach((mesh: AbstractMesh) => {
    if(mesh.material) {
      materialsToDispose.add(mesh.material);
    }
    mesh.dispose();
    // console.log(`Disposed mesh: ${mesh.name}`);
  });

  // Dispose of all collected materials
  materialsToDispose.forEach((material: Material) => {
    material.dispose();
  })

  // Dispose any text elements
  const advTextures = scene.textures.filter(texture => texture instanceof AdvancedDynamicTexture) as AdvancedDynamicTexture[];
  advTextures.forEach(adt => {
    adt.getChildren().forEach((control) => {
      if(control instanceof TextBlock && control.name.endsWith(pattern)) {
        console.log("came here, pattern: ", pattern);
        textElementsToDispose.push(control);
      }
    });
  });

  textElementsToDispose.forEach((textBlock: TextBlock) => {
    textBlock.dispose();
    console.log(`Disposed text element: ${textBlock.name}`);
  })


}

export const disposeLightsByPattern = (scene: Scene, lightname: string) : void => {
  const lightsToDispose = scene.lights.filter(light => light.name.endsWith(lightname));
  // console.log("disposing light: ", lightname);
  // lightsToDispose.forEach(light => scene.removeLight(light));
  lightsToDispose.forEach(light => light.dispose());
}


export const drawCircle = (name: string, radius: number, centrX: number, centrY: number, color: Color3, scene: Scene) => {
  //  const circle = MeshBuilder.CreateLines('circle', {})
  let myPoints = [];
  let theta = 0;
  const deltaTheta = 0.1;
  const numSegments = 64;
  for(let i=0; i< numSegments; i++) {
    myPoints.push(new Vector3(centrX + radius * Math.cos(theta), centrY + radius * Math.sin(theta), 0));
    theta += deltaTheta;
  }
  let circle = MeshBuilder.CreateLines(name, {points: myPoints, updatable: true}, scene);
  circle.color = color;
}

export const drawLine = (name: string, startVec: Vector2, endVec: Vector2, color: Color3, scene: Scene) => {
  const myPoints = [
    new Vector3(startVec.x, startVec.y, 0),
    new Vector3(endVec.x, endVec.y, 0),
  ];

  const straightLine = MeshBuilder.CreateLines(name, {points: myPoints, updatable: true}, scene);
  straightLine.color = color;

}

export const drawDot = (name: string, pos: Vector2, dotSize: number, color: Color3, scene: Scene) => {
  const dot = MeshBuilder.CreatePlane(name, {size: dotSize}, scene);
  dot.position.x = pos.x;
  dot.position.y = pos.y;
  dot.position.z = 0;
  const material = new StandardMaterial('dot_material');
  material.diffuseColor = color;
  dot.material = material;
}

export const constructVector = (name: string, mag: Vector2, start: Vector2, color: Color3, scene: Scene) => {
  const end = mag.add(start);

  drawDot(`${name}_1_dot`, start, 0.2, color, scene);
  drawLine(`${name}_line`, start, end, color, scene);
  drawDot(`${name}_2_dot`, end, 0.2, color, scene);

}
