import { MeshBuilder } from '@babylonjs/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Scene } from '@babylonjs/core';
import { disposeMeshesByPattern } from '../Utils';

interface VectorExample1Props {
    scene: Scene;
  }
  


const VectorExample1: React.FC<VectorExample1Props> = ({scene}) => {

    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);

    useEffect(() => {
        // if UI menu item selected is Vector 1, draw circle with lines interacting
        if(selectedMenuItem === 'Vectors_example_1') {
          // dispose all existing meshes with a name pattern at the end '_Mesh'
          disposeMeshesByPattern(scene, '_Mesh');

          const capsule = MeshBuilder.CreateCapsule("capsule_Mesh", {}, scene);

        }


    }, [selectedMenuItem]);


    return (
        <>
          {
            
          }
        </>
    );
    
  };
  
  export default VectorExample1;

  