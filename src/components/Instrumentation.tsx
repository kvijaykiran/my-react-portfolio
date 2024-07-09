import React, { useEffect } from 'react';
import { Engine, EngineInstrumentation, Scene, SceneInstrumentation } from '@babylonjs/core';
import { StackPanel, TextBlock, Control } from '@babylonjs/gui';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

// Not implemented yet - https://playground.babylonjs.com/#YBDK7C, Thank you!

interface InstrumentationProps {
    scene: Scene;
    engine: Engine;
  }
  

const Instrumentation: React.FC<InstrumentationProps> = ({scene, engine}) => {
    useEffect(() => {
        const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("InstrumentationUI");

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

        const panelAdd = addGuiPanel(guiTexture, 0, 0);
        const meshesLength = addInstrumentationTextBlock(panelAdd, 'Meshes: ');
        const activeMeshesLength = addInstrumentationTextBlock(panelAdd, 'Active Meshes: ');
        const activeVertices = addInstrumentationTextBlock(panelAdd, 'Active Vertice Count: ');
        const activeIndices = addInstrumentationTextBlock(panelAdd, 'Active Indices: ');
        const materialsLength = addInstrumentationTextBlock(panelAdd, 'Materials: ');
        const texturesLength = addInstrumentationTextBlock(panelAdd, 'Textures: ');
        const animationLength = addInstrumentationTextBlock(panelAdd, 'Animations: ');
        const drawCalls = addInstrumentationTextBlock(panelAdd, 'Draw Calls: ');
        const totalLights = addInstrumentationTextBlock(panelAdd, 'Lights: ');
        const frameTimeMax = addInstrumentationTextBlock(panelAdd, 'Scene Frame Time: ');
        const evalTimeMax = addInstrumentationTextBlock(panelAdd, 'Active Meshes Eval Time: ');
        const particlesFrameTime = addInstrumentationTextBlock(panelAdd, 'Particles Render Time: ');
        const interFrameTime = addInstrumentationTextBlock(panelAdd, 'Inter Frame Time: ');
        const gpuFrameTime = addInstrumentationTextBlock(panelAdd, 'GPU Frame Time: ');
        const shaderCompTime = addInstrumentationTextBlock(panelAdd, 'Shader Comp Time: ');
        const shaderTotal = addInstrumentationTextBlock(panelAdd, 'Total Shaders: ');
        const sceneRenderTime = addInstrumentationTextBlock(panelAdd, 'Scene Render Time: ');
        const cameraRenderTime = addInstrumentationTextBlock(panelAdd, 'Camera Render Time: ');
        const targetsRenderTime = addInstrumentationTextBlock(panelAdd, 'Targets Render Time: ');
        const fpsValue = addInstrumentationTextBlock(panelAdd, 'FPS: ');
        const heapSize = addInstrumentationTextBlock(panelAdd, 'Heap Used: ');
        const heapTotal = addInstrumentationTextBlock(panelAdd, 'Heap Total: ');
        const heapLimit = addInstrumentationTextBlock(panelAdd, 'Heap Limit: ');
        const deltaTimeValue = addInstrumentationTextBlock(panelAdd, 'Delta Time: ');        

        scene.registerAfterRender(() => {
            meshesLength.text = "Meshes: " + scene.meshes.length;
            activeMeshesLength.text = "Active Meshes: " + scene.getActiveMeshes().length;
            activeVertices.text = `Total Vertices: ${scene.totalVerticesPerfCounter.current.toLocaleString()}`;
            activeIndices.text = `Active Indices: ${scene.totalActiveIndicesPerfCounter.current.toLocaleString()}`;
            materialsLength.text = "Materials: " + scene.materials.length;
            texturesLength.text = "Textures: " + scene.textures.length;
            animationLength.text = "Animations: " + scene.animatables.length;
            drawCalls.text = "Draw Calls: " + sceneInstrumentation.drawCallsCounter.current;
            totalLights.text = "Lights: " + scene.lights.length;
            frameTimeMax.text = "Scene Frame Time: " + sceneInstrumentation.frameTimeCounter.lastSecAverage.toFixed(2);
            evalTimeMax.text = "Active Meshes Eval Time: " + sceneInstrumentation.activeMeshesEvaluationTimeCounter.lastSecAverage.toFixed(2);
            particlesFrameTime.text = "Particles Render Time: " + sceneInstrumentation.particlesRenderTimeCounter.current.toFixed(2);
            interFrameTime.text = "Inter Frame Time: " + sceneInstrumentation.interFrameTimeCounter.lastSecAverage.toFixed();
            gpuFrameTime.text = "GPU Frame Time: " + (engineInstrumentation.gpuFrameTimeCounter.average * 0.000001).toFixed(2) + " ms";
            shaderCompTime.text = "Shader Comp Time: " + engineInstrumentation.shaderCompilationTimeCounter.current.toFixed(2) + " ms";
            shaderTotal.text = "Total Shaders: " + engineInstrumentation.shaderCompilationTimeCounter.count;
            sceneRenderTime.text = "Scene Render Time: " + sceneInstrumentation.renderTimeCounter.current.toFixed();
            cameraRenderTime.text = "Camera Render Time: " + sceneInstrumentation.cameraRenderTimeCounter.current.toFixed();
            targetsRenderTime.text = "Targets Render Time: " + sceneInstrumentation.renderTargetsRenderTimeCounter.current.toFixed();
            fpsValue.text = "FPS: " + engine.getFps().toFixed() + " fps";
            if(window.performance && (window.performance as any).memory) {
                const memory = (window.performance as any).memory;
                heapSize.text = "Heap used: " + ((memory.usedJSHeapSize / 1024)/1024).toFixed(2) + " MB";
                heapTotal.text = "Heap total: " + ((memory.totalJSHeapSize / 1024)/1024).toFixed(2) + " MB";
                heapLimit.text = "Heap limit: " + ((memory.jsHeapSizeLimit / 1024)/1024).toFixed(2) + " MB";
            }
            if(scene.deltaTime){
                deltaTimeValue.text = "Delta Time: " + scene.deltaTime.toFixed(2);
            }
        })
        
        // Instrumentation visibility
        guiTexture.getChildren().forEach(c =>{c.isVisible = true;})


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

    const addInstrumentationTextBlock = (panel: StackPanel, text: string) => {
        const textBlock = new TextBlock();
        textBlock.text = text;
        textBlock.height = "20px";
        textBlock.width = "200px";
        textBlock.color = "white";
        textBlock.fontSize = 14;
        textBlock.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.addControl(textBlock);
        return textBlock;
    }



    return null;
}

export default Instrumentation;
