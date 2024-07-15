import { Color3, Vector2 } from '@babylonjs/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { Scene } from '@babylonjs/core';
import { disposeMeshesByPattern, drawCircle, constructVector, drawDot } from '../Utils';
import { useDispatch } from 'react-redux';

// Created by Vijay Kalivarapu
// This script demonstrates the use of vectors in 2D spaces

interface VectorExampleProps {
    scene: Scene;
  }
  


const VectorExample: React.FC<VectorExampleProps> = ({scene}) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);

    const CalcPerpVector = (a: Vector2) : Vector2 => {
      let perpVec = new Vector2();
      perpVec.x = -a.y;
      perpVec.y = a.x;
      perpVec = perpVec.normalize();
      return perpVec;
    }

    useEffect(() => {
        // if UI menu item selected is Vector 1, draw circle with lines interacting
        if(selectedMenuItem === 'Vectors_example_1') {
          // Draw two vectors, one in a fixed direction and the other animating at an angle theta
          console.log("Draw two vectors, with one animating");

          let mytVal = 0;
          let mydeltaT = 0.0005 * scene.deltaTime;

          scene.onBeforeRenderObservable.add(() => {
            disposeMeshesByPattern(scene, '_Mesh');
            disposeMeshesByPattern(scene, '_line');
            disposeMeshesByPattern(scene, '_dot');
            
            mytVal += mydeltaT;
            if(mytVal > 1.0) {
              mytVal = 1.0;
              mydeltaT = -mydeltaT;
            } else if(mytVal < 0) {
              mytVal = 0;
              mydeltaT = -mydeltaT;
            }
            drawCircle("circle_line", 2, 0, 0, new Color3(1, 0, 0), scene);
            constructVector("vec1", new Vector2(3 * Math.cos(2 * Math.PI * mytVal), 3 * Math.sin(2 * Math.PI * mytVal)), new Vector2(0, 0), new Color3(0, 1, 0), scene);
            constructVector("vec2", new Vector2(4, 0), new Vector2(0, 0), new Color3(1, 1, 1), scene);
          });

        }
    }, [selectedMenuItem]);

    useEffect(() => {
      if(selectedMenuItem === 'Vectors_example_2') {
        // Calculate vector C as a projection of B onto A
        console.log("Compute vector C as a projection of B onto A");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0) {
            mytVal = 1.0;
            mydeltaT = -mydeltaT;
          } else if(mytVal < 0) {
            mytVal = 0;
            mydeltaT = -mydeltaT;
          }
          drawCircle("circle_line", 2, 0, 0, new Color3(1, 0, 0), scene);
          let c = new Vector2(3 * Math.cos(2 * Math.PI * mytVal), 3 * Math.sin(2 * Math.PI * mytVal));
          let v = new Vector2(3, 0);
          constructVector("vec1", c, new Vector2(0, 0), new Color3(0, 1, 0), scene);
          constructVector("vec2", v, new Vector2(0, 0), new Color3(1, 1, 1), scene);

          let projectScalar = Vector2.Dot(c, v)/Vector2.Dot(v, v);
          let kv = new Vector2(projectScalar * v.x, projectScalar * v.y);
          constructVector("vec3", kv, new Vector2(0, 0), new Color3(0, 0, 0), scene);
        });

      }
    }, [selectedMenuItem]);

    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_3") {
        // Calculate vector D as a distance from point to line
        console.log("Vector D as a distance from point to line");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0) {
            mytVal = 1.0;
            mydeltaT = -mydeltaT;
          } else if(mytVal < 0) {
            mytVal = 0;
            mydeltaT = -mydeltaT;
          }
          drawCircle("circle_line", 2, 0, 0, new Color3(1, 0, 0), scene);

          let c = new Vector2(3 * Math.cos(2 * Math.PI * mytVal), 3 * Math.sin(2 * Math.PI * mytVal));
          let v = new Vector2(3, 0);
          constructVector("vec1", c, new Vector2(0, 0), new Color3(0, 1, 0), scene);
          constructVector("vec2", v, new Vector2(0, 0), new Color3(1, 1, 1), scene);

          let projectScalar = Vector2.Dot(c, v)/Vector2.Dot(v, v);
          let kv = new Vector2(projectScalar * v.x, projectScalar * v.y);
          constructVector("vec3", kv, new Vector2(0, 0), new Color3(0, 0, 0), scene);

          let projectScalar2 = Vector2.Dot(c, CalcPerpVector(v)) / Vector2.Dot(CalcPerpVector(v), CalcPerpVector(v));
          let mv = new Vector2(projectScalar2 * CalcPerpVector(v).x, projectScalar2 * CalcPerpVector(v).y);
          constructVector("vec4", mv, kv, new Color3(1, 1, 0), scene);

        });

        
      }
    }, [selectedMenuItem]);

    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_4") {
        // Draw an animating triangle, constructed from vectors

        console.log("Draw an animating triangle, constructed from vectors");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0) {
            mytVal = 1.0;
            mydeltaT = -mydeltaT;
          } else if(mytVal < 0) {
            mytVal = 0;
            mydeltaT = -mydeltaT;
          }

          let p1 = new Vector2(-3 -2 * mytVal, 0);
          let p2 = new Vector2(1, 3 + 2.25 * (1 - mytVal));
          let p3 = new Vector2(3, -2 - 3 * mytVal);
          constructVector("vec1", p2.subtract(p1), p1, new Color3(0, 0, 1), scene);
          constructVector("vec2", p3.subtract(p2), p2, new Color3(0, 1, 0), scene);
          constructVector("vec3", p1.subtract(p3), p3, new Color3(1, 0, 0), scene);


        });


      }

    }, [selectedMenuItem])


    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_5") {
        // Calculate medians of the triangle on the fly
        console.log("Calculate medians of the triangle on the fly");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0) {
            mytVal = 1.0;
            mydeltaT = -mydeltaT;
          } else if(mytVal < 0) {
            mytVal = 0;
            mydeltaT = -mydeltaT;
          }

          let p1 = new Vector2(-3 -2 * mytVal, 0);
          let p2 = new Vector2(1, 3 + 2.25 * (1 - mytVal));
          let p3 = new Vector2(3, -2 - 3 * mytVal);

          constructVector("vec1", p2.subtract(p1), p1, new Color3(0, 0, 1), scene);
          constructVector("vec2", p3.subtract(p2), p2, new Color3(0, 1, 0), scene);
          constructVector("vec3", p1.subtract(p3), p3, new Color3(1, 0, 0), scene);

          let mp1 = (p1.add(p2)).multiplyByFloats(0.5, 0.5);  // (p1 + p2)/2
          let mp2 = (p2.add(p3)).multiplyByFloats(0.5, 0.5);  // (p2 + p3)/2
          let mp3 = (p3.add(p1)).multiplyByFloats(0.5, 0.5);  // (p3 + p1)/2

          constructVector("vec4", mp1.subtract(p3), p3, new Color3(1, 1, 0), scene);
          constructVector("vec5", mp2.subtract(p1), p1, new Color3(1, 1, 0), scene);
          constructVector("vec6", mp3.subtract(p2), p2, new Color3(1, 1, 0), scene);
        });
      }

    }, [selectedMenuItem])


    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_6") {
        // Calculate the centroid of the triangle on the fly and show that the intersection of the medians is the same as centroid
        console.log("Calculate the centroid of the triangle on the fly and show that the intersection of the medians is the same as centroid");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0) {
            mytVal = 1.0;
            mydeltaT = -mydeltaT;
          } else if(mytVal < 0) {
            mytVal = 0;
            mydeltaT = -mydeltaT;
          }

          let p1 = new Vector2(-3 -2 * mytVal, 0);
          let p2 = new Vector2(1, 3 + 2.25 * (1 - mytVal));
          let p3 = new Vector2(3, -2 - 3 * mytVal);
          constructVector("vec1", p2.subtract(p1), p1, new Color3(0, 0, 1), scene);
          constructVector("vec2", p3.subtract(p2), p2, new Color3(0, 1, 0), scene);
          constructVector("vec3", p1.subtract(p3), p3, new Color3(1, 0, 0), scene);

          let mp1 = (p1.add(p2)).multiplyByFloats(0.5, 0.5);  // (p1 + p2)/2
          let mp2 = (p2.add(p3)).multiplyByFloats(0.5, 0.5);  // (p2 + p3)/2
          let mp3 = (p3.add(p1)).multiplyByFloats(0.5, 0.5);  // (p3 + p1)/2

          constructVector("vec4", mp1.subtract(p3), p3, new Color3(1, 1, 0), scene);
          constructVector("vec5", mp2.subtract(p1), p1, new Color3(1, 1, 0), scene);
          constructVector("vec6", mp3.subtract(p2), p2, new Color3(1, 1, 0), scene);

          let cp = (p1.add(p2).add(p3)).multiplyByFloats(1.0/3.0, 1.0/3.0); // (p1 + p2 + p3)/3
          drawDot("centroid_dot", cp, 0.2, new Color3(0, 1, 0), scene);
        });
      }

    }, [selectedMenuItem])



    return (
        <>
          {

          }
        </>
    );
    
  };
  
  export default VectorExample;

  