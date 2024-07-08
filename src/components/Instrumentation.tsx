import React, { useEffect } from 'react';
import { Engine, EngineInstrumentation, Scene, SceneInstrumentation } from '@babylonjs/core';
import { StackPanel, TextBlock } from '@babylonjs/gui';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

// Not implemented yet - https://playground.babylonjs.com/#YBDK7C, Thank you!

interface InstrumentationProps {
    scene: Scene;
    engine: Engine;
  }
  

const Instrumentation: React.FC<InstrumentationProps> = ({scene, engine}) => {
    useEffect(() => {
        let sceneInstrumentation = new SceneInstrumentation(scene);
        sceneInstrumentation.captureActiveMeshesEvaluationTime = true;
        sceneInstrumentation.captureFrameTime = true;
        // sceneInstrumentation.captureParticlesRenderTime = true;
        sceneInstrumentation.captureRenderTime = true;
        sceneInstrumentation.captureCameraRenderTime = true;
        sceneInstrumentation.captureInterFrameTime = true;

        let engineInstrumentation = new EngineInstrumentation(engine);
        engineInstrumentation.captureGPUFrameTime = true;
        engineInstrumentation.captureShaderCompilationTime = true;

        // function videoTextureCount() {
        //     let videoTextureCounter = 0;
        //     for (let i = 0; i < scene.textures.length; i++) {
        //       if (scene.textures[i].video) {
        //         videoTextureCounter++;
        //         console.log(scene.textures[i])
        //       }
        //     }
        //     return videoTextureCounter;
        //   }






    return () => {

    };

    },[scene]);


    const addGuiPanel = (guiTexture: AdvancedDynamicTexture, hAlign: number, vAlign: number) => {
        const panel = new StackPanel();
        panel.horizontalAlignment = hAlign;
        panel.verticalAlignment = vAlign;
        panel.height = "100%";
        panel.width = "250px";
        panel.paddingTop = "100px";
        panel.paddingLeft = "20px";
        panel.paddingBottom = "5px";
        panel.paddingRight = "10px";
        guiTexture.addControl(panel);
        return panel;
    }

    const addTextBlock = (panel: StackPanel, text: string) => {
        const textBlock = new TextBlock();
        textBlock.text = text;
        textBlock.height = "20px";
        textBlock.width = "200px";
        textBlock.color = "green";
        textBlock.fontSize = 14;
        textBlock.horizontalAlignment = 0;
        panel.addControl(textBlock);
        return textBlock;
    }



    return null;
}

export default Instrumentation;
