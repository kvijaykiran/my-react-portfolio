import { Color3, Vector2 } from '@babylonjs/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Scene } from '@babylonjs/core';
import { disposeMeshesByPattern, drawCircle, constructVector, drawDot, disposeLightsByPattern } from '../Utils';
//import { useDispatch } from 'react-redux';

// Created by Vijay Kalivarapu
// This script demonstrates the use of vectors in 2D spaces

interface VectorsExamplesProps {
    scene: Scene;
  }
  


const VectorsExamples: React.FC<VectorsExamplesProps> = ({scene}) => {
    // const dispatch = useDispatch<AppDispatch>();
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
            disposeLightsByPattern(scene, '_light');

            mytVal += mydeltaT;
            if(mytVal > 1.0 || mytVal < 0)
              mydeltaT = -mydeltaT;
            
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
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;
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
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

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
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

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
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

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
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

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

    }, [selectedMenuItem]);

    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_7") {
        // Draw an animating vector C moving between A and B
        console.log("Draw an animating vector C moving between A and B");

        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

          let o = new Vector2(0, 0);
          let a = new Vector2(-4.5, 4);
          let b = new Vector2(4.5, 1.5);
          let c1 = new Vector2();
          let c2 = new Vector2();
          let c = new Vector2();

          // c = a * (1 - t) + b * t
          c1 = a.multiplyByFloats((1 - mytVal), (1 - mytVal));
          c2 = b.multiplyByFloats(mytVal, mytVal);
          c = c1.add(c2);

          constructVector("vec1", a, o, new Color3(1, 1, 1), scene);
          constructVector("vec2", b, o, new Color3(1, 1, 1), scene);
          constructVector("vec3", a.subtract(b), b, new Color3(1, 1, 1), scene);
          constructVector("vec4", c, o, new Color3(0, 1, 0), scene);

        });

      }
    }, [selectedMenuItem]);


    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_8") {
        // Draw a circle through points of a triangle
        console.log("Draw a circle through points of a triangle");
        let mytVal = 0;
        let mydeltaT = 0.0005 * scene.deltaTime;

        scene.onBeforeRenderObservable.add(() => {
          disposeMeshesByPattern(scene, '_Mesh');
          disposeMeshesByPattern(scene, '_line');
          disposeMeshesByPattern(scene, '_dot');
          
          mytVal += mydeltaT;
          if(mytVal > 1.0 || mytVal < 0)
            mydeltaT = -mydeltaT;

          let p1 = new Vector2(-3.0 -2.0 * mytVal, 0);
          let p2 = new Vector2(1.0, 3.0 + 2.25 * (1.0 - mytVal));
          let p3 = new Vector2(3.0, -2.0 - 3.0 * mytVal);

          // Draw triangle
          constructVector("vec1", p2.subtract(p1), p1, new Color3(0, 0, 1), scene);
          constructVector("vec2", p3.subtract(p2), p2, new Color3(0, 1, 0), scene);
          constructVector("vec3", p1.subtract(p3), p3, new Color3(1, 0, 0), scene);

          // // Draw bisectors in green
          let mp1 = p1.add(p2).multiplyByFloats(0.5, 0.5);
          let biD1 = new Vector2();
          biD1 = CalcPerpVector(p1.subtract(p2));
          constructVector("vec4", biD1.multiplyByFloats(4, 4), mp1, new Color3(0, 1, 0), scene);

          let mp2 = p2.add(p3).multiplyByFloats(0.5, 0.5);
          let biD2 = new Vector2();
          biD2 = CalcPerpVector(p2.subtract(p3));
          constructVector("vec5", biD2.multiplyByFloats(4, 4), mp2, new Color3(0, 1, 0), scene);

          let mp3 = p3.add(p1).multiplyByFloats(0.5, 0.5);
          let biD3 = new Vector2();
          biD3 = CalcPerpVector(p3.subtract(p1));
          constructVector("vec6", biD3.multiplyByFloats(4, 4), mp3, new Color3(0, 1, 0), scene);

          // Compute the center of the circle
          let n0 = p3.subtract(p2);
          let n1 = p1.subtract(p3);
          let num = Vector2.Dot(n0, n1);

          let d0 = p2.subtract(p1);
          let d1 = p1.subtract(p3);
          let cpvd = CalcPerpVector(d0);
          let den = Vector2.Dot(cpvd, d1);

          let A0 = p2.subtract(p1);
          let A1 = CalcPerpVector(A0);
          A1 = A1.scale(num/den);
          let A2 = A0.add(A1);
          A2 = A2.scale(0.5);

          let ctr = p1.add(A2);
          
          drawDot("dot1_dot", ctr, 0.2, new Color3(0, 0, 0), scene);

          // compute the radius and draw circle
          let rad = (p1.subtract(ctr)).length();
          drawCircle("c1_line", rad, ctr.x, ctr.y, new Color3(0, 0, 0), scene);

        });
      }


    }, [selectedMenuItem]);

    useEffect(() => {
      if(selectedMenuItem === "Vectors_example_9") {
        
      }
    }, [selectedMenuItem]);


    return (
        <>
          {

          }
        </>
    );
    
  };
  
  export default VectorsExamples;

  