import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Effect, Scene, Engine, PostProcess } from '@babylonjs/core';
import '@babylonjs/loaders';

// Shaders example 1: Wavy effect

interface ShadersExample1Props {
    scene: Scene;
    engine: Engine;
  }
  
const ShadersExample1: React.FC<ShadersExample1Props> = ({scene, engine}) => {

    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    const [postProcess, setPostProcess] = useState<PostProcess | null>(null);

    useEffect(() => {
        if(selectedMenuItem === 'Shaders_example_1') {

            // Define the shader material
            const vertexShader = `
            precision highp float;
            attribute vec2 position;
            varying vec2 vUV;
            void main(void) {
                vUV = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
                }
            `;
            // Define the fragment shader
            const fragmentShader = `
                precision highp float;
                varying vec2 vUV;
                uniform float time;
                uniform sampler2D textureSampler;

                void main(void) {
                    vec2 uv = vUV;
                    uv.y += sin(uv.x * 10.0 + time * 5.0) * 0.1;
                    gl_FragColor = texture2D(textureSampler, uv);
                }
            `;

            // Register shaders
            Effect.ShadersStore["customVertexShader"] = vertexShader;
            Effect.ShadersStore["customFragmentShader"] = fragmentShader;

            // Create post-process effect
            const newPostProcess = new PostProcess(
                "waveEffect",
                "custom",
                ["time"],
                null,
                1.0,
                scene.activeCamera
            );

            // Animation loop
            let time = 0;
            newPostProcess.onApply = (effect) => {
                time += engine.getDeltaTime() * 0.001;  // convert to seconds
                effect.setFloat("time", time);
            };

            setPostProcess(newPostProcess);



        }
        else {
            // Dispose wave effect
            if(postProcess) {
                postProcess.dispose();
                setPostProcess(null);
            }
        }
    }, [scene, engine, selectedMenuItem]);


    return (
        <>


        </>
    );
    
  };
export default ShadersExample1;
