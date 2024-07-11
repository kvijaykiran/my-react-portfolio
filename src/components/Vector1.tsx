import { Color3, Vector3} from '@babylonjs/core';
import { MeshBuilder } from '@babylonjs/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { Scene } from '@babylonjs/core';

interface Vector1Props {
    scene: Scene;
  }
  


const Vector1: React.FC<Vector1Props> = ({scene}) => {

    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);

    useEffect(() => {
        // if UI menu item selected is Vector 1, draw circle with lines interacting
        if(selectedMenuItem === 'Vectors_example_1') {
            const capsule = MeshBuilder.CreateCapsule("capsule", {}, scene);

        }


    }, [selectedMenuItem]);


    return (
        <>
          {/* <canvas ref={canvasRef} style={{ width: '100%', height: '100vh'}} />
          {sceneRef.current && <GroundPlane scene = {sceneRef.current}/>}
          {sceneRef.current && < ViewingPrimitives scene={sceneRef.current}/>}
          {guiTexture && < UIElements guiTexture={guiTexture}/>}
          {sceneRef.current && < Instrumentation scene = {sceneRef.current} engine = {engineRef.current}/>} */}
        </>
    );
    
  };
  
  export default Vector1;

  