// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { Vector3, Animation, ArcRotateCamera, Scene } from '@babylonjs/core';

// // This script unused at the moment

// interface CameraControllerProps {
//   scene: Scene;
// }

//   const CameraController: React.FC<CameraControllerProps> = ({ scene }) => {
//   const { position, target } = useSelector((state: RootState) => state.camera);

//   useEffect(() => {
//     const camera = scene.activeCamera as ArcRotateCamera;
//     if (camera) {
//       const positionAnimation = new Animation(
//         'cameraMove',
//         'position',
//         60,
//         Animation.ANIMATIONTYPE_VECTOR3,
//         Animation.ANIMATIONLOOPMODE_CONSTANT
//       );

//       const targetAnimation = new Animation(
//         'cameraTargetMove',
//         'target',
//         60,
//         Animation.ANIMATIONTYPE_VECTOR3,
//         Animation.ANIMATIONLOOPMODE_CONSTANT
//       );

//       const positionKeys = [
//         { frame: 0, value: camera.position.clone() },
//         { frame: 120, value: position }
//       ];

//       const targetKeys = [
//         { frame: 0, value: camera.target.clone() },
//         { frame: 120, value: target }
//       ];

//       positionAnimation.setKeys(positionKeys);
//       targetAnimation.setKeys(targetKeys);

//       camera.animations = [];
//       camera.animations.push(positionAnimation);
//       camera.animations.push(targetAnimation);

//       scene.beginAnimation(camera, 0, 120, false);
//     }
//   }, [position, target, scene]);

//   return null;
// };

// export default CameraController;
