import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Scene, Engine, ShaderMaterial, PointLight } from '@babylonjs/core';
import '@babylonjs/loaders';
import { CreatePrimitives } from './ViewingPrimitives';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core';
import { disposeLightsByPattern } from '../Utils';

interface ShadersExample2Props {
    scene: Scene;
    engine: Engine;
  }

// Shaders example 2: Lambert light model

const lambertVertexShader = `
precision highp float;
attribute vec3 position;
attribute vec3 normal;
uniform mat4 worldViewProjection;
uniform mat4 world;
uniform vec3 lightPosition;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vLightPosition;
void main(void) {
    vec4 worldPosition = world * vec4(position, 1.0);
    vPosition = worldPosition.xyz;
    vNormal = normalize(mat3(world) * normal);
    vLightPosition = lightPosition;
    gl_Position = worldViewProjection * vec4(position, 1.0);
}
`;

const lambertFragmentShader = `
precision highp float;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vLightPosition;
uniform vec3 lightColor;
uniform vec3 objectColor;
void main(void) {
    vec3 lightDirection = normalize(vLightPosition - vPosition);
    float lambertian = max(dot(vNormal, lightDirection), 0.0);
    vec3 color = lambertian * lightColor * objectColor;
    gl_FragColor = vec4(color, 1.0);
}
`;

const applyLambertShader = (scene) => {
    const light = new PointLight('point_light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.9;


    const shaderMaterial = new ShaderMaterial(
        'lambertShader',
        scene,
        {
            vertex: lambertVertexShader,
            fragment: lambertFragmentShader,
        },
        {
            attributes: ['position', 'normal'],
            uniforms: ['world', 'worldViewProjection', 'lightPosition', 'lightColor', 'objectColor'],
        }
    );

    shaderMaterial.setVector3('lightPosition', light.position);
    shaderMaterial.setColor3('lightColor', new Color3(1, 1, 1));
    shaderMaterial.setColor3('objectColor', new Color3(1, 0, 0));

    const primitives = CreatePrimitives(scene);
    primitives.forEach(primitive => {
        primitive.material = shaderMaterial;
    });
};


  
const ShadersExample2: React.FC<ShadersExample2Props> = ({scene}) => {

    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);

    useEffect(() => {
        if(selectedMenuItem === 'Shaders_example_2') {
            if(scene) {
                console.log("Lambert model using GLSL with point light");
                // remove existing lights
                disposeLightsByPattern(scene, "_light");
                applyLambertShader(scene);
            }
        }
    }, [scene, selectedMenuItem]);

    return (
        <>


        </>
    );
    
  };
export default ShadersExample2;
