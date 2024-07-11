//import * as BABYLON from '@babylonjs/core';
import { AbstractMesh } from '@babylonjs/core';
import { Color3 } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core';
import { VertexBuffer } from '@babylonjs/core';

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

export const drawCircle = (radius: number, centrX: number, centrZ: number, color: Color3) => {
//  const circle = MeshBuilder.CreateLines('circle', {})

}
